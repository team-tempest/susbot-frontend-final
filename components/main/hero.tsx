import { HeroContent } from "@/components/sub/hero-content";
import { HeroBackgroundLabels } from "./decor";


export const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute left-0 w-full h-full object-cover -z-20 scale-100 "  style={{ transform: "rotate(45deg)" }}
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      {/* Overlay */}
      <div className="absolute left-0 top-0 w-full h-full bg-black/20 -z-10" />
      <HeroBackgroundLabels/> {/* 👈 floating balls */}

      <HeroContent />
    </div>
  );
};
