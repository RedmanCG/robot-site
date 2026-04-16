"use client";

import { Aperture, BrainCircuit, Columns3 } from "lucide-react";
import { motion } from "framer-motion";
import FadeUp from "./FadeUp";

export default function OverviewCards() {
  const steps = [
    {
      title: "Capture",
      desc: "Robot scans the site",
      Icon: Aperture,
    },
    {
      title: "Analyze",
      desc: "AI processes the data",
      Icon: BrainCircuit,
    },
    {
      title: "Deliver",
      desc: "Clear models and reports",
      Icon: Columns3,
    },
  ];

  // Flawless sweep synchronization based on actual mathematical epicenters.
  // The laser is 40% wide, so its bright center tracks perfectly at these ratios:
  const getPulseTimes = (idx: number) => {
    if (idx === 0) return [0, 0.06, 0.14, 0.30, 1]; // Peak 0.14. Fades out 0.2s slower (0.30 instead of 0.22)
    if (idx === 1) return [0, 0.42, 0.50, 0.66, 1]; // Peak 0.50. Fades out 0.2s slower (0.66 instead of 0.58)
    return [0, 0.78, 0.86, 1, 1];                   // Peak 0.86. Fades gracefully to the exact end of the loop
  };

  return (
    <section id="use-cases" className="relative w-full bg-white pt-8 pb-12 lg:pt-12 lg:pb-16">
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 lg:px-24">

        <FadeUp className="text-center mb-16 lg:mb-20 cursor-default">
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">
            How it works
          </h2>
        </FadeUp>

        <div className="relative">

          {/* Core Track Line (Desktop) */}
          <div className="hidden md:block absolute top-[3rem] left-[6rem] right-[6rem] h-[2px] bg-gray-100 overflow-hidden rounded-full">
            <motion.div
              animate={{ left: ["-40%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              className="absolute top-0 bottom-0 w-[40%] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_12px_rgba(59,130,246,0.6)]"
            />
          </div>

          {/* Core Track Line (Mobile) */}
          <div className="block md:hidden absolute left-[3rem] top-[5rem] bottom-[5rem] w-[2px] bg-gray-100 overflow-hidden rounded-full">
            <motion.div
              animate={{ top: ["-40%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              className="absolute left-0 right-0 h-[40%] bg-gradient-to-b from-transparent via-blue-500 to-transparent shadow-[0_0_12px_rgba(59,130,246,0.6)]"
            />
          </div>

          {/* Connected Nodes */}
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">
            {steps.map((step, idx) => (
              <FadeUp key={idx} delay={idx * 0.12} className="flex md:flex-col items-center md:text-center gap-8 md:gap-0 w-full md:w-[240px] group cursor-default">

                {/* Hardware Node Circle (Synchronized Pulse) */}
                <motion.div
                  animate={{
                    scale: [1, 1, 1.15, 1, 1],
                    backgroundColor: ["#ffffff", "#ffffff", "#eff6ff", "#ffffff", "#ffffff"],
                    borderColor: ["#f3f4f6", "#f3f4f6", "#bfdbfe", "#f3f4f6", "#f3f4f6"],
                    boxShadow: [
                      "0 4px 20px -4px rgba(11,30,54,0.05)",
                      "0 4px 20px -4px rgba(11,30,54,0.05)",
                      "0 12px 30px -4px rgba(59,130,246,0.3)",
                      "0 4px 20px -4px rgba(11,30,54,0.05)",
                      "0 4px 20px -4px rgba(11,30,54,0.05)"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut",
                    times: getPulseTimes(idx)
                  }}
                  className="relative flex-shrink-0 w-24 h-24 rounded-full border border-gray-100 flex items-center justify-center md:mb-8"
                >
                  <step.Icon className="w-10 h-10 text-blue-500" strokeWidth={1.5} />
                </motion.div>

                {/* Streamlined Descriptor */}
                <div className="flex flex-col md:items-center">
                  <h3 className="text-2xl font-bold text-brand-navy mb-0.5">{step.title}</h3>
                  <p className="text-[17px] text-gray-500 font-serif font-light leading-relaxed">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
