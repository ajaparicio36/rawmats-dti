import prisma from "@/utils/prisma/client";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: params.id,
      },
      take: 5,
      skip: page ? (parseInt(page) - 1) * 5 : 0,
    });

    const totalNotifCount = await prisma.notification.count({
      where: {
        userId: params.id,
      },
    });

    return NextResponse.json(
      { notifications, totalNotifCount },
      { status: 200 },
    );
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
