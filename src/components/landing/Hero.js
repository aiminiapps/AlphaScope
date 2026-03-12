"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { RiRocketLine, RiSearchEyeLine } from "react-icons/ri";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#F5D90A]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#F5D90A]/3 rounded-full blur-[100px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2A2A2A] bg-[#151515] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#22C55E] pulse-dot" />
          <span className="text-sm text-[#888]">
            AI-Powered Research Engine Live
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-white">Discover Alpha</span>
          <br />
          <span className="gradient-text">Before Everyone Else</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-[#888] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          AlphaScope uses AI to scan blockchain data, detect hidden gems, and
          track smart wallets — giving you the edge to find opportunities before
          they trend.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/app"
            className="group flex items-center gap-2 px-8 py-4 bg-[#F5D90A] text-[#0B0B0B] rounded-xl font-bold text-base hover:shadow-[0_0_30px_rgba(245,217,10,0.3)] transition-all"
          >
            <RiRocketLine className="text-lg" />
            Launch App
          </Link>
          <Link
            href="/app/analyzer"
            className="flex items-center gap-2 px-8 py-4 border border-[#2A2A2A] text-white rounded-xl font-semibold text-base hover:border-[#F5D90A]/50 hover:bg-[#151515] transition-all"
          >
            <RiSearchEyeLine className="text-lg" />
            Try Analyzer
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "12K+", label: "Tokens Scanned" },
            { value: "2.4K", label: "Active Users" },
            { value: "89%", label: "Signal Accuracy" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#F5D90A]">
                {stat.value}
              </div>
              <div className="text-xs text-[#888] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
    </section>
  );
}
