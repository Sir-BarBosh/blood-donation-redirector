"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Share2, Check } from "lucide-react";
import bloodDropIcon from "./icon.svg";

interface RedirectPageProps {
  redirectUrl: string;
  countryCode?: string;
}

export default function RedirectPage({ redirectUrl, countryCode }: RedirectPageProps) {
  const [countdown, setCountdown] = useState(5);
  const [copied, setCopied] = useState(false);

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

  const handleShare = async () => {
    const shareUrl = new URL(window.location.href);
    if (countryCode) {
      shareUrl.searchParams.set("country", countryCode);
    }
    try {
      await navigator.clipboard.writeText(shareUrl.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 p-4 transition-colors duration-500">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[50vh] h-[50vh] rounded-full bg-red-500/10 dark:bg-red-500/5 blur-[100px] pointer-events-none animate-blob"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[60vh] h-[60vh] rounded-full bg-rose-400/10 dark:bg-rose-900/10 blur-[120px] pointer-events-none animate-blob animation-delay-2000"></div>

      <div className="z-10 w-full max-w-md animate-fade-in-up">
        {/* Glassmorphism Card */}
        <div className="relative flex flex-col items-center rounded-3xl border border-white/20 bg-white/60 p-8 shadow-[0_8px_32px_0_rgba(226,54,54,0.1)] backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">
          
          <div className="relative mb-6">
            <Image
              src={bloodDropIcon}
              alt="Blood Drop Icon"
              width={88}
              height={88}
              className="drop-shadow-lg"
              priority
            />
            <div className="absolute -inset-4 z-[-1] animate-pulse rounded-full bg-red-500/20 blur-xl dark:bg-red-500/10"></div>
          </div>

          <h1 className="mb-2 text-center font-sans text-4xl font-extrabold tracking-tight text-blood-red dark:text-red-500 md:text-5xl">
            Redirecting...
          </h1>
          
          <p className="mb-8 text-center text-slate-600 dark:text-slate-300">
            We are sending you to your local blood donation website.
          </p>

          {/* Progress Ring & Countdown */}
          <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
            <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                className="text-slate-200 dark:text-slate-700"
                strokeWidth="6"
                stroke="currentColor"
                fill="transparent"
                r="44"
                cx="50"
                cy="50"
              />
              <circle
                className="text-blood-red transition-all duration-1000 ease-linear dark:text-red-500"
                strokeWidth="6"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="44"
                cx="50"
                cy="50"
                strokeDasharray="276.46"
                strokeDashoffset={276.46 - (276.46 * countdown) / 5}
              />
            </svg>
            <span className="font-mono text-3xl font-bold text-slate-800 dark:text-slate-100">
              {countdown}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-white hover:shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                <span>Copied Link!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 text-slate-400 transition-colors group-hover:text-red-500" />
                <span>Share Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
