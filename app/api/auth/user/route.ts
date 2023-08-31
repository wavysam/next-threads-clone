import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, name, username, bio, profileImage } = body;
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        onboarded: true,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
