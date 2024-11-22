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
  }[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-semibold">Created Products</h2>
      {products.length > 0 ? (
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
              {/* {product.image && (
                <div className="w-32 h-32 mt-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={128} 
                    height={128} 
                    className="object-cover"
                    loading="lazy" 
                  />
                </div>
              )} */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products created yet.</p>
      )}
    </div>
  );
}
