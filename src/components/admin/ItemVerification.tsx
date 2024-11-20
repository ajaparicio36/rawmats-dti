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
  verifyProduct: (id: string) => void;
  rejectProduct: (id: string) => void;
}

export function ItemVerification({
  products,
  verifyProduct,
  rejectProduct,
}: ItemVerificationProps) {
  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="font-semibold">
                Price: ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                Supplier ID: {product.supplierId}
              </p>
              <p className="text-sm text-muted-foreground">
                Date Added: {new Date(product.dateAdded).toLocaleDateString()}
              </p>
              {product.verified && (
                <p className="text-sm text-muted-foreground">
                  Verified Date:{" "}
                  {new Date(product.verifiedDate).toLocaleDateString()}
                </p>
              )}
            </CardContent>
            <CardFooter className="flex gap-2 justify-between">
              <Button
                onClick={() => verifyProduct(product.id)}
                disabled={product.verified}
                className="flex-1 bg-rawmats-primary-100"
              >
                <Check className="mr-2 h-4 w-4" />
                Verify
              </Button>
              <Button
                onClick={() => rejectProduct(product.id)}
                variant="destructive"
                disabled={product.verified}
                className="flex-1 bg-rawmats-feedback-error"
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
