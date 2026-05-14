"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TeamSection() {
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  });

  const team = [
    {
      name: "Hannes Schulze",
      title: "Chief Executive Officer",
      sub: "Strategy, Partnerships",
      image: "/images/Founder_CEO_Vision_Strategy_Partnerships_Hannes%20Schulze.jpg"
    },
    {
      name: "Mara Ruperti",
      title: "Creative Director",
      sub: "Design, Visual Direction",
      image: "/images/Creative_Director_Brand_Design_Visual_Direction_Mara_Ruperti.png"
    },
    {
      name: "Finn Rothmann",
      title: "Technical Lead",
      sub: "Robotics Systems",
      // Note: filenames might be swapped in the folder, but we match the name to the file with their name
      image: "/images/Sales_Media_Growth_Outreach_Content_Finn_rothmann.png" 
    },
    {
      name: "Hagen Rothmann",
      title: "Social Media & Growth",
      sub: "Content & Outreach",
      image: "/images/Technical_Lead_Robotics_Systems_Development_Hagen_Rothmann.png"
    }
  ];

  return (
    <section className="w-full py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative Wave Mesh Background Placeholder */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url('/images/Backround Dots.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          maskImage: 'linear-gradient(to top, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent)'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <motion.h2 
            {...fadeUp(0.1)}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-navy mb-2"
          >
            Strong team
          </motion.h2>
          <motion.h2 
            {...fadeUp(0.2)}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0088FF]"
          >
            behind ScantiX
          </motion.h2>
          <motion.div {...fadeUp(0.3)} className="w-16 h-1 bg-[#0088FF] mt-8 mb-6" />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {team.map((member, idx) => (
            <motion.div 
              key={member.name}
              {...fadeUp(0.3 + idx * 0.15)}
              className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden bg-[#f0f4f8] border border-brand-navy/5 shadow-sm group"
            >
              {/* Image */}
              <div className="absolute inset-0 w-full h-full grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Label Card */}
              <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transform transition-transform duration-500 group-hover:-translate-y-1 sm:group-hover:-translate-y-2">
                <h3 className="text-[#0088FF] font-bold text-sm sm:text-lg mb-0.5 sm:mb-1 tracking-tight truncate">{member.name}</h3>
                <p className="text-brand-navy font-bold text-[10px] sm:text-[13px] leading-tight mb-0.5 sm:mb-1 truncate">{member.title}</p>
                <p className="text-brand-navy/50 text-[9px] sm:text-[12px] font-medium leading-tight truncate">{member.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
