"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const DashboardPreviewSection = () => {
  return (
    <section id="dashboard" className="w-full px-6 py-24 flex justify-center items-center bg-transparent">
      <div className="w-full max-w-5xl flex flex-col gap-10 text-center">
       

        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Get a glimpse of SusBot’s risk report dashboard — live scores, AI threat categories,
          transaction history, and smart recommendations for every Web3 address you scan.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="backdrop-blur-lg bg-[#0F0A20]/40 border border-white/10 rounded-3xl p-6 shadow-xl"
        >
          <Image
            src="/skills/dbs.png" // <- swap with your real dashboard screenshot or placeholder
            alt="SusBot Dashboard Preview"
            width={1200}
            height={700}
            className="rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};
