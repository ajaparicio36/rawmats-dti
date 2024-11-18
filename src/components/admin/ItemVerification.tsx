import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  supplierId: string;
}

interface ItemVerificationProps {
  products: Product[];
  onVerify: (id: string) => void;
  onReject: (id: string) => void;
}

export function ItemVerification({
  products,
  onVerify,
  onReject,
}: ItemVerificationProps) {
  const [verifiedProducts, setVerifiedProducts] = useState<Set<string>>(
    new Set(),
  );
  const [rejectedProducts, setRejectedProducts] = useState<Set<string>>(
    new Set(),
  );

  const handleVerify = (id: string) => {
    setVerifiedProducts((prev) => new Set(prev).add(id));
    setRejectedProducts((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
    onVerify(id);
  };

  const handleReject = (id: string) => {
    setRejectedProducts((prev) => new Set(prev).add(id));
    setVerifiedProducts((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
    onReject(id);
  };

  return (
    <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
      <div className="space-y-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>
                Supplier ID: {product.supplierId}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
              <p className="mt-2 font-semibold">
                Price: ${product.price.toFixed(2)}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleVerify(product.id)}
                disabled={verifiedProducts.has(product.id)}
              >
                <Check className="mr-2 h-4 w-4" />
                Verify
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleReject(product.id)}
                disabled={rejectedProducts.has(product.id)}
              >
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
