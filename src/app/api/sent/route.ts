import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkUserAuthOrThrow } from "../utils/checkUserAuthOrThrow";
export const GET = async () => {
  try {
    const session = await checkUserAuthOrThrow();
    // Convert the user ID to a number since its stored as string by Next-Auth.
    const userId = Number(session.user.id);

    const inboxMessages = await db.query.messages.findMany({
      columns: {
        receiverId: false,
      },
      with: {
        receiver: {
          columns: { password: false, createdAt: false },
        },
      },
      where: (message, { eq, and }) =>
        and(eq(message.senderId, userId), eq(message.isDeleted, false)),
    });

    return NextResponse.json(inboxMessages);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
