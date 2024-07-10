import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { signInSchema } from "@/components/libs/zot";
import { ZodError } from "zod";
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);

          const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, name: true, password: true, admin: true },
          });

          if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new Error("Invalid email or password");
          }

          return { id: user.id, email: user.email, name: user.name, admin: user.admin };
        } catch (error: any) {
          if (error instanceof ZodError) {
            return null;
          }
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          let existingUser = await prisma.user.findUnique({
            where: { email: user.email || '' },
          });

          if (!existingUser) {
            existingUser = await prisma.user.create({
              data: {
                name: user.name,
                email: user.email || '',
                password: '',
              },
            });
          }

          return true;
        } catch (error) {
          console.error('Error creating user:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.admin = user.admin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user = {
          ...session.user,
          id: token.id as string,
          admin: token.admin||false,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const authHandler = async (req: any, res: any) => {
  return await NextAuth(req, res, options);
};

export { authHandler as GET, authHandler as POST };
export { options as authOptions };
