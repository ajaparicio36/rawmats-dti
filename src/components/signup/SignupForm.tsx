"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import LocationSelect from "./LocationSelect";
import { useEffect, useState } from "react";
import { uploadFile } from "@/utils/supabase/uploadFile";
import Image from "next/image";

type FormData = {
  businessName: string;
  businessAddress: string;
  businessDocuments: FileList;
};

export default function SignupForm({
  apiKey,
  mapId,
}: {
  apiKey: string;
  mapId: string;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>();

  const [businessAddress, setBusinessAddress] = useState<null | string>(null);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (businessAddress !== null) {
      // trigger form validation
      setValue("businessAddress", businessAddress);
      trigger("businessAddress");
    }
  }, [businessAddress, setValue, trigger]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setFilePreviews(newPreviews);
    }
  };

  const onSubmit = (data: FormData) => {
    Array.from(data.businessDocuments).forEach(async (file) => {
      await uploadFile(file);
    });
  };

  return (
    <div className="max-w-md p-6 font-inter mt-[-0.7rem] m-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div className="relative mb-8 mt-2">
          {errors.businessName && (
            <p className="absolute left-0 -top-4 text-red-500 text-xs">
              {errors.businessName.message}
            </p>
          )}
          <Input
            type="text"
            id="businessName"
            {...register("businessName", {
              required: "Business name is required",
            })}
            placeholder="Business Name"
            className="w-full p-5 border border-gray-400 focus:border-[#0A0830] focus:ring focus:ring-[#0A0830] rounded-xl"
          />
        </div>

        <div className="flex flex-col mb-8">
          <div className="relative flex items-center">
            {errors.businessAddress && (
              <p className="absolute left-0 -top-4 text-red-500 text-xs">
                {errors.businessAddress.message}
              </p>
            )}
            <Input
              type="text"
              id="address"
              value={businessAddress ?? ""}
              {...register("businessAddress", {
                required: "Business address is required",
              })}
              placeholder="Select your business address"
              className="flex-1 p-5 border border-gray-400 focus:border-[#0A0830] focus:ring focus:ring-[#0A0830] rounded-xl"
              readOnly
            />
            <div className="ml-2">
              <LocationSelect
                apiKey={apiKey}
                mapId={mapId}
                setBusinessAddress={setBusinessAddress}
              />
            </div>
          </div>
        </div>

        <div className="relative mb-8">
          {errors.businessDocuments && (
            <p className="absolute left-0 -top-4 text-red-500 text-xs">
              {errors.businessDocuments.message}
            </p>
          )}
          <div className="relative">
            <Label
              htmlFor="businessDocuments"
              className="text-gray-700 font-medium"
            >
              Upload Business Documents
            </Label>
            {errors.businessDocuments && (
              <p className="absolute left-0 -top-4 text-red-500 text-xs">
                {errors.businessDocuments.message}
              </p>
            )}
            <Input
              type="file"
              accept="image/*"
              multiple
              {...register("businessDocuments", {
                required: "Please upload at least one file",
                validate: (value) =>
                  value?.length > 0 || "Please upload at least one file",
                onChange: () => handleFileChange,
              })}
              className="my-3 border border-gray-400 rounded-xl cursor-pointer"
            />

            <div className="grid grid-cols-3 gap-3">
              {filePreviews.map((preview, index) => (
                <Image
                  key={index}
                  src={preview}
                  alt={`Selected file ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="mt-1 p-5 w-[45%] bg-[#0A0830] hover:bg-[#0d0b4d] text-white rounded-full"
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}
