import prisma from "@/utils/prisma/client";
import { NextResponse, type NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json();

    await prisma.notification.update({
      where: { id: id },
      data: { read: true },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch data. Please try again later.",
      },
      { status: 500 },
    );
  }
}
