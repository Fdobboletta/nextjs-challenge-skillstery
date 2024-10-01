import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      // Adding userId to Session User object.
      id: string;
    } & DefaultSession["user"];
  }
}
