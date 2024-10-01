import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkUserAuthOrThrow } from "../utils/checkUserAuthOrThrow";

// Fetch messages from the "Sent" section for the authenticated user.
// This includes all messages sent by the user, regardless of their deletion status.
export const GET = async () => {
  try {
    const { userId } = await checkUserAuthOrThrow();

    const inboxMessages = await db.query.messages.findMany({
      columns: {
        receiverId: false,
      },
      with: {
        receiver: {
          columns: { password: false, createdAt: false },
        },
      },
      // We want to return the message regardless of whether the author has already deleted it.
      where: (message, { eq, and }) => and(eq(message.senderId, userId)),
      orderBy: (message, { desc }) => desc(message.createdAt),
    });

    return NextResponse.json(inboxMessages);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Failed to fetch messages" },
      { status: 500 }
    );
  }
};
