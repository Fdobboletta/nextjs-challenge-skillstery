import { NextRequest, NextResponse } from "next/server";
import { checkUserAuthOrThrow } from "../../utils/checkUserAuthOrThrow";
import { db } from "@/lib/db";
import { messages } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

// Handles the soft deletion of a message
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = await checkUserAuthOrThrow();

    const messageIdFromParam = Number(params.id);

    // To delete a message, the request must come from the sender (creator) of the message.
    const updatedMessage = await db
      .update(messages)
      .set({ isDeleted: true })
      .where(
        and(
          eq(messages.id, messageIdFromParam),
          eq(messages.receiverId, userId)
        )
      )
      .returning();

    if (updatedMessage.length === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: updatedMessage[0].id,
      isDeleted: updatedMessage[0].isDeleted,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
};

// Fetches a message by its ID
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = await checkUserAuthOrThrow();

    const messageIdFromParam = Number(params.id);

    // Fetch a message if:
    // - It is not marked as deleted
    // - The user is either the sender or the receiver
    const requestedMessage = await db.query.messages.findFirst({
      columns: {
        id: true,
        title: true,
        content: true,
      },
      with: {
        sender: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      where: (message, { eq, and, or }) =>
        and(
          eq(message.id, messageIdFromParam),
          eq(message.isDeleted, false),
          or(eq(message.senderId, userId), eq(message.receiverId, userId))
        ),
    });

    if (!requestedMessage) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json(requestedMessage);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
};
