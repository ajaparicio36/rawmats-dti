import prisma from '@/utils/prisma/client';

export const GET = async () => {
  // This route gets a specific product
  // You can use this when clicking a product where the user sees all info
  // This includes supplier name, supplier location, etc.
};


// This is for other methods like POST, PUT, DELETE, but me and Jeff only need to do the GET!

// export const POST = async () => {}
// export const PUT = async () => {}
// export const DELETE = async () => {}

import { NextRequest, NextResponse } from 'next/server';


export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name, description, price, supplierId } = body;

    if (!name || !description || !price || !supplierId) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, price, or supplierId' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        supplierId,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating product:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
  }
};
