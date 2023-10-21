import NextAuth from 'next-auth';
import prisma from '@/app/lib/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { NewUser } from '@/app/utils/enums/sign-up';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // check if email and password valid
        if (credentials?.email && !credentials.password) {
          throw new Error(NewUser.PASSWORD_IS_MISSING);
        }

        if (!credentials?.email && credentials?.password) {
          throw new Error(NewUser.EMAIL_IS_MISSING);
        }

        if (!credentials?.email || !credentials.password) {
          throw new Error(NewUser.INPUTS_REQUIRED);
        }
        // chack to see if use exists
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error(NewUser.WRONG_CREDENTIALS);
        }

        // check if password match
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        if (!passwordMatch) {
          throw new Error(NewUser.WRONG_CREDENTIALS);
        }

        // return user object if everything is valid
        return user;
      },
    }), //
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
