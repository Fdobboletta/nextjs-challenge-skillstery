import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { routePaths } from "@/app/routePaths";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          label: "Password",
          type: "Password",
          placeholder: "******",
        },
      },
      authorize: async (credentials) => {
        if (!credentials) throw new Error("Missing credentials");

        const user = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, credentials.email),
        });

        if (!user) throw new Error("User not found");

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) throw new Error("Wrong username or password");

        return {
          id: user.id.toString(),
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: routePaths.login },
  callbacks: {
    async session({ session, token }) {
      // Adding userId to be accessible in session object
      session.user.id = token.sub || "";
      return session;
    },
  },
};
