"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Deep cinematic ease — explosive start, extremely long tail
const appleEase = [0.08, 1, 0.2, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.6, delay, ease: appleEase },
});

const btnClass =
  "btn-glow px-8 py-3.5 rounded-[2rem] text-[15px] text-brand-navy font-semibold tracking-wide bg-gradient-to-b from-white/70 to-[#f0f4f8]/50 backdrop-blur-[32px] border border-white/80 hover:-translate-y-0.5 transition-all duration-300";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[100dvh] min-h-[700px] overflow-hidden">
      {/* Background Image — blur-in reveal */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ filter: "blur(24px)", scale: 1.18, opacity: 0.6 }}
        animate={{ filter: "blur(0px)", scale: 1.12, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.08, 1, 0.2, 1] }}
        style={{ translateY: "-8%" }}
      >
        <Image
          src="/images/Hero Header Image.jpg"
          alt="Robot in construction interior"
          fill
          priority
          className="object-cover object-[70%_top] lg:object-[100%_top]"
        />
      </motion.div>

      {/* Atmospheric Gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-bg via-brand-bg/80 to-transparent sm:w-2/3 lg:w-[55%]" />

      {/* ── MOBILE layout (hidden on sm+) ── */}
      <div className="sm:hidden absolute inset-0 z-20 flex flex-col px-6 pt-28 pb-14">
        {/* Headline — 3 lines, left-aligned, big */}
        <div className="flex-1 flex flex-col items-start justify-start">
          {(["Always", "know what's", "changing"] as const).map((line, i) => (
            <div key={i} className="pb-1">
              <motion.span
                {...fadeUp(0.9 + i * 0.18)}
                className="block text-5xl font-bold tracking-tight text-brand-navy leading-[1.1]"
                style={{ filter: "blur(0.1px)" }}
              >
                {line}
              </motion.span>
            </div>
          ))}

          {/* Subtitle */}
          <motion.p
            {...fadeUp(1.45)}
            className="mt-6 text-lg font-serif font-light text-brand-muted leading-snug"
          >
            Your construction site.<br />
            Instantly accessible.
          </motion.p>
        </div>

        {/* Button — pinned to bottom */}
        <motion.div {...fadeUp(1.8)} className="mb-[50px]">
          <a href="#outputs">
            <button className={btnClass}>Test now</button>
          </a>
        </motion.div>
      </div>

      {/* ── DESKTOP layout (hidden below sm) ── */}
      <div className="hidden sm:flex items-start absolute inset-0 z-20 w-full max-w-7xl mx-auto px-12 lg:pl-36 lg:pr-24 pt-36">
        <div className="max-w-2xl">
          {/* Line 1 — never wraps */}
          <div className="pb-1">
            <motion.span
              {...fadeUp(0.9)}
              className="block text-6xl lg:text-7xl font-bold tracking-tight text-brand-navy leading-[1.05] whitespace-nowrap"
              style={{ filter: "blur(0.1px)" }}
            >
              Always know what&apos;s
            </motion.span>
          </div>
          {/* Line 2 */}
          <div className="pb-1">
            <motion.span
              {...fadeUp(1.08)}
              className="block text-6xl lg:text-7xl font-bold tracking-tight text-brand-navy leading-[1.05]"
              style={{ filter: "blur(0.1px)" }}
            >
              changing
            </motion.span>
          </div>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(1.4)}
            className="mt-4 text-2xl font-serif font-light text-brand-muted tracking-wide max-w-lg leading-tight"
          >
            Your construction site.<br />
            Instantly accessible.
          </motion.p>

          {/* CTA */}
          <motion.div {...fadeUp(1.75)} className="mt-8">
            <a href="#outputs">
              <button className={btnClass}>Test now</button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
