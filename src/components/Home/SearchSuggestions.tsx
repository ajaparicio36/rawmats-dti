import { useState, useEffect } from "react";
import { AnimatedDiv } from "@/components/Home/AnimatedComponents";
import type { ProductWithSupplier } from "@/utils/Products";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchSuggestionsProps {
  query: string;
  onSelect: (suggestion: string) => void;
}

export function SearchSuggestions({ query, onSelect }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<ProductWithSupplier[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (query.length > 1) {
      const fetchSuggestions = async () => {
        try {
          const response = await fetch(
            `/api/search?query=${encodeURIComponent(query)}&limit=5`,
          );
          if (!response.ok) throw new Error("Failed to fetch suggestions");
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleProductClick = (product: ProductWithSupplier) => {
    onSelect(product.name);
    router.push(`/product/${product.id}`);
  };

  if (suggestions.length === 0) return null;

  return (
    <AnimatedDiv
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg"
    >
      <ul className="py-1">
        {suggestions.map((product) => (
          <li key={product.id}>
            <button
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-rawmats-primary-100 focus:outline-none focus:bg-rawmats-primary-100"
              onClick={() => handleProductClick(product)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="rounded-full mr-2"
                    width={32}
                    height={32}
                    objectFit="cover"
                  />
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-gray-500">
                      {product.supplier.businessName}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700">
                  ₱{product.price.toFixed(2)}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </AnimatedDiv>
  );
}
