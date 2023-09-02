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
    await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        following: {
          push: userId,
        },
        followers: {
          push: [],
        },
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followers: {
          push: session?.user.id,
        },
        following: {
          push: [],
        },
      },
    });

    return NextResponse.json("Followed successfully", { status: 200 });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
