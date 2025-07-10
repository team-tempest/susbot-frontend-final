import { Hero } from "@/components/main/hero";
import { Skills } from "@/components/main/skills";
import {  SecurityDashboardSection } from "@/components/main/scan";
import { FAQSection } from "@/components/main/faq";
import { HowItWorksSection } from "@/components/main/hiw";
import { FeaturesSection } from "@/components/main/features";


export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <SecurityDashboardSection/>
        <HowItWorksSection/>
        <FeaturesSection/>
        <Skills />
        <FAQSection/>    
      </div>
    </main>
  );
}
