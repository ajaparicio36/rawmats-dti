import React from "react";
import RawmatsSplash from "@/components/buyer-signup/RawmatsSplash";
import BuyerAttributeFields from "@/components/buyer-signup/BuyerAttributeFields";

function BuyerSignUp() {
  return (
    <div className="max-w-screen max-h-screen bg-rawmats-secondary-300 flex flex-col items-center">
      <RawmatsSplash />
      <BuyerAttributeFields />
    </div>
  );
}

export default BuyerSignUp;
