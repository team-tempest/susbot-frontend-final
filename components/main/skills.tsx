"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SkillText } from "@/components/sub/skill-text";

// ✅ Safe static image imports
import btc from "@/public/skills/btc.png";
import eth from "@/public/skills/eth.png";
import poly from "@/public/skills/poly.png";
import bnb from "@/public/skills/bnb.png";
import tether from "@/public/skills/tether.png";
import ava from "@/public/skills/ava.png";
import doge from "@/public/skills/doge.png";

// ✅ Skills data array
const SKILLS = [
  { name: "Bitcoin", image: btc },
  { name: "Ethereum", image: eth },
  { name: "Polygon", image: poly },
  { name: "BNB", image: bnb },
  { name: "Tether", image: tether },
  { name: "Avalanche", image: ava },
  { name: "Doge", image: doge },
];

export const Skills = () => {
  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20"
      style={{ transform: "scale(0.9)" }}
    >
      <SkillText />

      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {SKILLS.map(({ name, image }, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <Image src={image} alt={name} width={70} height={70} />
            <span className="text-white mt-1">{name}</span>
          </motion.div>
        ))}
      </div>

      {/* ✅ Video Background */}
      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
};
