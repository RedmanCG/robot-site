"use client";

import { useState } from "react";
import Image from "next/image";

export default function ComparisonSection() {
  const [activeSide, setActiveSide] = useState<"neutral" | "left" | "right">("neutral");

  const isLeft = activeSide === "left";
  const isRight = activeSide === "right";

  return (
    <section id="technology" className="relative w-full h-[85vh] min-h-[700px] bg-brand-navy overflow-hidden cursor-pointer">

      {/* Interactive Zones */}
      <div className="absolute inset-0 z-40 flex">
        <div
          className="w-1/2 h-full"
          onMouseEnter={() => setActiveSide("left")}
          onMouseLeave={() => setActiveSide("neutral")}
          // onClick is good for mobile
          onClick={() => setActiveSide(activeSide === "left" ? "neutral" : "left")}
        />
        <div
          className="w-1/2 h-full"
          onMouseEnter={() => setActiveSide("right")}
          onMouseLeave={() => setActiveSide("neutral")}
          onClick={() => setActiveSide(activeSide === "right" ? "neutral" : "right")}
        />
      </div>

      {/* Layer 1: 360 Camera (Left Layer) */}
      <div className={`absolute inset-0 z-20 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${isRight ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}>
        <Image
          src="/images/360 Cam Robot display.jpg"
          alt="360 Degree Camera Robot"
          fill
          className="object-cover object-center"
        />
        {/* Soft mask to fade the RIGHT side (the opposite side of this active image). */}
        <div className={`absolute inset-0 bg-[linear-gradient(to_right,transparent_55%,rgba(255,255,255,0.85)_100%)] transition-opacity duration-1000 ${isRight ? "opacity-0" : "opacity-100"
          }`} />
      </div>

      {/* Layer 2: LiDAR (Right Layer) */}
      <div className={`absolute inset-0 z-10 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${isLeft ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}>
        <Image
          src="/images/LiDAR Robot display.jpg"
          alt="LiDAR Robot"
          fill
          className="object-cover object-center"
        />
        {/* Soft mask to fade the LEFT side (the opposite side of this active image). */}
        <div className={`absolute inset-0 bg-[linear-gradient(to_left,transparent_55%,rgba(255,255,255,0.85)_100%)] transition-opacity duration-1000 ${isLeft ? "opacity-0" : "opacity-100"
          }`} />
      </div>

      {/* Base background that connects them in the center when neutral */}
      <div className="absolute inset-0 z-0 bg-brand-bg" />

      {/* Content overlays */}
      <div className="absolute inset-0 z-30 pointer-events-none max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">

        {/* Left Side Content - 360 Camera */}
        <div className={`absolute left-6 lg:left-16 top-12 lg:top-16 w-full max-w-xs transition-all duration-700 ease-out delay-100 ${isRight ? "opacity-0 -translate-x-8" : isLeft ? "opacity-100 translate-x-0" : "opacity-0 lg:opacity-60 translate-x-0"
          }`}>
          <div className="glass-panel p-6 rounded-2xl bg-gradient-to-b from-white/70 to-white/50 shadow-[0_20px_40px_rgba(11,30,54,0.1),inset_0_2px_4px_rgba(255,255,255,0.9)] border border-white/60">
            <h3 className="text-2xl font-bold text-brand-navy mb-4">360° Camera</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3" />
                <span className="text-sm font-serif font-light text-brand-muted leading-relaxed">Lightweight integration</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3" />
                <span className="text-sm font-serif font-light text-brand-muted leading-relaxed">Reduced data size</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3" />
                <span className="text-sm font-serif font-light text-brand-muted leading-relaxed">Full spatial site visibility</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side Content - LiDAR */}
        <div className={`absolute right-6 lg:right-16 top-12 lg:top-16 w-full max-w-xs transition-all duration-700 ease-out delay-100 ${isLeft ? "opacity-0 translate-x-8" : isRight ? "opacity-100 translate-x-0" : "opacity-0 lg:opacity-60 translate-x-0"
          }`}>
          <div className="glass-panel p-6 rounded-2xl bg-gradient-to-b from-white/70 to-white/50 shadow-[0_20px_40px_rgba(11,30,54,0.1),inset_0_2px_4px_rgba(255,255,255,0.9)] border border-white/60">
            <h3 className="text-2xl font-bold text-brand-navy mb-4">LiDAR</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3" />
                <span className="text-sm font-serif font-light text-brand-muted leading-relaxed">High-precision depth</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3" />
                <span className="text-sm font-serif font-light text-brand-muted leading-relaxed">Accurate spatial measurements</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3" />
                <span className="text-sm font-serif font-light text-brand-muted leading-relaxed">Dense point cloud output</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </section>
  );
}
