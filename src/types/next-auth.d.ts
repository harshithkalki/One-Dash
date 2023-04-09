import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      firstName: string;
      email: string;
      image: string | null;
    };
  }

  interface User {
    id: string;
    firstName: string;
    email: string;
    image: string | null;
  }

  interface Profile {
    id: string;
    name: string;
    email: string;
    picture: string;
    email_verified: boolean;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string;
  }
}
