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

    const currentUserFollowing = currentUser?.following.filter(
      (item: string) => item !== userId
    );

    const followingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followingUserFollowers = followingUser?.followers.filter(
      (item: string) => item !== currentUser?.id
    );

    await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        following: currentUserFollowing,
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followers: followingUserFollowers,
      },
    });

    return NextResponse.json("Unfollow successfully", { status: 200 });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
