"use client";

import React, { useState } from "react";
import { Supplier } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { CheckCircle, Edit3, Pencil, Star } from "lucide-react";
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex justify-center items-center text-white text-3xl font-bold">
          {supplier.businessName.charAt(0)}
        </div>
        <h1 className="text-2xl font-semibold">{supplier.businessName}</h1>
        <p className="text-gray-500">{supplier.user.email}</p>
        <div className="flex items-center gap-2">
          <div className="flex relative">
            {/* Background stars (gray) */}
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star key={`bg-${index}`} size={20} className="text-gray-200" />
              ))}
            </div>
            {/* Foreground stars (filled) */}
            <div
              className="flex absolute top-0 left-0 overflow-hidden"
              // style={{ width: `${(4.8 / 5) * 100}%` }}
            >
              {[...Array(4)].map((_, index) => (
                <Star
                  key={`fg-${index}`}
                  size={20}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          </div>
          <span className="text-sm text-gray-600">
            ({(4.8).toFixed(1)} • {Number(1432).toLocaleString()} reviews)
          </span>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Edit3 size={16} />
          Edit Profile
        </Button>
      </div>

      <div className="mt-6 border-t pt-6 space-y-4">
        <div className="text-gray-600">
          <strong>Business Location:</strong>{" "}
          <span className="text-blue-500 text-sm cursor-pointer hover:underline">
            {supplier.businessLocation}
          </span>
        </div>
        <div className="text-gray-600">
          <strong>Business Phone:</strong> {supplier.businessPhone}
        </div>
        <div className="text-gray-600 flex items-center gap-2">
          <strong>Verified:</strong>
          {supplier.verified ? (
            <span className="flex items-center gap-1 bg-green-100 text-green-600 px-2 py-1 rounded-md text-sm font-semibold">
              <CheckCircle size={14} /> Yes
            </span>
          ) : (
            <span className="text-red-500 font-semibold">No</span>
          )}
        </div>
        <div className="text-gray-600">
          <strong>Verification Date:</strong>{" "}
          {new Date(supplier.verifiedDate).toLocaleDateString()}
        </div>

        <div className="flex items-center justify-between">
          <strong className="text-gray-600">Bio:</strong>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 flex items-center gap-1 p-0"
            onClick={() => setIsBioModalOpen(true)}
          >
            {bio ? (
              <>
                <Pencil size={16} />
                Edit Bio
              </>
            ) : (
              <>
                Add Bio <span className="text-xl font-bold">+</span>
              </>
            )}
          </Button>
        </div>
        {bio && <p className="text-gray-500 italic mt-1">{bio}</p>}
      </div>

      <Dialog open={isBioModalOpen} onOpenChange={setIsBioModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Bio</DialogTitle>
          </DialogHeader>
          <Textarea
            value={bio}
            onChange={handleBioChange}
            placeholder="Write something about your business..."
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <DialogFooter className="flex justify-end mt-4">
            <Button variant="outline" onClick={() => setIsBioModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveBio}>Save Bio</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
