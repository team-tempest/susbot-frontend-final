import Head from "next/head";
import { HeroContent } from "@/components/sub/hero-content";
import { HeroBackgroundLabels } from "./decor";

export const Hero = () => {
  return (
    <>
      {/* 🔍 SEO Metadata */}
      <Head>
        <title>Susbot | AI Bot for Smart Web Security</title>
        <meta
          name="description"
          content="Susbot is an AI-enhanced security bot with stunning visuals, fast responses, and real-time monitoring."
        />
        <meta property="og:title" content="Susbot | AI Bot for Smart Web Security" />
        <meta
          property="og:description"
          content="Susbot is an AI-enhanced security bot with stunning visuals, fast responses, and real-time monitoring."
        />
        <meta property="og:image" content="/images/susbot-preview.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://susbot.com.s3-website.eu-central-1.amazonaws.com/" /> {/* Replace with actual site */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Susbot | AI Bot for Smart Web Security" />
        <meta name="twitter:description" content="Stunning 3D visuals, blazing fast AI responses — meet Susbot." />
        <meta name="twitter:image" content="/images/susbot-preview.png" />
      </Head>

      <div className="relative flex flex-col h-full w-full" aria-label="Hero Section">
  
        <video
          id="bhole"
          autoPlay
          muted
          loop
          playsInline
          className="bhole absolute left-0 w-full h-full object-cover -z-20 scale-100 brightness-75"
        >
          <source src="/videos/blackhole.webm" type="video/webm" />
          <source src="/videos/blackhole.webm" type="video/webm" />{/*To be replaced*/}
          Your browser does not support the video tag.
        </video>


        <div
          className="absolute left-0 top-0 w-full h-full bg-black/10 -z-10"
          id="bhole2"
        />

 
        <HeroBackgroundLabels />

        <div className="sr-only">
          <h1>Susbot – AI Bot for Smart Web Security</h1>
          <p>
            Susbot is an AI-enhanced security bot offering Visual Data, blazing-fast
            responses, and real-time system protection.
          </p>
        </div>
        <HeroContent />
      </div>
    </>
  );
};
