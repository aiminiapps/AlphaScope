"use client";

import { motion } from "motion/react";
import { RiWalletLine, RiTrophyLine, RiSearchLine, RiRocketLine } from "react-icons/ri";

const steps = [
  {
    icon: RiWalletLine,
    step: "01",
    title: "Connect Wallet",
    description: "Link your wallet using RainbowKit to create your identity on the platform.",
  },
  {
    icon: RiTrophyLine,
    step: "02",
    title: "Earn $ASCP",
    description: "Complete quests and community tasks to earn ASCP tokens — no purchase required.",
  },
  {
    icon: RiSearchLine,
    step: "03",
    title: "Research & Analyze",
    description: "Use AI-powered tools to analyze tokens, scan gems, and track smart wallets.",
  },
  {
    icon: RiRocketLine,
    step: "04",
    title: "Discover Alpha",
    description: "Unlock premium insights, deep-dive reports, and alpha alerts before the crowd.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-[#F5D90A] font-semibold uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">
            Four Steps to Alpha
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-[#F5D90A]/0 via-[#F5D90A]/30 to-[#F5D90A]/0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#151515] border border-[#2A2A2A] mb-6">
                <step.icon className="text-[#F5D90A] text-2xl" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-[#F5D90A] text-[#0B0B0B] text-xs font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-[#888] text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
