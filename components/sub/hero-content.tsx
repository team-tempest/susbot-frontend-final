"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center px-6 h-screen w-full z-[20]"
    >
      <div className="flex flex-col gap-5 justify-center items-center text-center">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-90 flex items-center gap-2"
        >
          <SparklesIcon className="text-[#b49bff] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">Web3 Security — Simplified and Trusted.</h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto"
        >
          <span>
            Your personal{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Web3
            </span>{" "}
            Threat detector in real time.
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-white my-5 max-w-[600px]"
        >
          Susbot is your Web3 security assistant — a real-time scanner that detects suspicious crypto addresses, scam contracts, and phishing links before you interact with them. Stay safe on the blockchain.
        </motion.p>

        <motion.div
          variants={slideInFromLeft(1)}
          className="flex items-center gap-4 mt-4"
        >
          {/* Documentation Button */}
          <Link
            href="#get-started"
            className="px-5 py-2 bg-purple-500 text-white rounded-full shadow-md hover:opacity-90 transition font-medium"
          >
            Documentation
          </Link>

          {/* Get Susbot AI Button (Glassmorphic) */}
          <Link
            href="#get-started"
            className="px-5 py-2 backdrop-blur-md bg-[#03001427] border border-white/20 text-gray-200 rounded-full shadow-lg hover:opacity-90 transition font-medium"
          >
            Get Susbot AI
          </Link>
        </motion.div>


      </div>
    </motion.div>
  );
};
