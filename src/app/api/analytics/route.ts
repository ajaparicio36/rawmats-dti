import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dateRange = searchParams.get("range");

  if (dateRange === null) {
    return NextResponse.json({ message: "should return entire history" });
  }

  return NextResponse.json({
    message: `should return data for range: ${dateRange}`,
  });
}
