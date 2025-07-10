"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export const FloatingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Track scroll direction to hide/show navbar
  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowNavbar(false); // scrolling down, hide
      } else {
        setShowNavbar(true); // scrolling up, show
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
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95%] transition-all duration-500 ${
        showNavbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-3 backdrop-blur-md bg-[#03001427] border border-white/20 shadow-lg rounded-full w-full">
        {/* Logo */}
        <Link href="/" className="flex flex-row justify-center items-center gap-2">
          <Image
            src="/skills/logo.png"
            alt="SusBot Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 transition font-medium">Susbot.</p>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 transition font-medium"
          >
            Home
          </Link>
          <Link
            href="#features"
            className="text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 transition font-medium"
          >
            Features
          </Link>
          <Link
            href="#faq"
            className="text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 transition font-medium"
          >
            FAQs
          </Link>

          <div className="w-[2px] h-6 bg-white/20 rounded-full"></div>

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

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-200 hover:text-purple-400 transition"
          >
            {isOpen ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Bars3Icon className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 backdrop-blur-lg bg-[#0F0A20]/70 border border-white/10 shadow-lg rounded-2xl p-6 flex flex-col gap-5 text-center text-gray-300 animate-fade-in-down">
          <Link
            href="#home"
            className="text-lg hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="#pricing"
            className="text-lg hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="#faqs"
            className="text-lg hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            FAQs
          </Link>
          <div className="w-full h-[1px] bg-white/10 rounded-full" />
          <Link
            href="#login"
            className="text-lg hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            href="#get-started"
            className="px-4 py-2 bg-purple-500 text-white rounded-full shadow-md hover:opacity-90 transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
};
