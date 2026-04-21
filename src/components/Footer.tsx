"use client";

import Link from "next/link";
import FadeUp from "./FadeUp";

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full overflow-hidden bg-[#f8fafc] pt-10 pb-8 border-t border-brand-border/40">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <FadeUp className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20 text-sm">
          
          {/* Column 1 - Brand */}
          <div className="col-span-1 lg:col-span-1 -mt-4 flex flex-col gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/scantix-logo.png"
              alt="Scantix"
              width={320}
              height={100}
              className="object-contain"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/keinsaas_Logo.png"
              alt="KeinSAAS"
              width={160}
              height={56}
              className="object-contain"
            />
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h5 className="font-semibold text-brand-navy uppercase tracking-wider mb-6 text-xs">Platform</h5>
            <ul className="space-y-4">
              <li><Link href="#technology" className="text-brand-muted hover:text-brand-navy transition-colors">Sensors</Link></li>
              <li><Link href="#use-cases" className="text-brand-muted hover:text-brand-navy transition-colors">How It Works</Link></li>
              <li><Link href="#outputs" className="text-brand-muted hover:text-brand-navy transition-colors">3D Model</Link></li>
            </ul>
          </div>

          {/* Column 3 - Legal */}
          <div>
            <h5 className="font-semibold text-brand-navy uppercase tracking-wider mb-6 text-xs">Legal</h5>
            <ul className="space-y-4">
              <li><a href="https://www.keinsaas.com/impressum" target="_blank" rel="noopener noreferrer" className="text-brand-muted hover:text-brand-navy transition-colors">Impressum</a></li>
              <li><a href="https://www.keinsaas.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-muted hover:text-brand-navy transition-colors">Datenschutz</a></li>
              <li><Link href="/terms" className="text-brand-muted hover:text-brand-navy transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-brand-muted hover:text-brand-navy transition-colors">Cookies</Link></li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h5 className="font-semibold text-brand-navy uppercase tracking-wider mb-6 text-xs">Contact</h5>
            <ul className="space-y-4">
              <li>
                <a href="mailto:finn.rothmann@scantix.de" className="text-brand-muted hover:text-brand-navy transition-colors">
                  finn.rothmann@scantix.de
                </a>
              </li>
              <li className="text-brand-muted">
                Järveana tee 9<br />11314 Tallinn, Estonia
              </li>
            </ul>
          </div>

        </FadeUp>

        <div className="pt-8 border-t border-brand-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-muted">
            &copy; {new Date().getFullYear()} Scantix. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-xs font-mono text-brand-muted">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
