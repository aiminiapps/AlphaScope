"use client";

import { motion } from "motion/react";
import { RiSearchEyeLine, RiVipDiamondLine, RiWallet3Line, RiNotification3Line, RiLineChartLine } from "react-icons/ri";

export default function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#0B0B0B]">
      {/* Background Glows */}
      <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-[#F5D90A]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-0 w-[500px] h-[500px] bg-[#3B82F6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[420px]">
          
          {/* 1. AI Token Analyzer (Top Left - 2 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 rounded-3xl border border-[#2A2A2A] bg-gradient-to-b from-[#151515] to-[#0D0D0D] p-8 flex flex-col relative overflow-hidden group"
          >
            <div className="flex-1 w-full flex items-center justify-center relative">
               {/* Animation Container */}
               <div className="w-full max-w-[200px] space-y-3">
                  <motion.div 
                    animate={{ y: [0, -4, 0] }} 
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="h-10 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center px-4"
                  >
                     <RiSearchEyeLine className="text-[#888] mr-2" />
                     <motion.div 
                       animate={{ width: ["0%", "40%", "40%", "0%"] }} 
                       transition={{ repeat: Infinity, duration: 4, times: [0, 0.2, 0.8, 1] }} 
                       className="h-1.5 bg-[#F5D90A] rounded-full"
                     />
                  </motion.div>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div 
                      animate={{ opacity: [0.5, 1, 0.5] }} 
                      transition={{ repeat: Infinity, duration: 2, delay: 1 }} 
                      className="h-16 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] p-2 flex flex-col justify-end"
                    >
                      <div className="h-6 w-full rounded-md bg-[#22C55E]/20 relative overflow-hidden">
                         <motion.div animate={{ height: ["20%", "80%", "20%"] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute bottom-0 left-0 w-full bg-[#22C55E] opacity-50" />
                      </div>
                    </motion.div>
                    <motion.div 
                      animate={{ opacity: [0.5, 1, 0.5] }} 
                      transition={{ repeat: Infinity, duration: 2, delay: 1.5 }} 
                      className="h-16 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] p-2 flex flex-col justify-end"
                    >
                      <div className="h-6 w-full rounded-md bg-[#EF4444]/20 relative overflow-hidden">
                         <motion.div animate={{ height: ["60%", "30%", "60%"] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute bottom-0 left-0 w-full bg-[#EF4444] opacity-50" />
                      </div>
                    </motion.div>
                  </div>
               </div>
            </div>
            <div className="mt-auto pt-6 border-t border-[#2A2A2A]/50">
              <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-2">
                <RiSearchEyeLine className="text-[#F5D90A]" /> AI Token Analyzer
              </h3>
              <p className="text-[#888] text-sm leading-relaxed">
                Input any contract and get instant AI-generated research, holder patterns, and risk analysis.
              </p>
            </div>
          </motion.div>

          {/* 2. Hidden Gem Scanner (Top Middle - 2 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 rounded-3xl border border-[#2A2A2A] bg-gradient-to-b from-[#151515] to-[#0D0D0D] p-8 flex flex-col relative overflow-hidden group"
          >
            <div className="flex-1 w-full relative">
              {/* Animated Cards Stacking */}
              <div className="absolute inset-x-0 inset-y-4 flex flex-col items-center justify-center">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [i * 20, i * 20 - 15, i * 20],
                      scale: [1 - i * 0.1, 1.05 - i * 0.1, 1 - i * 0.1],
                      opacity: [1 - i * 0.3, 1 - i * 0.2, 1 - i * 0.3]
                    }}
                    transition={{ repeat: Infinity, duration: 3, delay: i * 0.5, ease: "easeInOut" }}
                    className="w-full max-w-[220px] h-16 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl absolute flex items-center justify-between px-4 shadow-xl"
                    style={{ zIndex: 10 - i, marginTop: i * 20 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F5D90A] to-[#F97316] opacity-80" />
                      <div className="w-16 h-2 rounded bg-[#333]" />
                    </div>
                    <div className="w-10 h-4 rounded-full bg-[#22C55E]/20 flex items-center justify-center">
                       <div className="w-6 h-1 rounded bg-[#22C55E]" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mt-auto pt-6 border-t border-[#2A2A2A]/50 relative z-20">
              <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-2">
                <RiVipDiamondLine className="text-[#3B82F6]" /> Hidden Gem Tracker
              </h3>
              <p className="text-[#888] text-sm leading-relaxed">
                Monitors new launches and surfaces low-cap tokens with strong traction and high Alpha Scores.
              </p>
            </div>
          </motion.div>

          {/* 3. Wallet Intelligence (Top Right - 2 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 rounded-3xl border border-[#2A2A2A] bg-gradient-to-b from-[#151515] to-[#0D0D0D] p-8 flex flex-col relative overflow-hidden group"
          >
            <div className="flex-1 w-full flex items-center justify-center relative">
               <div className="relative w-40 h-40">
                 {/* Center Node */}
                 <div className="absolute inset-0 m-auto w-16 h-16 bg-[#1A1A1A] border-2 border-[#A855F7] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)] z-10">
                   <RiWallet3Line className="text-[#A855F7] text-2xl" />
                 </div>
                 {/* Orbit Rings */}
                 <div className="absolute inset-0 border border-[#2A2A2A] rounded-full" />
                 <div className="absolute inset-4 border border-[#2A2A2A]/50 rounded-full" />
                 
                 {/* Orbiting Wallets */}
                 <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="absolute inset-0">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#22C55E] rounded-full border-2 border-[#151515]" />
                    <div className="absolute bottom-4 left-0 w-5 h-5 bg-[#F5D90A] rounded-full border-2 border-[#151515]" />
                    <div className="absolute bottom-4 right-0 w-4 h-4 bg-[#3B82F6] rounded-full border-2 border-[#151515]" />
                 </motion.div>
               </div>
            </div>
            <div className="mt-auto pt-6 border-t border-[#2A2A2A]/50">
              <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-2">
                <RiWallet3Line className="text-[#A855F7]" /> Wallet Intelligence
              </h3>
              <p className="text-[#888] text-sm leading-relaxed">
                Track smart wallets. See what top-performing investors are buying before the market reacts.
              </p>
            </div>
          </motion.div>

          {/* 4. Alpha Alerts (Bottom Left - 3 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-3 rounded-3xl border border-[#2A2A2A] bg-gradient-to-b from-[#151515] to-[#0D0D0D] p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group"
          >
            <div className="flex-1 w-full order-2 md:order-1">
              <h3 className="text-white font-bold text-2xl mb-3 flex items-center gap-2">
                <RiNotification3Line className="text-[#F97316]" /> Real-Time Alerts
              </h3>
              <p className="text-[#888] text-base leading-relaxed mb-6">
                Never miss a move. Get instant notifications for whale purchases, liquidity spikes, and smart money movements pushed directly to your dashboard.
              </p>
            </div>
            <div className="w-full md:w-1/2 h-48 relative order-1 md:order-2 flex items-center justify-center">
               <div className="relative w-full max-w-[260px] h-full flex items-center">
                  {/* Animating Toasts */}
                  {[
                    { color: "#22C55E", text: "Whale Buy: 50.2 ETH", time: "Just now" },
                    { color: "#F97316", text: "Liquidity unlocked", time: "2m ago" },
                    { color: "#3B82F6", text: "New trending gem", time: "5m ago" }
                  ].map((toast, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: [-20, 0, 0, -20],
                        opacity: [0, 1, 1, 0],
                        scale: [0.95, 1, 1, 0.95]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 6, 
                        delay: i * 2,
                        times: [0, 0.1, 0.9, 1]
                      }}
                      className="absolute w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 shadow-2xl flex items-center gap-4"
                      style={{ top: '50%', marginTop: '-36px' }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${toast.color}20` }}>
                        <RiNotification3Line style={{ color: toast.color }} className="text-lg" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-bold">{toast.text}</div>
                        <div className="text-[#555] text-xs">{toast.time}</div>
                      </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </motion.div>

          {/* 5. Advanced Terminal (Bottom Right - 3 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-3 rounded-3xl border border-[#2A2A2A] bg-gradient-to-b from-[#151515] to-[#0D0D0D] p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group"
          >
            <div className="w-full md:w-1/2 h-48 relative flex items-center justify-center">
               <div className="w-full max-w-[280px] h-32 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5 relative overflow-hidden">
                 <div className="flex items-center justify-between mb-4">
                   <div className="w-16 h-3 bg-[#333] rounded" />
                   <div className="w-10 h-4 bg-[#22C55E]/20 rounded text-[9px] text-[#22C55E] flex items-center justify-center font-bold">+24%</div>
                 </div>
                 {/* Animated SVG Chart */}
                 <svg className="w-full h-12 overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <motion.path 
                      d="M0,30 Q10,10 20,20 T40,10 T60,25 T80,5 T100,10"
                      fill="none"
                      stroke="#22C55E"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.path 
                      d="M0,30 Q10,10 20,20 T40,10 T60,25 T80,5 T100,10 L100,40 L0,40 Z"
                      fill="url(#gradientChart)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <defs>
                      <linearGradient id="gradientChart" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22C55E" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                 </svg>
                 
                 {/* Scanning horizontal line */}
                 <motion.div 
                   animate={{ x: ["-100%", "300%"] }} 
                   transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                   className="absolute top-0 bottom-0 w-px bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                 />
               </div>
            </div>
            <div className="flex-1 w-full">
              <h3 className="text-white font-bold text-2xl mb-3 flex items-center gap-2">
                <RiLineChartLine className="text-[#22C55E]" /> Advanced Tracking
              </h3>
              <p className="text-[#888] text-base leading-relaxed mb-6">
                Stay updated on every token with real-time charts, automated metrics, and comprehensive volume tracking built directly into the platform.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
