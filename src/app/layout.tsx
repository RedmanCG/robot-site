import type { Metadata } from "next";
import { Montserrat, Merriweather } from "next/font/google";
import FilmGrain from "@/components/FilmGrain";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["300", "400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Robotics | Real-Time Intelligence",
  description: "Construction site intelligence and remote spatial awareness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${merriweather.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-brand-text bg-brand-bg relative overflow-x-hidden">
        {children}
        <FilmGrain className="fixed z-[999] pointer-events-none" style={{ inset: '-10px' }} />
      </body>
    </html>
  );
}
