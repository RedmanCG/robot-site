import FloatingNav from "@/components/FloatingNav";
import HeroSection from "@/components/HeroSection";
import VideoCard from "@/components/VideoCard";
import ComparisonSection from "@/components/ComparisonSection";
import OverviewCards from "@/components/OverviewCards";
import WhatChangesSection from "@/components/WhatChangesSection";
import ExternalEmbedSection from "@/components/ExternalEmbedSection";
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
      <ComparisonSection />
      <Footer />
    </main>
  );
}
