import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  reques: Request,
  { params }: { params: { replyId: string } }
) {
  const { replyId } = params;
  try {
    await prisma.reply.delete({
      where: {
        id: replyId,
      },
    });

    return NextResponse.json("Reply deleted successfully", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
