"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ClipboardIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

export const SecurityDashboardSection = () => {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<null | "safe" | "risky">(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    if (!address) return;
    setIsScanning(true);
    setResult(null);
    setTimeout(() => {
      const isSafe = Math.random() > 0.5;
      setResult(isSafe ? "safe" : "risky");
      setIsScanning(false);
    }, 2000);
  };

  const threats = [
    { address: "0x4f3...a8cD", risk: "High", detected: "1 min ago" },
    { address: "0x9be...99F1", risk: "Medium", detected: "5 mins ago" },
    { address: "0x2b7...E71B", risk: "Critical", detected: "8 mins ago" },
    { address: "0x7dA...Fc80", risk: "High", detected: "12 mins ago" },
    { address: "0xC12...04AD", risk: "Medium", detected: "17 mins ago" },
  ];

  return (
    <div className="relative flex flex-col w-full">
      {/* Background */}
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute left-0 w-full h-full object-cover -z-20 scale-60"
      >
        <source src="/videos/encryption-bg.webm" type="video/webm" />
      </video>

      {/* Scanner */}
      <section className="w-full flex justify-center items-center py-32 px-6 bg-transparent min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl flex flex-col gap-10 items-center text-center"
        >
         

          <p className="text-white text-lg max-w-2xl">
            Enter any Web3 wallet, contract, or token address. Let SusBot’s AI engine run a security scan, generate a risk score, and flag any suspicious history.
          </p>

          {/* Scan Box */}
          <div className="w-full backdrop-blur-xl bg-[#03001466] border border-white/10 shadow-xl rounded-3xl p-8 flex flex-col gap-6 items-center">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Paste Web3 address..."
              className="w-full px-5 py-3 bg-[#0F0A20] text-gray-300 border border-purple-500/30 rounded-full focus:ring-2 focus:ring-purple-500/50 outline-none transition"
            />

            {/* Scan Button */}
            <button
              onClick={handleScan}
              disabled={isScanning}
              className={`w-full px-5 py-3 text-white font-medium rounded-full shadow-[0_0_10px_#a855f7] transition backdrop-blur-md border border-purple-500/30 ${
                isScanning
                  ? "bg-[#1F0A30]/50 cursor-not-allowed"
                  : "bg-[#1F0A30]/30 hover:bg-[#3D1A60]/40"
              }`}
            >
              {isScanning ? "Scanning..." : "Scan Address"}
            </button>

            {/* Scan Result */}
            <div className="w-full">
              {isScanning && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 justify-center text-white py-4"
                >
                  <ArrowPathIcon className="h-6 w-6 animate-spin text-cyan-400" />
                  <p className="text-lg">Running SusBot analysis...</p>
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`w-full p-6 rounded-3xl border ${
                    result === "safe"
                      ? "border-green-400 bg-green-500/10"
                      : "border-red-400 bg-red-500/10"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {result === "safe" ? (
                      <ShieldCheckIcon className="h-7 w-7 text-green-400" />
                    ) : (
                      <ExclamationTriangleIcon className="h-7 w-7 text-red-400" />
                    )}
                    <p className="text-xl font-semibold text-gray-200">
                      {result === "safe"
                        ? "This address is Safe ✅"
                        : "High Risk Detected ⚠️"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-gray-300">
                    <div><p className="text-sm text-gray-400 mb-1">Risk Score</p><p className="text-2xl">{result === "safe" ? "8.9 / 10" : "2.7 / 10"}</p></div>
                    <div><p className="text-sm text-gray-400 mb-1">Reason</p><p>{result === "safe" ? "Clean transaction history." : "Suspicious inflows & flagged activity."}</p></div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition">
                      <ClipboardIcon className="h-5 w-5" /> Copy Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-transparent border border-white/20 text-gray-300 rounded-full hover:bg-white/10 transition">
                      View Full Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full hover:opacity-90 transition">
                      <SparklesIcon className="h-5 w-5" /> AI Explanation
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Live Threat Feed */}
          <div className="w-full flex flex-col gap-8">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-500">
              Live Threat Feed
            </h3>

            <div className="backdrop-blur-lg bg-[#0F0A20]/50 border border-white/10 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-3 text-gray-400 text-sm uppercase border-b border-white/10 px-6 py-3">
                <p>Address</p>
                <p>Risk</p>
                <p>Detected</p>
              </div>

              {threats.map((threat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="grid grid-cols-3 px-6 py-4 border-b border-white/5 text-white items-center"
                >
                  <div className="flex items-center gap-2">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                    <span className="font-mono">{threat.address}</span>
                  </div>
                  <p
                    className={`font-semibold ${
                      threat.risk === "Critical"
                        ? "text-red-500"
                        : threat.risk === "High"
                        ? "text-orange-400"
                        : "text-yellow-300"
                    }`}
                  >
                    {threat.risk}
                  </p>
                  <p className="text-sm text-gray-400">{threat.detected}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
