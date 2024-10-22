import React from "react";
import Image from "next/image";

function RawmatsSplash() {
  return (
    <div className="w-screen bg-rawmats-secondary-300 items-center py-8 px-24 justify-items-center mb-10">
      <Image
        src="/RawmatsLogo.png"
        alt="Rawmats Splash"
        width={200}
        height={260}
      />
    </div>
  );
}

export default RawmatsSplash;
