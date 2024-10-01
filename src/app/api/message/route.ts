import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages } from "@/lib/schema";
import { checkUserAuthOrThrow } from "../utils/checkUserAuthOrThrow";
import { CreateMessageReqBody } from "./types";

// Handles the creation of a new message to be sent
export const POST = async (request: NextRequest) => {
  try {
    const requestBody: CreateMessageReqBody = await request.json();
    const { userId } = await checkUserAuthOrThrow();
    const { title, content, receiverEmail } = requestBody;

    // Check if title exceeds length
    if (title.length > 29) {
      return NextResponse.json(
        { error: "Title exceeds max allowed length" },
        { status: 400 }
      );
    }

    // Find the receiver user
    const receiverUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, receiverEmail),
    });

    // If the receiver is not found
    if (!receiverUser) {
      return NextResponse.json(
        { error: "Receiver user not found" },
        { status: 404 }
      );
    }

    // Prevent users from messaging themselves
    if (userId === receiverUser.id) {
      return NextResponse.json(
        { error: "You are not allowed to send messages to yourself" },
        { status: 403 }
      );
    }

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
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
};
