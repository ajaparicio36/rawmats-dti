// import Image from 'next/image';
// import Image from 'next/image';

interface ProductListProps {
  products: {
    id: string;
    name: string;
    supplierId: string;
    price: number;
    description: string;
    verified: boolean;
    verifiedDate: Date;
    dateAdded: Date;
    // image?: string;
  }[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Created Products</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              {/* {product.image && (
                <div className="w-32 h-32 overflow-hidden rounded-md mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={128}
                    height={128}
                    className="object-cover"
                    loading="lazy"
                    quality={75} // Optional: Set image quality to balance performance and clarity
                  />
                </div>
              )} */}
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 mt-2 text-sm">
                {product.description}
              </p>
              <p className="text-green-500 mt-2 font-semibold">
                ${product.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products created yet.</p>
      )}
    </div>
  );
}
