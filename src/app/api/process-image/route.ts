import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  if (!req.body) {
    return NextResponse.json({ error: "No body provided" }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 },
      );
    }

    const buffer = await file.arrayBuffer();
    const processedImage = await sharp(buffer)
      .resize(1000, 1000, { fit: "inside" })
      .jpeg({ quality: 80 })
      .toBuffer();

    return new NextResponse(processedImage, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Error processing image" },
      { status: 500 },
    );
  }
}
