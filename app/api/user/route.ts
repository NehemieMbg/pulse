import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { ErrorMsg } from '@/app/utils/enums/error-msg';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import prisma from '@/app/lib/prismadb';
import { validateEmail } from '@/app/utils/functions/sign-up';
import { getUserSession } from '@/app/utils/functions/user';
import { getImageUrl } from '@/app/utils/user-utils';

export async function GET() {
  const email = await getUserSession();

  // return new NextResponse('success', { status: 200 });

  const user = await prisma.user.findFirst({
    where: {
      email: email as string,
    },
  });

  const userData = {
    age: user?.age,
    bio: user?.bio,
    dateOfBirth: user?.dateOfBirth,
    email: user?.email,
    id: user?.id,
    image: user?.image,
    imageName: user?.imageName,
    name: user?.name,
    username: user?.username,
    city: user?.city,
    link: user?.link,
    hashedPassword: user?.hashedPassword,
    emailVerified: user?.emailVerified,
  };

  if (userData.imageName)
    userData.image = await getImageUrl(userData.imageName);

  return NextResponse.json(userData);
}

export async function PUT(request: NextRequest, response: NextResponse) {
  const body = await request.json();

  // check if user is connected
  const session = (await getServerSession(authOptions as any)) as {
    user: { email: string };
  };

  const { email } = session.user;

  // const updatedUser = await prisma.user.update({
  //   where: { email: email },
  //   data: { username: body.username },
  // });

  if (!session)
    return new NextResponse(ErrorMsg.NOT_CONNECTED, { status: 400 });

  if ('email' in body) {
    if (!body.email)
      return new NextResponse(ErrorMsg.EMAIL_EMPTY, {
        status: 400,
      });

    if (!validateEmail(body.email)) {
      return new NextResponse(ErrorMsg.WRONG_EMAIL, {
        status: 400,
      });
    }

    const emailExist = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (emailExist)
      return new NextResponse(ErrorMsg.EMAIL_TAKEN, {
        status: 400,
      });

    try {
      const updatedUser = await prisma.user.update({
        where: { email: email },
        data: { email: body.email },
      });

      return NextResponse.json(updatedUser);
    } catch (error) {
      return new NextResponse(ErrorMsg.EMAIL_ERROR, {
        status: 400,
      });
    }
  }

  if ('username' in body) {
    if (!body.username)
      return new NextResponse(ErrorMsg.USERNAME_EMPTY, {
        status: 400,
      });

    const username = await prisma.user.findFirst({
      where: { username: body.username },
    });

    if (username)
      return new NextResponse(
        `This username (${body.username}) has already been taken`,
        {
          status: 400,
        }
      );

    try {
      const updatedUser = await prisma.user.update({
        where: { email: email },
        data: { username: body.username },
      });

      return NextResponse.json(updatedUser);
    } catch (error) {
      return new NextResponse(ErrorMsg.USERNAME_ERROR, {
        status: 400,
      });
    }
  }

  if ('currPassword' in body) {
    if (!body.currPassword) {
      return new NextResponse(ErrorMsg.PASSWORD_MISSING, {
        status: 400,
      });
    }

    const user = await prisma.user.findFirst({ where: { email } });

    const passwordMatch = await bcrypt.compare(
      body.currPassword,
      user?.hashedPassword!
    );

    if (!passwordMatch)
      return new NextResponse(ErrorMsg.PASSWORD_INVALID, {
        status: 400,
      });

    if (!body.newPassword) {
      return new NextResponse(ErrorMsg.NEW_PASSWORD_MISSING, {
        status: 400,
      });
    }

    if (!body.confirmPassword) {
      return new NextResponse(ErrorMsg.CONFIRM_PASSWORD_MISSING, {
        status: 400,
      });
    }

    if (body.newPassword !== body.confirmPassword) {
      return new NextResponse(ErrorMsg.PASSWORD_DO_NOT_MATCH, {
        status: 400,
      });
    }

    const newHashedPassword = await bcrypt.hash(body.newPassword, 10);

    try {
      const updatedUser = await prisma.user.update({
        where: { email: email },
        data: { hashedPassword: newHashedPassword },
      });

      return NextResponse.json(updatedUser);
    } catch (error) {
      return new NextResponse(ErrorMsg.PASSWORD_ERROR, {
        status: 400,
      });
    }
  }

  if ('name' in body) {
    if (!body.name)
      return new NextResponse(ErrorMsg.NAME_EMPTY, {
        status: 400,
      });

    try {
      const updatedUser = await prisma.user.update({
        where: { email: email },
        data: { name: body.name },
      });

      return NextResponse.json(updatedUser);
    } catch (error) {
      return new NextResponse(ErrorMsg.NAME_ERROR, {
        status: 400,
      });
    }
  }

  if ('city' in body) {
    try {
      const updatedUser = await prisma.user.update({
        where: { email: email },
        data: { city: body.city },
      });

      return NextResponse.json(updatedUser);
    } catch (error) {
      return new NextResponse(ErrorMsg.LOCATION_ERROR, {
        status: 400,
      });
    }
  }

  if ('bio' in body) {
    if (body.bio.length > 150)
      return new NextResponse(ErrorMsg.BIO_LENGTH_ERROR, {
        status: 400,
      });

    try {
      const updatedUser = await prisma.user.update({
        where: { email: email },
        data: { bio: body.bio },
      });

      return NextResponse.json(updatedUser);
    } catch (error) {
      return new NextResponse(ErrorMsg.BIO_ERROR, {
        status: 400,
      });
    }
  }

  if ('userLink' in body) {
    try {
      const updatedUser = await prisma.user.update({
        where: { email: email },
        data: { link: body.userLink },
      });

      return NextResponse.json(updatedUser);
    } catch (error) {
      return new NextResponse(ErrorMsg.LINK_ERROR, {
        status: 400,
      });
    }
  }

  return new NextResponse(ErrorMsg.ERROR, {
    status: 400,
  });
}

export async function DELETE() {
  console.log('Resquest delete user');

  const session = (await getServerSession(authOptions as any)) as {
    user: { email: string };
  };

  if (!session)
    return new NextResponse('You must be connected', { status: 400 });

  const { email } = session.user;

  try {
    await prisma.user.delete({
      where: {
        email,
      },
    });

    return new NextResponse('success', { status: 200 });
  } catch (error) {
    return new NextResponse('Something happen', { status: 400 });
  }
}
