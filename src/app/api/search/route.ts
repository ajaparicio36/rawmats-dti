import { NextResponse } from "next/server";
import prisma from "@/utils/prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const limit = Number.parseInt(searchParams.get("limit") || "5", 10);

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 },
    );
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        verified: true,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          {
            supplier: {
              businessName: { contains: query, mode: "insensitive" },
            },
          },
        ],
      },
      include: {
        supplier: {
          select: {
            businessName: true,
          },
        },
      },
      take: limit,
      orderBy: { dateAdded: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    return NextResponse.json(
      { error: "An error occurred while searching" },
      { status: 500 },
    );
  }
}
