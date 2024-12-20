import prisma from "@/utils/prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const productId = params.id;
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const supplier = await prisma.supplier.findUnique({
      where: { id: product.supplierId },
    });

    if (!supplier) {
      return NextResponse.json(
        { error: "Supplier not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ product, supplier }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const productId = params.id;
    const body = await request.json();
    const { name, description, price, supplierId, image } = body;

    if (!name || !description || !price || !supplierId) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, description, price, or supplierId",
        },
        { status: 400 },
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        price: parseFloat(price),
        supplierId,
        image,
        verified: existingProduct.verified ? false : existingProduct.verified,
      },
    });

    revalidatePath("/", "layout");
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while updating the product." },
      { status: 500 },
    );
  }
};
