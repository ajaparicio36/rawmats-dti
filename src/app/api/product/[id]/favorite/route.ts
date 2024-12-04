import prisma from "@/utils/prisma/client";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
): Promise<NextResponse> => {
  try {
    const id = (await params).id;
    const user = await request.json();

    if (!user) {
      throw new Error("User not found");
    }

    const favorite = await prisma.favorite.create({
      data: {
        productId: id,
        userId: user.id,
      },
    });

    return NextResponse.json(favorite, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 400 });
  }
};
