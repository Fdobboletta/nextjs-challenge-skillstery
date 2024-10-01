import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkUserAuthOrThrow } from "../utils/checkUserAuthOrThrow";

// Fetches the inbox messages for the authenticated user.
// This retrieves messages where the user is the receiver and the message is not marked as deleted.
export const GET = async () => {
  try {
    const { userId } = await checkUserAuthOrThrow();

    const inboxMessages = await db.query.messages.findMany({
      columns: {
        senderId: false,
      },
      with: {
        sender: {
          columns: {
            password: false,
            createdAt: false,
          },
        },
      },
      where: (message, { eq, and }) =>
        and(eq(message.receiverId, userId), eq(message.isDeleted, false)),
      orderBy: (message, { desc }) => desc(message.createdAt),
    });

    return NextResponse.json(inboxMessages);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
};
