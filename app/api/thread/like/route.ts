import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { threadId } = body;
  try {
    const currentUser = await getAuthSession();

    const updatedThread = await prisma.post.update({
      where: {
        id: threadId,
      },
      data: {
        likes: {
          push: currentUser?.user.id,
        },
      },
    });

    return NextResponse.json(updatedThread, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { threadId } = body;
  try {
    const currentUser = await getAuthSession();

    const thread = await prisma.post.findUnique({
      where: {
        id: threadId,
      },
    });

    const updatedThreadLikes = thread?.likes.filter(
      (id) => id !== currentUser?.user.id
    );

    const updatedThread = await prisma.post.update({
      where: {
        id: threadId,
      },
      data: {
        likes: updatedThreadLikes,
      },
    });

    return NextResponse.json(updatedThread, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
