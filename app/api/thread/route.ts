import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { thread, images } = body;
  const session = await getAuthSession();
  try {
    let newThread;

    if (images.length > 0) {
      newThread = await prisma.post.create({
        data: {
          thread,
          userId: session?.user.id as string,
          images: {
            createMany: {
              data: [...images.map((image: { url: string }) => image)],
            },
          },
        },
      });
    } else {
      newThread = await prisma.post.create({
        data: {
          thread,
          userId: session?.user.id as string,
        },
      });
    }

    return NextResponse.json(newThread, { status: 201 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
