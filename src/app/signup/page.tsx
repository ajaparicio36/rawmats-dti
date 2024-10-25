"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const DesktopSignup = dynamic(() => import("@/components/signup/DesktopSignup"), {
  loading: () => <p>Loading desktop signup...</p>,
  ssr: true,
});

const MobileSignup = dynamic(() => import("@/components/signup/MobileSignup"), {
  loading: () => <p>Loading mobile signup...</p>,
  ssr: true,
});

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string;

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = React.useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false; 
  });

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export default function Signup() {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div className="h-screen w-screen flex flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        {isMobile ? (
          <MobileSignup apiKey={API_KEY} mapId={mapId} />
        ) : (
          <DesktopSignup apiKey={API_KEY} mapId={mapId} />
        )}
      </Suspense>
    </div>
  );
}
