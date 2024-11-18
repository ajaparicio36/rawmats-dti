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
import { Product } from "@prisma/client";

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
  return (
    <ScrollArea>
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Price: ${product.price}</p>
            <p>Supplier ID: {product.supplierId}</p>
            <p>
              Date Added: {new Date(product.dateAdded).toLocaleDateString()}
            </p>
            <p>Verified: {product.verified ? "Yes" : "No"}</p>
            {product.verified && (
              <p>
                Verified Date:{" "}
                {new Date(product.verifiedDate).toLocaleDateString()}
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => onVerify(product.id)}
              disabled={product.verified}
            >
              <Check className="mr-2 h-4 w-4" />
              Verify
            </Button>
            <Button
              onClick={() => onReject(product.id)}
              variant="destructive"
              disabled={product.verified}
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </CardFooter>
        </Card>
      ))}
    </ScrollArea>
  );
}
