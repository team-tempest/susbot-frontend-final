"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

type SkillDataProviderProps = {
  src: string;
  name: string;
  width: number;
  height: number;
  index: number;
};

export const SkillDataProvider = ({
  src,
  name,
  width,
  height,
  index,
}: SkillDataProviderProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const animationDelay = 0.1;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      custom={index}
      transition={{ delay: index * animationDelay }}
    >
      <Image src={src} width={width} height={height} alt={name} />

    </motion.div>
  );
};
export const POPULAR_COINS = [
  {
    skill_name: "Bitcoin",
    image: "btc.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Ethereum",
    image: "eth.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Polygon",
    image: "poly.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "BNB",
    image: "bnb.png",
    width: 75,
    height: 75,
  },
  {
    skill_name: "Tether",
    image: "tether.png",
    width: 75,
    height: 75,
  },
  {
    skill_name: "XRP",
    image: "xrp.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Avalanche",
    image: "ava.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Doge",
    image: "doge.png",
    width: 70,
    height: 70,
  },
] as const;
