import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import bcrypt from 'bcryptjs';
import prisma from '@/app/lib/prismadb';
import { generateCode } from '@/app/utils/functions/user';
import { ResetPasswordTemplate } from '@/app/components/email-template/reset-password-template';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, userCode } = body;
  const resend = new Resend(process.env.RESEND_API_KEY);

  const generatedCode = generateCode();

  const user = await prisma.user.findFirst({ where: { email } });

  if (userCode) {
    if (userCode === user?.resetCode) {
      return new NextResponse('The code is valide', { status: 200 });
    } else {
      return new NextResponse('The reset codes do not match', {
        status: 400,
      });
    }
  }

  if (!user)
    return new NextResponse("This email isn't associated to any account", {
      status: 400,
    });

  try {
    await resend.emails.send({
      from: 'PULSE <info@pulse-app.ch>',
      to: email,
      subject: 'Reset Password',
      react: ResetPasswordTemplate({
        resetCode: generatedCode,
      }),
      // Not working without...
      html: '',
    });

    await prisma.user.update({
      where: { email: email },
      data: { resetCode: generatedCode },
    });

    return new NextResponse(
      'The reset code was just sent to your email address',
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { email, userCode, password, confirmPassword } = body;

  const user = await prisma.user.findFirst({ where: { email } });

  if (!email || !userCode) {
    return new NextResponse('Something went wrong', { status: 400 });
  }

  if (!password || !confirmPassword)
    return new NextResponse(
      'Both password and confirm password cannot be left empty.',
      {
        status: 400,
      }
    );

  if (password !== confirmPassword)
    return new NextResponse('Password do not match', { status: 400 });

  if (userCode !== user?.resetCode)
    return new NextResponse('Something went wrong', { status: 400 });

  const newHashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.update({
      where: { email: email },
      data: { hashedPassword: newHashedPassword },
    });
    return new NextResponse('Success', { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 400 });
  }
}
