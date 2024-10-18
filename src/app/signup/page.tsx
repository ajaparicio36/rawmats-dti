import React from "react";

import SignupForm from "@/components/signup/SignupForm";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;
const mapId = process.env.GOOGLE_MAPS_MAP_ID as string;

function Signup() {
  return (
    <div className="h-screen w-screen flex flex-row">
      <SignupForm apiKey={API_KEY} mapId={mapId} />
    </div>
  );
}

export default Signup;
