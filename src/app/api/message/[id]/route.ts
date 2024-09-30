import { NextRequest, NextResponse } from "next/server";
import { checkUserAuthOrThrow } from "../../utils/checkUserAuthOrThrow";
import { db } from "@/lib/db";
import { messages } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = await checkUserAuthOrThrow();

    const messageIdFromParam = Number(params.id);

    const updatedMessage = await db
      .update(messages)
      .set({ isDeleted: true })
      .where(eq(messages.id, messageIdFromParam))
      .returning();

    if (updatedMessage.length === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: updatedMessage[0].id,
      isDeleted: updatedMessage[0].isDeleted,
    });
  } catch (error) {
    console.error("Error updating message:", error);

    return NextResponse.json(
      { error: "An error occurred while updating the message" },
      { status: 500 }
    );
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = await checkUserAuthOrThrow();

    const messageIdFromParam = Number(params.id);

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
      where: (message, { eq, and }) =>
        and(eq(message.id, messageIdFromParam), eq(message.isDeleted, false)),
    });

    if (!requestedMessage) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json(requestedMessage);
  } catch (error) {
    console.error("Error updating message:", error);

    return NextResponse.json(
      { error: "An error occurred while updating the message" },
      { status: 500 }
    );
  }
};
