import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { RegisterUserReqBody } from "./types";

// Handles user registration by creating a new user in the database
export const POST = async (request: NextRequest) => {
  try {
    const requestBody: RegisterUserReqBody = await request.json();

    const alreadyExistingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, requestBody.email),
    });

    if (alreadyExistingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(requestBody.password, 10);

    const newUser = await db
      .insert(users)
      .values({
        email: requestBody.email,
        firstName: requestBody.firstName,
        lastName: requestBody.lastName,
        password: hashedPassword,
      })
      .returning();

    // Drizzle returns an array of created rows, so we safely take the first element (the newly created user)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...newUserWithoutPassword } = newUser[0];

    return NextResponse.json(newUserWithoutPassword);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};
