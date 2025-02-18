import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const product = await prisma.product.update({
      where: { id },
      data: { verified: true, verifiedDate: new Date() },
      include: { supplier: true },
    });

    await prisma.notification.create({
      data: {
        title: "Product Verified!",
        content: `Your product ${product.name} has been verified.`,
        userId: product.supplier.userId,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to verify product" },
      { status: 500 },
    );
  }
}
