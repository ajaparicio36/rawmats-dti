"use client";

import type React from "react";
import { useState } from "react";
import type { Supplier } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, ImageUp, Pencil, Star, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProfileProps {
  supplier: Supplier & { user: { email: string } };
}

const Profile: React.FC<ProfileProps> = ({ supplier }) => {
  const [bio, setBio] = useState(supplier.bio || "");
  const [phone, setPhone] = useState(supplier.businessPhone || "");
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  const router = useRouter();

  const handleSave = async (type: "bio" | "businessPhone", newData: string) => {
    await fetch(`/api/supplier/profile/${supplier.id}`, {
      method: "PATCH",
      body: JSON.stringify({ [type]: newData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (type === "bio") {
      setBio(newData);
      setIsBioModalOpen(false);
    } else {
      setPhone(newData);
      setIsPhoneModalOpen(false);
    }

    router.refresh();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg space-y-4 text-sm w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative group shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={
                "https://fugtxatemswintywrhoe.supabase.co/storage/v1/object/public/photos/businesses/default.jpg"
              }
              alt="default"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Upload button overlay */}
          <button
            className="absolute bottom-0 right-0 rounded-full bg-black/90 p-1.5 cursor-pointer hover:bg-black/70 transition-colors"
            onClick={() => console.log("clicked!")}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              {/* <Plus className="w-3 h-3 text-white" /> */}
              <ImageUp color="white" className="w-4 h-4" />
            </div>
          </button>
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-800">
            {supplier.businessName}
          </h1>
          <p className="text-green-600 text-xs font-semibold">
            RawMats Supplier
          </p>
          <div className="flex items-center gap-1 mt-1">
            <div className="flex relative">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={`bg-${index}`}
                    size={16}
                    className="text-gray-200"
                  />
                ))}
              </div>
              <div
                className="flex absolute top-0 left-0 overflow-hidden"
                style={{ width: `${(4.8 / 5) * 100}%` }}
              >
                {[...Array(4)].map((_, index) => (
                  <Star
                    key={`fg-${index}`}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>
            <span className="text-xs text-gray-600">
              ({(4.8).toFixed(1)} • {Number(1432).toLocaleString()} reviews)
            </span>
          </div>
        </div>
      </div>

      <hr className="border-gray-300" />

      <div className="space-y-3">
        <h2 className="text-base font-medium text-gray-800">
          Personal Details
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between">
              <strong className="text-gray-700">Email:</strong>
            </div>
            <p className="text-gray-600 text-xs mt-1">{supplier.user.email}</p>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <strong className="text-gray-700">Phone:</strong>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 flex items-center gap-1 p-0 h-auto"
                onClick={() => setIsPhoneModalOpen(true)}
              >
                <Pencil size={12} /> Edit
              </Button>
            </div>
            <p className="text-gray-600 text-xs mt-1">
              {supplier.businessPhone}
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <strong className="text-gray-700">Bio</strong>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 flex items-center gap-1 p-0 h-auto"
              onClick={() => setIsBioModalOpen(true)}
            >
              {supplier.bio ? (
                <>
                  <Pencil size={12} /> Edit Bio
                </>
              ) : (
                <>
                  Add Bio <span className="text-lg font-bold">+</span>
                </>
              )}
            </Button>
          </div>
          {supplier.bio ? (
            <p className="text-gray-600 text-xs mt-1">{supplier.bio}</p>
          ) : (
            <p className="text-gray-400 italic text-xs mt-1">No bio added.</p>
          )}
        </div>
      </div>

      <hr className="border-gray-300" />

      <div className="space-y-3">
        <h2 className="text-base font-medium text-gray-800">
          Business Details
        </h2>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 bg-green-100 text-green-600 px-2 py-1 rounded-md text-xs font-semibold">
            <CheckCircle size={12} /> Verified
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <strong className="text-gray-700">Location:</strong>
            <p className="text-blue-500 text-xs mt-1 cursor-pointer hover:underline">
              {supplier.businessLocation}
            </p>
          </div>
          <div>
            <strong className="text-gray-700">Business Documents:</strong>
            <p className="text-gray-600 text-xs mt-1">
              {supplier.businessPicture || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Bio Edit Modal */}
      <Dialog open={isBioModalOpen} onOpenChange={setIsBioModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Bio</DialogTitle>
          </DialogHeader>
          <Textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsBioModalOpen(false)}>
              <X size={14} /> Cancel
            </Button>
            <Button onClick={() => handleSave("bio", bio)}>Save Bio</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Phone Edit Modal */}
      <Dialog open={isPhoneModalOpen} onOpenChange={setIsPhoneModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Phone Number</DialogTitle>
          </DialogHeader>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsPhoneModalOpen(false)}
            >
              <X size={14} /> Cancel
            </Button>
            <Button onClick={() => handleSave("businessPhone", phone)}>
              Save Phone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
