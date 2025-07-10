"use client";

import { motion } from "framer-motion";
import {
  ClipboardIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";

export const HowItWorksSection = () => {
  const steps = [
    {
      title: "Paste the Address",
      description:
        "Enter the wallet, contract, or token address you want to check into our real-time scanner.",
      icon: ClipboardIcon,
    },
    {
      title: "Run AI Analysis",
      description:
        "SusBot instantly analyzes the address using AI risk models, transaction history, and blacklist flags.",
      icon: MagnifyingGlassIcon,
    },
    {
      title: "Get Security Report",
      description:
        "Receive a detailed risk score, threat breakdown, and smart recommendations — all within seconds.",
      icon: ShieldCheckIcon,
    },
    {
      title: "Stay Protected",
      description:
        "Use SusBot’s live insights to avoid scam tokens, phishing airdrops, and malicious contracts.",
      icon: BoltIcon,
    },
  ];

  return (
    <section id="how-it-works" className="w-full px-6 py-24 flex justify-center items-center bg-transparent">
      <div className="w-full max-w-6xl flex flex-col gap-14 text-center">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          How SusBot Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="backdrop-blur-lg bg-[#0F0A20]/50 border border-white/10 rounded-3xl p-6 flex flex-col gap-4 items-center text-center shadow-lg"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-purple-500/20 rounded-full">
                <step.icon className="h-7 w-7 text-purple-400" />
              </div>

              <h3 className="text-xl font-semibold text-white">{step.title}</h3>

              <p className="text-gray-300 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
