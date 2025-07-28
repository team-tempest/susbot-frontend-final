"use client"

import React from "react";
import DarkVeil from "@/components/sub/darkveil"; // Adjust path as needed

const CallToAction = () => {
  return (
    <div className="max-w-7xl p-6 lg:px-8">
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl rounded-2xl sm:rounded-3xl sm:px-24 xl:py-32">
       
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-inherit">
          <DarkVeil
            hueShift={330}
            noiseIntensity={0.02}
            scanlineIntensity={0.1}
            scanlineFrequency={80.0}
            warpAmount={0.05}
            speed={0.3}
            resolutionScale={1}
          />
        </div>

        {/* ✨ Foreground content */}
        <h2 className="relative z-10 mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Get Updates
        </h2>
        <div className="h-5" />
        <p className="relative z-10 mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
          Keep pace with Susbot's new advancements! Join our mailing list for
          selective, noteworthy updates.
        </p>

        <form className="relative z-10 mx-auto mt-10 flex max-w-md gap-x-4">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get updates
          </button>
        </form>

        {/* Optional SVG Decoration */}
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#gradient)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient
              id="gradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
             <stop stopColor="#A855F7" />
             <stop offset="1" stopColor="#7C3AED" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default CallToAction;
