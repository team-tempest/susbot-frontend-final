"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const faqs = [
  {
    question: "How accurate is SusBot’s risk analysis?",
    answer:
      "SusBot uses AI-enhanced heuristics combined with live blockchain data, scam reports, and on-chain interactions to deliver a reliable risk score. While no system is perfect, our models are tuned for maximum precision on scam and phishing contract detection.",
  },
  {
    question: "Which blockchains does SusBot support?",
    answer:
      "Currently, SusBot supports Ethereum Mainnet, BNB Smart Chain, Polygon, and Arbitrum. Support for Solana and Base is planned for Q3 2025.",
  },
  {
    question: "What data does SusBot scan for risk scoring?",
    answer:
      "We analyze transaction history, contract age, verified ownership, interactions with flagged addresses, blacklist status, transaction velocity, and AI-powered anomaly detection signals.",
  },
  {
    question: "Is my address data stored anywhere?",
    answer:
      "No — all scans happen in real-time through API calls without storing your wallet addresses. We prioritize privacy and security for every scan request.",
  },
];

export const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full px-6 py-20 flex justify-center items-center bg-transparent">
      <div className="w-full max-w-4xl flex flex-col gap-10 text-center">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="backdrop-blur-lg bg-[#0F0A20]/50 border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left text-white text-lg font-medium transition hover:bg-white/5"
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDownIcon className="h-6 w-6 text-purple-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="px-5 pb-5 text-gray-300 text-base"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
