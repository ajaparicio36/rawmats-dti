"use client";

import React from "react";
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

function LocationSelect({ apiKey, mapId }: { apiKey: string; mapId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Set Business Location</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[95%] overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Select location</DialogTitle>
          <DialogDescription>
            Pinpoint the location of your business on the map and submit.
          </DialogDescription>
        </DialogHeader>
        <div className="flex h-[600px] md:h-[500px] w-full">
          <MapView apiKey={apiKey} mapId={mapId} />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LocationSelect;
