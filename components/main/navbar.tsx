"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export const FloatingNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        showNavbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}
    >
      <div className="flex items-center justify-between px-9 py-3 backdrop-blur-md bg-[#03001427] border border-white/20 shadow-lg rounded-full w-fit gap-10">
        {/* Left nav links */}
        <div className="flex gap-5 items-center">
          <Link
            href="#home"
            className="text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 transition font-medium"
          >
            Home
          </Link>
          <Link
            href="#pricing"
            className="text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 transition font-medium"
          >
            Pricing
          </Link>
          <Link
            href="#faqs"
            className="text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 transition font-medium"
          >
            FAQs
          </Link>
        </div>

        {/* Spacer */}
        <div className="w-[2px] h-6 bg-white/20 rounded-full"></div>

        {/* Right auth links */}
        <div className="flex gap-6 items-center">
          <Link
            href="#login"
            className="text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 transition font-medium"
          >
            Login
          </Link>

          <Link
            href="#get-started"
            className="px-4 py-2 bg-purple-500 text-white rounded-full shadow-md hover:opacity-90 transition font-medium"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};
