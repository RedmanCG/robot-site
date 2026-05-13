import PDFViewerWrapper from "@/components/PDFViewerWrapper";
import FilmGrain from "@/components/FilmGrain";
import FloatingNav from "@/components/FloatingNav";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pitch Deck | Scantix",
  description: "Interactive presentation of the Scantix pitch deck.",
};

export default function PitchPage() {
  return (
    <main className="relative min-h-screen bg-[#f8f9fa] selection:bg-brand-orange/30 selection:text-brand-orange text-brand-navy overflow-hidden font-sans">
      <FilmGrain />
      <FloatingNav />

      <div className="pt-24 w-full min-h-screen flex flex-col relative z-10">

        {/* We use %20 to handle spaces in the filename safely */}
        <PDFViewerWrapper fileUrl="/Scantix%20Pitch%20Deck.pdf" />
      </div>

      <Footer />
    </main>
  );
}
