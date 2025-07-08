"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ScanSection = () => {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<null | "safe" | "risky">(null);

  const handleScan = () => {
    // Mock scan result
    const isSafe = Math.random() > 0.5;
    setResult(isSafe ? "safe" : "risky");
  };

  return (
    <section id="scanner" className="w-full flex justify-center items-center py-32 px-6 bg-transparent h-[50vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl flex flex-col gap-8 items-center text-center"
      >
        {/* Heading */}
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Scan a Web3 Address
        </h2>
        <p className="text-gray-400 text-lg max-w-xl">
          Paste a crypto wallet, contract, or token address below and let Susbot instantly analyze it for security risks.
        </p>

        {/* Glassmorphic Scan Box */}
        <div className="w-full backdrop-blur-md bg-[#03001433] border border-white/10 shadow-lg rounded-3xl p-6 flex flex-col gap-6 items-center">
          {/* Input */}
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter contract or wallet address..."
            className="w-full px-5 py-3 bg-[#0F0A20] text-gray-300 border border-purple-500/30 rounded-full focus:ring-2 focus:ring-purple-500/50 outline-none transition"
          />

          {/* Button */}
          <button
            onClick={handleScan}
            className="w-full px-5 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium rounded-full shadow-md hover:opacity-90 transition"
          >
            🔍 Scan Now
          </button>

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl border ${
                result === "safe"
                  ? "border-green-400 bg-green-500/10"
                  : "border-red-400 bg-red-500/10"
              }`}
            >
              {result === "safe" ? (
                <ShieldCheckIcon className="h-6 w-6 text-green-400" />
              ) : (
                <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
              )}
              <p className="text-gray-300 text-lg">
                {result === "safe"
                  ? "This address looks safe ✅"
                  : "High Risk! Be careful ⚠️"}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
