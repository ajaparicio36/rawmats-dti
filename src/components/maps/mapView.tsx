"use client";

import React, { useState } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

const MapView = ({ apiKey, mapId }: { apiKey: string; mapId: string }) => {
  const [markerKey, setMarkerKey] = useState(0);
  const [clickedPosition, setClickedPosition] =
    useState<null | google.maps.LatLngLiteral>(null);

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        mapId={mapId}
        reuseMaps={true}
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid black",
          borderRadius: "15px",
          overflow: "hidden",
        }}
        defaultCenter={{
          lat: 10.730833,
          lng: 122.548056,
        }}
        defaultZoom={15}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        onClick={(event) => {
          setClickedPosition(event.detail.latLng);
          setMarkerKey((prevKey) => prevKey + 1);
        }}
      />

      {clickedPosition && (
        <AdvancedMarker
          key={markerKey}
          className="drop"
          position={clickedPosition}
          zIndex={50}
        />
      )}
    </APIProvider>
  );
};
export default MapView;
