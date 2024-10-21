"use client";

import React, { useState } from "react";
import MapView from "@/components/signup/maps/mapView";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function LocationSelect({
  apiKey,
  mapId,
  setBusinessAddress,
}: {
  apiKey: string;
  mapId: string;
  setBusinessAddress: (location: null | string) => void;
}) {
  const [address, setAddress] = useState<null | google.maps.LatLngLiteral>(
    null,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Set Address</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[95%] overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Select location</DialogTitle>
          <DialogDescription>
            Pinpoint the location of your business on the map and submit.
          </DialogDescription>
        </DialogHeader>
        <div className="flex h-[600px] md:h-[500px] w-full">
          <MapView apiKey={apiKey} mapId={mapId} setAddress={setAddress} />
        </div>
        <DialogFooter className={`sm:justify-start ${address && "gap-3"}`}>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          {address && (
            <DialogClose asChild>
              <Button
                type="button"
                variant="default"
                onClick={() => {
                  setBusinessAddress(
                    `https://www.google.com/maps/place/${address.lat},${address.lng}`,
                  );
                }}
                className="bg-green-600"
              >
                Confirm Selection
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LocationSelect;
