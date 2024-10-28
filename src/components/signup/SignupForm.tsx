"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import LocationSelect from "./LocationSelect";
import { useState } from "react";
import { PaperClipIcon } from "@heroicons/react/24/outline";

type FormData = {
  businessName: string;
  businessDocuments?: string;
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
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [businessAddress, setBusinessAddress] = useState<null | string>(null);

  const onSubmit = (data: FormData) => {
    console.log("Signup attempt with:", { ...data, businessAddress });
  };

  const businessNameValue = watch("businessName");
  const businessDocumentsValue = watch("businessDocuments");

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
            placeholder=" "
            className="w-full p-5 border border-gray-400 focus:border-[#0A0830] focus:ring focus:ring-[#0A0830] rounded-xl"
          />
          {!businessNameValue && (
            <Label
              htmlFor="businessName"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 font-medium bg-white px-1"
            >
              Business Name
            </Label>
          )}
        </div>

        <div className="flex flex-col mb-8">
          <div className="flex items-center">
            <Input
              type="text"
              id="address"
              value={businessAddress ?? ""}
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
            <Input
              type="text"
              id="businessDocuments"
              {...register("businessDocuments")}
              placeholder=" "
              className="w-full p-5 pr-10 border border-gray-400 focus:border-[#0A0830] focus:ring focus:ring-[#0A0830] rounded-xl"
              readOnly
            />
            {!businessDocumentsValue && (
              <Label
                htmlFor="businessDocuments"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 font-medium bg-white px-1"
              >
                Business Documents
              </Label>
            )}
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-0 bg-transparent"
              onClick={() => {
                console.log("Upload document button clicked");
              }}
            >
              <PaperClipIcon
                className="h-5 w-5 text-black"
                aria-hidden="true"
              />
            </button>
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
