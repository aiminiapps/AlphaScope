"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { RiRocketLine, RiSearchEyeLine } from "react-icons/ri";
import Image from "next/image";

export default function Hero() {
  const customEase = [0.16, 1, 0.3, 1];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#090909] font-sans">
      {/* ─── Premium Architectural Grid Background ─── */}
      <div className="absolute inset-0 pointer-events-none flex justify-center">
        <div className="w-full h-full max-w-[1440px] relative">
          <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#333333" />
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#1A1A1A" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotGrid)" />
          </svg>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#090909_80%)]" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-8 items-center">
        
        {/* ─── Left Column (Unchanged - Perfection) ─── */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start z-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111111] border border-[#222222] mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5D90A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5D90A]"></span>
            </span>
            <span className="text-xs font-semibold tracking-wide text-[#999999] uppercase">
              AI Research Engine Live
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
            className="text-3xl sm:text-6xl md:text-[72px] font-medium leading-[1.15] tracking-[-0.02em] text-[#EFEFEF] mb-6"
          >
            Discover{" "}
            <span className="relative inline-block whitespace-nowrap px-4 py-1 mt-1 lg:mt-0">
              <motion.span
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.6, ease: customEase }}
                className="absolute inset-0 bg-[#F5D90A] rounded-full -z-10 origin-left"
              />
              <span className="text-[#090909] font-bold">Alpha</span>
            </span>
            <br className="hidden sm:block" />
            <span className="relative inline-block whitespace-nowrap px-5 py-2 mt-3 sm:mt-4">
               <motion.span
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, delay: 0.8, ease: customEase }}
                className="absolute inset-0 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full -z-10 origin-left"
              />
              <span className="text-[#EFEFEF]">Before Everyone Else.</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: customEase }}
            className="sm:text-lg text-sm text-[#777777] max-w-lg mb-10 leading-[1.6] font-light"
          >
            AlphaScope uses AI to scan blockchain data, detect hidden gems, and track smart wallets giving you the edge to find opportunities before they trend.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: customEase }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/app"
              className="group relative flex items-center justify-center gap-2 px-8 py-4 bg-[#F5D90A] text-[#090909] rounded-full font-semibold text-base overflow-hidden w-full sm:w-auto hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <RiRocketLine className="text-xl relative z-10 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              <span className="relative z-10">Launch App</span>
            </Link>
            
            <Link
              href="/app/analyzer"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-[#333333] text-[#EFEFEF] rounded-full font-medium text-base hover:bg-[#111111] hover:border-[#F5D90A]/50 w-full sm:w-auto transition-all duration-300"
            >
              <RiSearchEyeLine className="text-xl text-[#666666] group-hover:text-[#F5D90A] transition-colors" />
              Try Analyzer
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 flex gap-8 sm:gap-12 border-t border-[#222222] pt-8 w-full"
          >
            {[
              { value: "12K+", label: "Tokens Scanned" },
              { value: "89%", label: "Signal Accuracy" },
            ].map((stat) => (
               <div key={stat.label} className="flex mx-auto flex-col gap-1">
                <div className="text-2xl font-bold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] text-[#666666] font-medium tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─── Right Column: Premium AI/Data Web Graphic ─── */}
        <div className="relative w-full aspect-square hidden lg:flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="relative w-full h-full max-w-[750px] max-h-[750px]"
          >
            {/* Master Floating Container */}
            <motion.svg
              viewBox="0 0 500 500"
              className="w-full h-full overflow-visible scale-125"
            >

              {/* ─── Architectural Base Paths (The Circuit Board) ─── */}
              <g strokeLinecap="round" strokeLinejoin="round" fill="none">
                
                {/* Block 1: Dark Gray Path (Top Left to Center) */}
                <path d="M 120 200 H 200 A 50 50 0 0 1 250 250 V 350" stroke="#151515" strokeWidth="64" />
                <path d="M 120 200 H 200 A 50 50 0 0 1 250 250 V 350" stroke="#222" strokeWidth="64" strokeDasharray="2 16" />
                
                {/* Block 2: Medium Gray Path (Bottom Right to Center) */}
                <path d="M 380 280 H 320 A 50 50 0 0 1 270 230 V 120" stroke="#1A1A1A" strokeWidth="64" />

                {/* Block 3: Gold Path (Right side looping down) */}
                <path d="M 400 150 V 220 A 40 40 0 0 1 360 260 H 320" stroke="#F5D90A" strokeWidth="48" opacity="0.95" />

                {/* ─── Infinite "Data Flow" Animations ─── */}
                {/* These are glowing lines that travel infinitely along the paths */}
                
                {/* Flow on Dark Gray Path */}
                <motion.path
                  d="M 120 200 H 200 A 50 50 0 0 1 250 250 V 350"
                  stroke="#F5D90A" strokeWidth="3"
                  strokeDasharray="40 300"
                  animate={{ strokeDashoffset: [340, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="drop-shadow-[0_0_8px_#F5D90A]"
                />

                {/* Flow on Medium Gray Path */}
                <motion.path
                  d="M 380 280 H 320 A 50 50 0 0 1 270 230 V 120"
                  stroke="#FFF" strokeWidth="2"
                  strokeDasharray="20 250"
                  animate={{ strokeDashoffset: [270, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
                  opacity="0.6"
                />

                {/* Flow on Gold Path */}
                <motion.path
                  d="M 400 150 V 220 A 40 40 0 0 1 360 260 H 320"
                  stroke="#FFF" strokeWidth="4"
                  strokeDasharray="30 200"
                  animate={{ strokeDashoffset: [230, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                />

                {/* ─── Nodes & Terminals ─── */}
                
                {/* Top Left Origin Terminal */}
                <circle cx="120" cy="200" r="32" fill="#090909" stroke="#222" strokeWidth="4" />
                {/* Radar pulse effect on terminal */}
                <motion.circle cx="120" cy="200" r="16" stroke="#F5D90A" strokeWidth="1"
                  animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeOut" }}
                />

                {/* Bottom Center Node */}
                <circle cx="250" cy="350" r="28" fill="#1C1C1C" />
                <motion.circle cx="250" cy="350" r="10" fill="#F5D90A"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="drop-shadow-[0_0_12px_#F5D90A]"
                />

                {/* Top Right Gold Terminal */}
                <circle cx="400" cy="150" r="24" fill="#F5D90A" />
                <circle cx="400" cy="150" r="8" fill="#090909" />

                {/* Top Center Node */}
                <rect x="246" y="96" width="48" height="48" rx="16" fill="#151515" stroke="#333" strokeWidth="2" />

                {/* Central AI Processing Hub */}
                <rect x="210" y="210" width="80" height="80" rx="24" fill="#090909" stroke="#2A2A2A" strokeWidth="2" className="drop-shadow-2xl" />
                <rect x="220" y="220" width="60" height="60" rx="16" fill="#151515" />
                
                {/* Rotating Core inside the Hub */}
               {/* ─── Static Agent Image Core inside the Hub ─── */}
                <defs>
                  <clipPath id="agentClip">
                    {/* The circle center (cx, cy) is x (235) + half width (15) */}
                    <circle cx="250" cy="250" r="15" />
                  </clipPath>
                </defs>

                {/* The circular agent image */}
                <image 
                  href="/agent.png" 
                  x="235" 
                  y="235" 
                  width="30" 
                  height="30" 
                  clipPath="url(#agentClip)"
                  preserveAspectRatio="xMidYMid slice"
                />

                {/* ─── Floating Decorators (Tech Details) ─── */}
                <motion.circle cx="360" cy="80" r="4" fill="#666"
                  animate={{ y: [-6, 6, -6], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
                <motion.rect x="100" y="380" width="12" height="12" rx="3" fill="#333"
                  animate={{ y: [-8, 8, -8], rotate: [0, 45, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                />
                
                {/* Subtle Crosshairs */}
                <path d="M 80 120 h 20 m -10 -10 v 20" stroke="#444" strokeWidth="1.5" />
                <path d="M 420 380 h 20 m -10 -10 v 20" stroke="#444" strokeWidth="1.5" />

              </g>
            </motion.svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}