import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma/client";
import { revalidatePath } from "next/cache";

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

    await prisma.supplier.delete({
      where: {
        userId: id,
      },
    });

    await prisma.notification.create({
      data: {
        title: "Supplier Rejected",
        content: `Reasons: ${reasons.join(", ")}\nComment: ${comment}`,
        userId: userID,
      },
    });

    revalidatePath("/", "layout");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
