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

    const updatedMessage = await db
      .update(messages)
      .set({ isDeleted: true })
      .where(eq(messages.id, userId))
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
