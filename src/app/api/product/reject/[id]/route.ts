import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma/client";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const data = await req.json();
    const { reasons, userID } = data;
    let { comment } = data;

    const id = params.id;
    console.log("Received ID:", id);

    if (comment.trim() === "") {
      comment = null;
    }

    await prisma.product.delete({
      where: { id },
    });

    await prisma.notification.create({
      data: {
        title: "Product Rejected",
        content: `Reasons: ${reasons.join(", ")}\nComment: ${comment}`,
        userId: userID,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error rejecting product:", error);
    return NextResponse.json(
      { error: "Failed to reject product" },
      { status: 500 },
    );
  }
}
