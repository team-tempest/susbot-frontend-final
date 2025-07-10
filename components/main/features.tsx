"use client";

import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  BoltIcon,
  CubeTransparentIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";

export const FeaturesSection = () => {
  const features = [
    {
      title: "Real-Time Risk Scanning",
      description:
        "Analyze any Web3 address instantly for scam flags, malicious interactions, and risk scoring.",
      icon: ShieldCheckIcon,
    },
    {
      title: "AI-Powered Threat Detection",
      description:
        "Leverages AI heuristics and anomaly detection to identify suspicious behaviors before it's too late.",
      icon: BoltIcon,
    },
    {
      title: "Detailed Security Reports",
      description:
        "Get comprehensive breakdowns with risk scores, threat categories, transaction history, and contract details.",
      icon: ChartBarIcon,
    },
    {
      title: "Blacklist Integration",
      description:
        "Automatically flags addresses interacting with known scam, phishing, or dark pool contracts.",
      icon: ExclamationTriangleIcon,
    },
    {
      title: "Multi-Chain Support",
      description:
        "Compatible with Ethereum, BNB Smart Chain, Polygon, Arbitrum, and more (with additional chains coming).",
      icon: GlobeAltIcon,
    },
    {
      title: "Contract Metadata Lookup",
      description:
        "Fetch verified contract info, owner status, age, transaction count, and linked apps for any address.",
      icon: CubeTransparentIcon,
    },
  ];

  return (
    <section id="features" className="w-full px-6 py-24 flex justify-center items-center bg-transparent">
      <div className="w-full max-w-6xl flex flex-col gap-14 text-center">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          SusBot Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="backdrop-blur-lg bg-[#0F0A20]/50 border border-white/10 rounded-3xl p-8 flex flex-col gap-5 items-center text-center shadow-lg"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full">
                <feature.icon className="h-8 w-8 text-purple-400" />
              </div>

              <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>

              <p className="text-gray-300 text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
