import EmbedPointCloud from "./EmbedPointCloud";
import FadeUp from "./FadeUp";

interface ExternalEmbedProps {
  externalViewerUrl?: string;
}

export default function ExternalEmbedSection({
  externalViewerUrl = "https://my.matterport.com/show/?m=7ffnfBNamei&play=1",
}: ExternalEmbedProps) {
  return (
    <section id="outputs" className="w-full pt-12 pb-32 relative overflow-hidden">
      {/* Animated point-cloud background */}
      <EmbedPointCloud />

      {/* Top fade to white */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">

        <FadeUp className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">
            3D Model
          </h2>
          <p className="mt-2 text-xl font-serif font-light text-brand-muted max-w-2xl mx-auto">
            Navigate the reconstructed space.
          </p>
        </FadeUp>

        <FadeUp delay={0.15} className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden bg-brand-navy/5 shadow-[0_20px_50px_rgba(11,30,54,0.1)] border border-brand-border/40">
          <iframe
            src={externalViewerUrl}
            loading="lazy"
            className="w-full h-full object-cover"
            title="External Spatial Viewer"
            allowFullScreen
            allow="autoplay; fullscreen; web-share; xr-spatial-tracking;"
          />
        </FadeUp>
      </div>
    </section>
  );
}
