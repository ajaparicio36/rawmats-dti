import prisma from "@/utils/prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const data: {
      businessPhone?: string;
      bio?: string;
      businessPicture?: string;
    } = await req.json();

    await prisma.supplier.update({
      where: {
        id: params.id,
      },
      data: data,
    });

    revalidatePath("/", "layout");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
