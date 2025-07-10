import { HeroContent } from "@/components/sub/hero-content";
import { HeroBackgroundLabels } from "./decor";


export const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full">
      <video
        id="bhole"
        autoPlay
        muted
        loop
        className="bhole absolute left-0 w-full h-full object-cover -z-20 scale-100"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      {/* Overlay */}
      <div className="absolute left-0 top-0 w-full h-full bg-black/10 -z-10" id="bhole2" />
      <HeroBackgroundLabels /> {/* 👈 floating balls */}

      <HeroContent />
    </div>
  );
};
