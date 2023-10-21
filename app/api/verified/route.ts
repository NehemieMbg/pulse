import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { EmailTemplate } from '@/app/components/email-template';
import { Resend } from 'resend';
import { Verification } from '@/app/utils/enums/verification';

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const session = (await getServerSession(authOptions as any)) as {
    user: { email: string };
  };

  if (!session)
    return new NextResponse('You must be connected', { status: 400 });

  const { email } = session.user;

  console.log('This is body: ', body);

  // verify code, compare input to code in db
  if ('code' in body) {
    if (!body.code) {
      return new NextResponse(Verification.CODE_EMPTY, { status: 400 });
    }

    const alreadyHasCode = await prisma.user.findFirst({
      where: { email: email },
    });

    if (body.code === alreadyHasCode?.verificationCode) {
      try {
        const now = new Date();
        const isoDateTime = now.toISOString();

        await prisma.user.update({
          where: { email },
          data: { emailVerified: isoDateTime },
        });

        return new NextResponse(Verification.SUCCESS, { status: 200 });
      } catch (error) {
        return new NextResponse(`${error}`, { status: 400 });
      }
    }

    return new NextResponse(Verification.WRONG_CODE, { status: 400 });
  }

  return new NextResponse(Verification.CODE_EMPTY, { status: 400 });
}

export async function POST() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const session = (await getServerSession(authOptions as any)) as {
    user: { email: string };
  };

  if (!session)
    return new NextResponse('You must be connected', { status: 400 });

  const { email } = session.user;

  // Generate a random 5 length code string
  function generateCode() {
    const min = 10000;
    const max = 99999;
    const randomNumber = Math.floor(Math.random() * (max - min) + min);

    return String(randomNumber);
  }

  const randomNum = generateCode();

  const alreadyHasCode = await prisma.user.findFirst({
    where: { email: email },
  });

  if (alreadyHasCode?.verificationCode) {
    return new NextResponse(Verification.SUCCESS, { status: 200 });
  }

  if (alreadyHasCode?.verificationCode) {
    try {
      await resend.emails.send({
        from: 'PULSE <info@pulse-app.ch>',
        to: email,
        subject: 'Verify your account.',
        react: EmailTemplate({
          verificationCode: alreadyHasCode?.verificationCode,
        }),
        // Not working without...
        html: '',
      });

      return new NextResponse(
        'The verification code was just sent to your email address',
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ error });
    }
  }

  try {
    // Set the verification code
    await prisma.user.update({
      where: { email },
      data: { verificationCode: randomNum },
    });

    // Send the verification code to the user email address
    await resend.emails.send({
      from: 'PULSE <info@pulse-app.ch>',
      to: email,
      subject: 'Verify your account.',
      react: EmailTemplate({
        verificationCode: randomNum,
      }),
      // Not working without...
      html: '',
    });

    return new NextResponse('success', { status: 200 });
  } catch (error) {
    return new NextResponse('Something happened', { status: 400 });
  }
}
