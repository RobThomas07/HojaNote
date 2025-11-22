import { useEffect, useState } from "react";

export function LoadingScreen({ onLoadComplete }: { onLoadComplete: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onLoadComplete, 600);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-lime-50 via-yellow-50 to-white transition-opacity duration-600 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <div className="relative inline-block animate-pulse">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            <g className="animate-[wiggle_2s_ease-in-out_infinite]">
              <path
                d="M60 10C55 15 50 25 48 35C46 45 46 55 48 65C50 75 55 85 60 90C65 85 70 75 72 65C74 55 74 45 72 35C70 25 65 15 60 10Z"
                fill="url(#leafGradient)"
                stroke="hsl(140, 60%, 35%)"
                strokeWidth="2"
              />
              <path
                d="M60 30L55 50L60 70L65 50L60 30Z"
                stroke="hsl(140, 60%, 35%)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M60 40L52 50M60 50L52 60M60 60L52 70"
                stroke="hsl(140, 60%, 35%)"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d="M60 40L68 50M60 50L68 60M60 60L68 70"
                stroke="hsl(140, 60%, 35%)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </g>
            <defs>
              <linearGradient
                id="leafGradient"
                x1="60"
                y1="10"
                x2="60"
                y2="90"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="hsl(84, 85%, 55%)" />
                <stop offset="50%" stopColor="hsl(84, 85%, 45%)" />
                <stop offset="100%" stopColor="hsl(140, 60%, 35%)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-bold text-lime-700">HojaNote</h1>
        <p className="mt-2 text-sm text-lime-600">Loading your workspace...</p>
      </div>
    </div>
  );
}
