import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkUserAuthOrThrow } from "../utils/checkUserAuthOrThrow";
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
    });

    return NextResponse.json(inboxMessages);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};
