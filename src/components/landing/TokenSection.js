"use client";

import { motion } from "motion/react";
import {
  RiCoinLine,
  RiArrowDownLine,
  RiArrowUpLine,
  RiShieldCheckLine,
} from "react-icons/ri";

const earnMethods = [
  { label: "Follow on X", reward: "+50 ASCP" },
  { label: "Like & Repost", reward: "+30 ASCP" },
  { label: "Join Telegram", reward: "+75 ASCP" },
  { label: "Analyze Token", reward: "+100 ASCP" },
  { label: "Daily Login", reward: "+20 ASCP" },
];

const spendMethods = [
  { label: "Full AI Report", cost: "200 ASCP" },
  { label: "Gem Scanner Pro", cost: "150 ASCP" },
  { label: "Wallet Intel", cost: "100 ASCP" },
  { label: "Alpha Alerts", cost: "75 ASCP" },
];

export default function TokenSection() {
  return (
    <section id="token" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-[#F5D90A] font-semibold uppercase tracking-wider">
            Token Utility
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">
            The <span className="text-[#F5D90A]">$ASCP</span> Economy
          </h2>
          <p className="text-[#888] mt-4 max-w-2xl mx-auto">
            Earn tokens through community engagement. Spend them to unlock
            premium AI insights and deep research features.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Earn */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 md:p-8 rounded-2xl border border-[#2A2A2A] bg-[#151515]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center">
                <RiArrowDownLine className="text-[#22C55E] text-lg" />
              </div>
              <h3 className="text-white font-semibold text-xl">Earn $ASCP</h3>
            </div>
            <div className="space-y-3">
              {earnMethods.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3 px-4 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]"
                >
                  <span className="text-[#ccc] text-sm">{item.label}</span>
                  <span className="text-[#22C55E] font-semibold text-sm">
                    {item.reward}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Spend */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 md:p-8 rounded-2xl border border-[#2A2A2A] bg-[#151515]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#F5D90A]/10 flex items-center justify-center">
                <RiArrowUpLine className="text-[#F5D90A] text-lg" />
              </div>
              <h3 className="text-white font-semibold text-xl">Spend $ASCP</h3>
            </div>
            <div className="space-y-3">
              {spendMethods.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3 px-4 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]"
                >
                  <span className="text-[#ccc] text-sm">{item.label}</span>
                  <span className="text-[#F5D90A] font-semibold text-sm">
                    {item.cost}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Security note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex items-center justify-center gap-3 text-[#888] text-sm"
        >
          <RiShieldCheckLine className="text-[#F5D90A]" />
          <span>
            Protected by wallet-based authentication, daily limits, and
            anti-farming safeguards
          </span>
        </motion.div>
      </div>
    </section>
  );
}
