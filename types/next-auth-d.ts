import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      admin: boolean; // Add admin to the Session user object
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    password?: string;
    admin: boolean; // Add admin to the User object
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    admin?: boolean; // Add admin to the JWT object
  }
}
