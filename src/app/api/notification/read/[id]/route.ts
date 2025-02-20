import prisma from "@/utils/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const notifCount = await prisma.notification.count({
      where: {
        read: false,
        userId: params.id,
      },
    });

    return NextResponse.json(notifCount, { status: 200 });
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
