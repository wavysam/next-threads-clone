import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { text, postId, userId } = body;
  try {
    const reply = await prisma.reply.create({
      data: {
        text,
        postId,
        userId,
      },
    });
    return NextResponse.json(reply, { status: 201 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
