import { headers } from "next/headers";
import RedirectPage from "./redirect-page";
import sites from "@/data/donation-sites.json";

// Define the structure of the donation sites data
type Sites = {
  [key: string]: string;
};

function isValidHttpUrl(string: string) {
  let url;
  try {
    url = new URL(string);
  } catch {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

export default async function Home() {
  const FALLBACK_URL = "https://www.blood.co.uk/";
  let finalRedirectUrl = FALLBACK_URL;
  let determinedUrl = FALLBACK_URL;

  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "8.8.8.8"; // Default to a public IP for testing

    const geoRes = await fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`);
    if (!geoRes.ok) {
      throw new Error(`GeoJS API failed with status: ${geoRes.status}`);
    }
    const geoData = await geoRes.json();
    const countryCode = geoData.country_code;

    const typedSites: Sites = sites;

    if (countryCode && countryCode in typedSites) {
      determinedUrl = typedSites[countryCode];
    } else if ("default" in typedSites) {
      determinedUrl = typedSites["default"];
    }

  } catch (error) {
    console.error("Failed to determine redirect URL:", error);
  }

  if (isValidHttpUrl(determinedUrl)) {
    finalRedirectUrl = determinedUrl;
  }

  return <RedirectPage redirectUrl={finalRedirectUrl} />;
}
