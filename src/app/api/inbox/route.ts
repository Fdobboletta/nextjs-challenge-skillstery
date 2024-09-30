import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkUserAuthOrThrow } from "../utils/checkUserAuthOrThrow";
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
    });

    return NextResponse.json(inboxMessages);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};
