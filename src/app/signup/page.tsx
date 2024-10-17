import React from "react";
import MapView from "@/components/maps/mapView";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;
const mapId = process.env.GOOGLE_MAPS_MAP_ID as string;

function Signup() {
  return (
    <div className="h-screen w-screen flex flex-row">
      <div className="w-3/4 m-auto h-[90%]">
        <MapView apiKey={API_KEY} mapId={mapId} />
      </div>
    </div>
  );
}

export default Signup;
