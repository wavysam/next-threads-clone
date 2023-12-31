import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { threadId: string } }
) {
  const body = await request.json();
  const { thread, images } = body;
  const { threadId } = params;
  const session = await getAuthSession();
  try {
    let updateThread;

    if (images.length > 0) {
      updateThread = await prisma.post.update({
        where: {
          id: threadId,
        },
        data: {
          thread,
          userId: session?.user.id,
          images: {
            deleteMany: {},
          },
        },
      });
      await prisma.post.update({
        where: {
          id: threadId,
        },
        data: {
          images: {
            createMany: {
              data: [...images.map((image: { url: string }) => image)],
            },
          },
        },
      });
    } else {
      updateThread = await prisma.post.update({
        where: {
          id: threadId,
        },
        data: {
          thread,
          userId: session?.user.id,
          images: {
            deleteMany: {},
          },
        },
      });
    }

    return NextResponse.json(updateThread, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { threadId: string } }
) {
  const { threadId } = params;
  try {
    await prisma.post.delete({
      where: {
        id: threadId,
      },
    });

    return NextResponse.json("Thread deleted", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
