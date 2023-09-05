import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const session = await getAuthSession();

  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
    });

    await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        following: {
          push: userId,
        },
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followers: {
          push: currentUser?.id,
        },
      },
    });

    return NextResponse.json("Followed Successfully", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
