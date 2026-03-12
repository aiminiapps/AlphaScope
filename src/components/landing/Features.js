"use client";

import { motion } from "motion/react";
import { RiSearchEyeLine, RiVipDiamondLine, RiWallet3Line, RiNotification3Line } from "react-icons/ri";

const features = [
  {
    icon: RiSearchEyeLine,
    title: "AI Token Analyzer",
    description: "Input any contract address and get AI-generated research reports with liquidity analysis, holder patterns, and risk scores.",
  },
  {
    icon: RiVipDiamondLine,
    title: "Hidden Gem Scanner",
    description: "Continuously monitors new launches and surfaces tokens with unusual activity, strong traction, and high Alpha Scores.",
  },
  {
    icon: RiWallet3Line,
    title: "Wallet Intelligence",
    description: "Track smart wallets with proven track records. See what experienced investors are buying before the market catches on.",
  },
  {
    icon: RiNotification3Line,
    title: "Alpha Alerts",
    description: "Real-time signals for whale purchases, liquidity spikes, volume surges, and smart money movements.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-[#F5D90A] font-semibold uppercase tracking-wider">
            Core Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">
            Your Unfair Advantage
          </h2>
          <p className="text-[#888] mt-4 max-w-xl mx-auto">
            Everything you need to find, analyze, and act on crypto opportunities before the crowd.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 rounded-2xl border border-[#2A2A2A] bg-[#151515] card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F5D90A]/10 flex items-center justify-center mb-5 group-hover:bg-[#F5D90A]/20 transition-colors">
                <feature.icon className="text-[#F5D90A] text-xl" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">
                {feature.title}
              </h3>
              <p className="text-[#888] text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
