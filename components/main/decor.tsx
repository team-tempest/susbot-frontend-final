"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ShieldCheckIcon, CpuChipIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

export const HeroBackgroundLabels = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 30;
      const y = (e.clientY - innerHeight / 2) / 30;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const labelStyle = `px-5 py-4 w-64 flex flex-col gap-2 rounded-lg border border-white/20 
    backdrop-blur-md bg-white/10 shadow-[0_0_20px_2px_rgba(140,0,255,0.08)]
    clip-path-[polygon(0%_0%,100%_0%,100%_85%,85%_100%,0%_100%)]`;

  return (
    <>
      {/* Top Right Label */}
      <motion.div
        style={{ x: springX, y: springY }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-24 right-16 ${labelStyle}`}
      >
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="h-6 w-6 text-purple-400" />
          <h3 className="text-purple-300 font-semibold text-base">
            Web3 Shield
          </h3>
        </div>
        <p className="text-sm text-gray-300">
          Protect wallets and contracts in real time.
        </p>
      </motion.div>

      {/* Bottom Left Label */}
      <motion.div
        style={{ x: springX, y: springY }}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-24 left-16 ${labelStyle}`}
      >
        <div className="flex items-center gap-2">
          <CpuChipIcon className="h-6 w-6 text-cyan-400" />
          <h3 className="text-cyan-300 font-semibold text-base">
            AI-Powered Scan
          </h3>
        </div>
        <p className="text-sm text-gray-300">
          Detect risky addresses with smart AI heuristics.
        </p>
      </motion.div>
    </>
  );
};
