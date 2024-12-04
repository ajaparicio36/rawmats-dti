import prisma from "@/utils/prisma/client";
import { NextResponse } from "next/server";

export const GET = async ({
  params,
}: {
  params: Promise<{ userId: string; id: string }>;
}): Promise<NextResponse> => {
  try {
    const { userId, id } = await params;

    const favorite = await prisma.favorite.findFirst({
      where: {
        userId: userId,
        productId: id,
      },
    });

    return NextResponse.json({ favorite }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 400 });
  }
};
