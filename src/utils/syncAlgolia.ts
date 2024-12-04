import { PrismaClient } from "@prisma/client";
import { searchClient } from "@algolia/client-search";

const prisma = new PrismaClient();

const client = searchClient(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY!,
);

export async function syncProductsToAlgolia() {
  try {
    console.log("Starting sync...");

    const products = await prisma.product.findMany({
      where: { verified: true },
      include: { supplier: true },
    });

    const records = products.map((product) => ({
      objectID: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      supplierName: product.supplier.businessName,
      supplierLocation: product.supplier.businessLocation,
      dateAdded: product.dateAdded.toISOString(),
      verified: product.verified,
    }));

    const response = await client.saveObjects({
      indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!,
      objects: records,
    });

    console.log("Successfully synced products to Algolia");
    return response;
  } catch (error) {
    console.error("Error syncing products to Algolia:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
