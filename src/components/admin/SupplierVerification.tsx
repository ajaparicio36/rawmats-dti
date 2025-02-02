"use client";

import { Check, MapPin, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Supplier, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { retrieveFile } from "@/utils/supabase/files";
import InlineLoading from "../Loading/InlineLoading";
import { SidebarTrigger } from "../ui/sidebar";

import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export function SupplierVerificationComponent({
  suppliers,
}: {
  suppliers: (Supplier & { user: User })[];
}) {
  const [files, setFiles] = useState<Record<string, string[]>>({});
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const toggleOpen = (state: boolean) => () => setOpen(state);

  const updateIndex = ({ index: current }: { index: number }) =>
    setIndex(current);

  const [isLoading, setIsLoading] = useState<{
    status: boolean;
    method: null | "verify" | "reject";
  }>({ status: false, method: null });

  useEffect(() => {
    const fetchFiles = async () => {
      const filesMap: Record<string, string[]> = {}; // Define the type for filesMap

      await Promise.all(
        suppliers.map(async (supplier) => {
          const rawFiles = await retrieveFile(supplier.userId);

          const filteredFiles = (rawFiles || []).filter(
            (file): file is string => file !== null,
          ); // Remove nulls

          filesMap[supplier.userId] = filteredFiles;
        }),
      );

      setFiles(filesMap);
    };

    fetchFiles();
  }, [suppliers]);

  const verifySupplier = async (id: string) => {
    setIsLoading({ status: true, method: "verify" });
    try {
      const response = await fetch(`/api/supplier/verify/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to verify supplier");
      }
      alert("Supplier verified successfully.");
    } catch (error) {
      console.error("Error verifying supplier:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An error occurred while verifying the supplier.");
      }
    } finally {
      setIsLoading({ status: false, method: null });
    }
  };

  const rejectSupplier = async (id: string) => {
    setIsLoading({ status: true, method: "reject" });
    try {
      const response = await fetch(`/api/supplier/reject/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to reject supplier");
      }
      alert("Supplier rejected successfully.");
    } catch (error) {
      console.error("Error rejecting supplier:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An error occurred while rejecting the supplier.");
      }
    } finally {
      setIsLoading({ status: false, method: null });
    }
  };

  return (
    <div className="h-screen">
      <div className="flex flex-row justify-center md:justify-start items-center w-full md:w-auto relative md:mb-5">
        <SidebarTrigger className="absolute md:static left-0 md:mr-4 border size-8 bg-gray-100" />
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Supplier Verification
        </h2>
      </div>
      {suppliers.map((supplier) => (
        <Card className="my-3" key={supplier.id}>
          <CardHeader>
            <CardTitle className="text-xl md:text-3xl">
              {supplier.businessName}
            </CardTitle>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <div className="flex flex-row gap-2 items-center text-sm md:text-base">
                <UserRound className="size-4 sm:size-5 md:size-6" />
                {supplier.user.displayName}
              </div>
              <div className="flex flex-row gap-2 items-center text-[10px] md:text-base">
                <MapPin className="size-4 sm:size-5 md:size-6 shrink-0" />
                <a
                  className="underline shrink"
                  href={supplier.businessLocation}
                  target="_blank"
                >
                  {supplier.businessLocation}
                </a>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-base md:text-lg">Business Documents:</p>
            <div className="w-full max-h-[400px] flex">
              {files[supplier.userId] && (
                <>
                  <Lightbox
                    index={index}
                    slides={files[supplier.userId].map((file) => ({
                      src: file,
                    }))}
                    plugins={[Inline]}
                    on={{
                      view: updateIndex,
                      click: toggleOpen(true),
                    }}
                    carousel={{
                      padding: 0,
                      spacing: 10,
                      imageFit: "contain",
                      finite: true,
                    }}
                    inline={{
                      style: {
                        width: "100%",
                        maxWidth: "700px",
                        aspectRatio: "3 / 2",
                        maxHeight: "400px",
                        objectFit: "contain",
                      },
                    }}
                  />

                  <Lightbox
                    open={open}
                    close={toggleOpen(false)}
                    index={index}
                    plugins={[Zoom]}
                    slides={files[supplier.userId].map((file) => ({
                      src: file,
                    }))}
                    on={{ view: updateIndex }}
                    animation={{ fade: 0 }}
                    controller={{
                      closeOnPullDown: true,
                      closeOnBackdropClick: true,
                    }}
                    zoom={{
                      scrollToZoom: true,
                      maxZoomPixelRatio: 10,
                      wheelZoomDistanceFactor: 200,
                      pinchZoomDistanceFactor: 200,
                    }}
                  />
                </>
              )}
              {(!files[supplier.userId] ||
                files[supplier.userId].length === 0) && (
                <Skeleton className="h-[350px] w-[500px] rounded-lg" />
              )}
            </div>
          </CardContent>
          <CardFooter className="flex gap-4 justify-center">
            <Button
              onClick={() => verifySupplier(supplier.userId)}
              disabled={supplier.verified || isLoading.status}
              className="flex-1 bg-rawmats-primary-300 hover:bg-rawmats-primary-100 min-w-[100px] max-w-[150px]"
            >
              {isLoading.method === "verify" ? (
                <InlineLoading message="Verifying" />
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Verify
                </>
              )}
            </Button>
            <Button
              onClick={() => rejectSupplier(supplier.userId)}
              variant="destructive"
              disabled={supplier.verified || isLoading.status}
              className="flex-1 bg-rawmats-feedback-error min-w-[100px] max-w-[150px]"
            >
              {isLoading.method === "reject" ? (
                <InlineLoading message="Rejecting" />
              ) : (
                <>
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
