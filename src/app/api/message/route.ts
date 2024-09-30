import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages } from "@/lib/schema";
import { checkUserAuthOrThrow } from "../utils/checkUserAuthOrThrow";
import { CreateMessageReqBody } from "./types";

export const POST = async (request: NextRequest) => {
  try {
    const requestBody: CreateMessageReqBody = await request.json();

    const { userId } = await checkUserAuthOrThrow();

    const { title, content, receiverEmail } = requestBody;

    if (title.length > 29) throw new Error("Title exceeds max allowed length");

    const receiverUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, receiverEmail),
    });

    if (!receiverUser) throw new Error("Receiver user not found");

    if (userId === receiverUser.id)
      throw new Error("You are not allowed to send messages to yourself");

    const newMessage = await db
      .insert(messages)
      .values({
        senderId: userId,
        receiverId: receiverUser.id,
        title,
        content,
      })
      .returning();

    return NextResponse.json(newMessage[0]);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};
