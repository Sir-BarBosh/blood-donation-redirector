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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const FALLBACK_URL = "https://www.blood.co.uk/";
  let finalRedirectUrl = FALLBACK_URL;
  let determinedUrl = FALLBACK_URL;
  let countryCodeOverride = undefined;

  const params = await searchParams;
  if (typeof params.country === "string" && params.country.length === 2) {
    countryCodeOverride = params.country.toUpperCase();
  }
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || 
           headersList.get("x-real-ip")?.trim() || 
           "";

  let countryCode = countryCodeOverride;

  try {
    if (!countryCode) {
      let geoUrl = "https://get.geojs.io/v1/ip/geo.json"; // By default, uses the server's public IP (matches user's home network in local dev)

      // If we have a valid external IP, look up that specific IP instead
      if (ip && ip !== "::1" && ip !== "127.0.0.1" && !ip.startsWith("192.168.") && !ip.startsWith("10.")) {
        const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        const ipv6Regex = /^([0-9a-fA-F]{0,4}:){1,7}[0-9a-fA-F]{0,4}$/;
        if (ipv4Regex.test(ip) || ipv6Regex.test(ip)) {
          geoUrl = `https://get.geojs.io/v1/ip/geo/${ip}.json`;
        } else {
          console.warn(`Invalid IP format detected: ${ip}. Falling back to server IP.`);
        }
      }

      // Fetch with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

      const geoRes = await fetch(geoUrl, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!geoRes.ok) {
        throw new Error(`GeoJS API failed with status: ${geoRes.status}`);
      }
      const geoData = await geoRes.json();
      countryCode = geoData.country_code;
    }

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

  return <RedirectPage redirectUrl={finalRedirectUrl} countryCode={countryCodeOverride} />;
}
