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

    const updatedCurrentUserFollowing = currentUser?.following.filter(
      (id: string) => id !== userId
    );

    const followingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const updatedFollowingUserFollowers = followingUser?.followers.filter(
      (id: string) => id !== currentUser?.id
    );

    await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        following: updatedCurrentUserFollowing,
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followers: updatedFollowingUserFollowers,
      },
    });

    return NextResponse.json("Unfollow Successfully", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
