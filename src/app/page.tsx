import FloatingNav from "@/components/FloatingNav";
import HeroSection from "@/components/HeroSection";
import VideoCard from "@/components/VideoCard";

import OverviewCards from "@/components/OverviewCards";
import WhatChangesSection from "@/components/WhatChangesSection";
import ExternalEmbedSection from "@/components/ExternalEmbedSection";
import TeamSection from "@/components/pitch/TeamSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <FloatingNav />
      <HeroSection />
      
      <div className="relative -mt-12 sm:-mt-16 lg:-mt-24 z-40">
        <VideoCard />
      </div>

      <OverviewCards />
      <WhatChangesSection />
      <ExternalEmbedSection />

      <TeamSection />
      <Footer />
    </main>
  );
}
