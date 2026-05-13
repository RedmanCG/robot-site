"use client";

import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("@/components/PDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-6xl mx-auto rounded-2xl md:rounded-[2rem] bg-[#0D0D12]/80 backdrop-blur-sm border border-white/5">
      <div className="w-8 h-8 border-2 border-brand-orange/20 border-t-brand-orange rounded-full animate-spin mb-4"></div>
      <p className="text-white/50 font-mono text-sm tracking-widest uppercase">Loading Deck</p>
    </div>
  ),
});

export default function PDFViewerWrapper({ fileUrl }: { fileUrl: string }) {
  return <PDFViewer fileUrl={fileUrl} />;
}
