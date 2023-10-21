import bcrypt from 'bcryptjs';
import prisma from '@/app/lib/prismadb';

import { NextResponse, NextRequest } from 'next/server';
import { NewUser } from '@/app/utils/enums/sign-up';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {
    name,
    username,
    email,
    birthDay,
    birthMonth,
    birthYear,
    password,
    confirmPassword,
  } = body;
  console.log('From Server: ', body);

  if (
    !name ||
    !username ||
    !email ||
    !birthDay ||
    !birthMonth ||
    !birthYear ||
    !password ||
    !confirmPassword
  ) {
    return new NextResponse(NewUser.INPUTS_REQUIRED, { status: 400 });
  }

  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,29}$/;

  if (!usernameRegex.test(username))
    return new NextResponse(NewUser.USERNAME_INVALID, { status: 400 });

  const emailExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (emailExist) {
    return new NextResponse(NewUser.EMAIL_EXIT, { status: 400 });
  }

  const usernameExist = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (usernameExist) {
    return new NextResponse(NewUser.USERNAME_EXIT, {
      status: 400,
    });
  }

  if (password !== confirmPassword) {
    return new NextResponse(NewUser.PASSWORD_DONT_MATCH, { status: 400 });
  }

  const dateOfBirth = `${birthDay}/${birthMonth}/${birthYear}`;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      username,
      email,
      dateOfBirth,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
