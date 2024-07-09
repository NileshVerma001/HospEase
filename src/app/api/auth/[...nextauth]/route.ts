import NextAuth, { NextAuthOptions, AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { signInSchema } from "@/components/libs/zot";
import { saltAndHashPassword, verifyPassword } from "@/components/utils/password";
import { ZodError } from "zod";

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
            // Explicitly include the password field in the result
            select: { id: true, email: true, name: true, password: true },
          });

          if (!user || !(await verifyPassword(password, user.password||""))) {
            throw new Error("Invalid email or password");
          }

          return { id: user.id, email: user.email, name: user.name };
        } catch (error) {
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user = {
          ...session.user,
          id: token.id as string,
        };
      }
      return session;
    },
  },
};

export default function authHandler(req: any, res: any) {
  return NextAuth(req, res, options);
}
