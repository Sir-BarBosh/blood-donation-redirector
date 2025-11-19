"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import bloodDropIcon from "./icon.svg";

interface RedirectPageProps {
  redirectUrl: string;
}

export default function RedirectPage({ redirectUrl }: RedirectPageProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const redirectTimer = setTimeout(() => {
      window.location.replace(redirectUrl);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [redirectUrl]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-red-100 to-rose-200 p-4 text-center dark:from-gray-800 dark:to-gray-900">
      <div className="space-y-4">
        <Image
          src={bloodDropIcon}
          alt="Blood Drop Icon"
          width={80}
          height={80}
          className="mx-auto mb-4 animate-pulse"
          priority
        />
        <h1 className="font-sans text-5xl font-bold text-[#D32F2F] md:text-6xl">
          Redirecting...
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          We are sending you to your local blood donation website.
        </p>
        <p className="text-2xl font-mono font-bold text-gray-600 dark:text-gray-400">
          <span className="inline-block animate-countdown-pulse">{countdown}</span>
        </p>
      </div>
    </main>
  );
}
