import { NextRequest, NextResponse } from "next/server";

function extractCoordinatesFromLink(link: string) {
  // Regex to match coordinates in the format: /place/lat,long
  console.log("Link", link);

  const coordMatch = link.match(/place\/([^,]+),([^,\/]+)/);
  console.log("coordMatch", coordMatch);

  if (coordMatch) {
    const [, latitude, longitude] = coordMatch;
    console.log("latitude", latitude);
    console.log("longitude", longitude);
    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
  }

  throw new Error("Could not extract coordinates from the link");
}

export const POST = async (request: NextRequest) => {
  try {
    const { locationLink } = await request.json();
    const { latitude, longitude } = extractCoordinatesFromLink(locationLink);
    const API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;
    console.log(latitude, longitude);
    console.log(API_KEY);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
      {
        next: {
          revalidate: 36000,
        },
        cache: "force-cache",
      },
    );

    const data = await response.json();
    console.log(data);
    const locationName = data.results[0]?.formatted_address;
    console.log(locationName);
    return NextResponse.json({ locationName });
  } catch (error) {
    console.error("Error fetching location name:", error);
    return NextResponse.json({ locationName: null });
  }
};
