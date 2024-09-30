import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user)
      return NextResponse.json(
        { message: "User is not Signed In" },
        { status: 401 }
      );

    // Convert the user ID to a number since its stored as string by Next-Auth.
    const userId = Number(session.user.id);
    const inboxMessages = await db.query.messages.findMany({
      where: (message, { eq }) =>
        eq(message.recipientId, userId) && eq(message.isDeleted, false),
    });

    return NextResponse.json(inboxMessages);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
