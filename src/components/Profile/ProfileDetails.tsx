"use client";

import React, { useState } from "react";
import { Supplier } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { CheckCircle, Edit3, Pencil, Star, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ProfileProps {
  supplier: Supplier & { user: { email: string } };
}

const Profile: React.FC<ProfileProps> = ({ supplier }) => {
  const [bio, setBio] = useState(supplier.bio || "");
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  const handleSaveBio = () => {
    alert(`Bio saved: ${bio}`);
    setIsBioModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4 text-sm w-full">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-300 flex justify-center items-center text-white text-xl font-semibold">
          {supplier.businessName.charAt(0)}
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-800">
            {supplier.businessName}
          </h1>
          <p className="text-green-600 text-xs font-semibold">
            RawMats Supplier
          </p>
          <div className="flex items-center gap-1">
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
        <Button
          variant="outline"
          className="text-xs flex items-center gap-1 px-2 py-1"
        >
          <Edit3 size={12} /> Edit Profile
        </Button>
      </div>

      <hr className="border-gray-300" />

      <div className="space-y-3">
        <h2 className="text-base font-medium text-gray-800">
          Personal Details
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <strong className="text-gray-700">Email:</strong>
            <p className="text-gray-600 text-xs mt-1">{supplier.user.email}</p>
          </div>
          <div>
            <strong className="text-gray-700">Phone:</strong>
            <p className="text-gray-600 text-xs mt-1">
              {supplier.businessPhone || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <strong className="text-gray-700">Bio</strong>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 flex items-center gap-1 p-0"
            onClick={() => setIsBioModalOpen(true)}
          >
            {bio ? (
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
        {bio ? (
          <p className="text-gray-600 text-xs mt-1">{bio}</p>
        ) : (
          <p className="text-gray-400 italic text-xs mt-1">No bio added.</p>
        )}
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
        <div className="grid grid-cols-2 gap-2">
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

      <Dialog open={isBioModalOpen} onOpenChange={setIsBioModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Bio</DialogTitle>
          </DialogHeader>
          <Textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            value={bio}
            onChange={handleBioChange}
          />
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsBioModalOpen(false)}>
              <X size={14} /> Cancel
            </Button>
            <Button onClick={handleSaveBio}>Save Bio</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
