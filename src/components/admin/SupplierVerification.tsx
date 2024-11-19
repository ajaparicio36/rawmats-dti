import { Check, MapPin, X } from "lucide-react";
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
import { Supplier } from "@prisma/client";
import { useEffect, useState } from "react";
import { retrieveFile } from "@/utils/supabase/files";
import Image from "next/image";

export function SupplierVerification({ suppliers }: { suppliers: Supplier[] }) {
  const [files, setFiles] = useState<(string | null)[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      await Promise.all(
        suppliers.map(async (supplier) => {
          const files = await retrieveFile(supplier.userId);

          if (!files) {
            setFiles([]);
          } else {
            setFiles(files);
          }
        }),
      );
    };

    fetchFiles();
  }, [suppliers]);

  return (
    <ScrollArea>
      {suppliers.map((supplier) => (
        <Card className="my-3" key={supplier.id}>
          <CardHeader>
            <CardTitle>{supplier.businessName}</CardTitle>
            <CardDescription className="flex flex-row gap-2 items-center">
              <MapPin />
              {supplier.businessLocation}
            </CardDescription>
          </CardHeader>
          <CardContent>
            Business Documents:
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {files.map((file, index) =>
                file ? (
                  <Image
                    key={index}
                    src={file}
                    width={100}
                    height={100}
                    alt="business document"
                    className="h-auto w-auto"
                  />
                ) : (
                  <div key={index}>Img not found</div>
                ),
              )}
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button
              // onClick={() => verifysupplier(supplier.id)}
              disabled={supplier.verified}
            >
              <Check className="mr-2 h-4 w-4" />
              Verify
            </Button>
            <Button
              // onClick={() => rejectsupplier(supplier.id)}
              variant="destructive"
              disabled={supplier.verified}
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
