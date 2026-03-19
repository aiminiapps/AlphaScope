"use client";

import { motion } from "motion/react";
import {
  RiSearchEyeLine,
  RiVipDiamondLine,
  RiWallet3Line,
  RiNotification3Line,
  RiLineChartLine,
  RiCoinLine,
} from "react-icons/ri";

const float = (delay = 0) => ({
  animate: { y: [0, -8, 0] },
  transition: { repeat: Infinity, duration: 4, delay, ease: "easeInOut" },
});

const pulse = (delay = 0) => ({
  animate: { opacity: [0.4, 1, 0.4] },
  transition: { repeat: Infinity, duration: 3, delay, ease: "easeInOut" },
});


function AnalyzerVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glass analysis window */}
      <div className="w-[85%] max-w-[260px] rounded-2xl bg-[#111]/80 border border-[#1E1E1E] p-4 backdrop-blur-sm shadow-2xl">
        {/* Window dots */}
        <div className="flex gap-1.5 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#FF4444]/60" />
          <div className="w-2 h-2 rounded-full bg-[#F5D90A]/60" />
          <div className="w-2 h-2 rounded-full bg-[#22C55E]/60" />
        </div>

        {/* Search bar with typing cursor */}
        <div className="h-8 rounded-lg bg-[#0A0A0A] border border-[#222] flex items-center px-3 mb-4">
          <RiSearchEyeLine className="text-[#555] text-sm mr-2 shrink-0" />
          <motion.div
            animate={{ width: ["0%", "60%", "60%", "0%"] }}
            transition={{ repeat: Infinity, duration: 5, times: [0, 0.3, 0.7, 1] }}
            className="h-1.5 bg-[#F5D90A]/60 rounded-full"
          />
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-0.5 h-3.5 bg-[#F5D90A] ml-1 rounded-full"
          />
        </div>

        {/* Analysis bars */}
        <div className="space-y-2.5">
          {[
            { label: "Risk", w: "75%", color: "#22C55E", delay: 0.5 },
            { label: "Liquidity", w: "60%", color: "#3B82F6", delay: 0.8 },
            { label: "Volume", w: "85%", color: "#A855F7", delay: 1.1 },
          ].map((bar) => (
            <div key={bar.label} className="flex items-center gap-2">
              <span className="text-[9px] text-[#555] w-12 shrink-0 font-mono">
                {bar.label}
              </span>
              <div className="flex-1 h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: ["0%", bar.w, bar.w, "0%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    delay: bar.delay,
                    times: [0, 0.2, 0.8, 1],
                  }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: bar.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Score badge */}
        <motion.div
          animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.8, 0.8, 1, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 5, times: [0, 0.3, 0.4, 0.85, 1] }}
          className="mt-4 mx-auto w-fit px-4 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20"
        >
          <span className="text-[#22C55E] text-[10px] font-bold tracking-wider">
            SCORE: 8.7 / 10
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function GemScannerVisual() {
  const gems = [
    { name: "GEM", score: "9.2", color: "#F5D90A", dy: 0 },
    { name: "ALPHA", score: "8.6", color: "#3B82F6", dy: 20 },
    { name: "MOON", score: "7.9", color: "#A855F7", dy: 40 },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-[240px] mt-10 h-[180px]">
        {gems.map((gem, i) => (
          <motion.div
            key={gem.name}
            {...float(i * 0.8)}
            className="absolute w-full rounded-xl bg-[#111]/90 border border-[#1E1E1E] p-3.5 backdrop-blur-sm shadow-xl"
            style={{
              top: gem.dy,
              zIndex: 10 - i,
              left: i * 12,
              right: i * 10,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <motion.div
                  // animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 8 + i * 4, ease: "linear" }}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: `${gem.color}15`, border: `1px solid ${gem.color}30` }}
                >
                  <RiVipDiamondLine style={{ color: gem.color }} className="text-sm" />
                </motion.div>
                <div>
                  <div className="text-white text-xs font-bold">${gem.name}</div>
                  <div className="text-[#555] text-[9px]">Just listed</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <motion.span
                  {...pulse(i * 0.5)}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                  style={{
                    color: gem.color,
                    backgroundColor: `${gem.color}15`,
                  }}
                >
                  {gem.score}
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Glow behind cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#F5D90A]/5 rounded-full blur-[60px]" />
    </div>
  );
}

function WalletVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-36 h-36">
        {/* Orbit rings */}
        <div className="absolute inset-0 border border-[#1E1E1E] rounded-full" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute inset-[-16px] border border-[#1E1E1E]/40 rounded-full border-dashed"
        />

        {/* Center node */}
        <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#111] border border-[#A855F7]/40 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.15)] z-10">
          <RiWallet3Line className="text-[#A855F7] text-xl" />
        </div>

        {/* Orbiting wallets - ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute inset-0"
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-5 h-5 rounded-full bg-[#22C55E] border-2 border-[#0B0B0B] shadow-[0_0_12px_rgba(34,197,94,0.5)]"
            />
          </div>
          <div className="absolute -bottom-1 left-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
              className="w-4 h-4 rounded-full bg-[#F5D90A] border-2 border-[#0B0B0B] shadow-[0_0_12px_rgba(245,217,10,0.5)]"
            />
          </div>
          <div className="absolute -bottom-1 right-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3, delay: 1 }}
              className="w-3.5 h-3.5 rounded-full bg-[#3B82F6] border-2 border-[#0B0B0B] shadow-[0_0_12px_rgba(59,130,246,0.5)]"
            />
          </div>
        </motion.div>

        {/* Orbiting wallets - ring 2 (counter-rotate) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
          className="absolute inset-[-16px]"
        >
          <div className="absolute top-0 right-4">
            <div className="w-3 h-3 rounded-full bg-[#F97316] border-2 border-[#0B0B0B] shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
          </div>
          <div className="absolute bottom-2 left-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444] border-2 border-[#0B0B0B]" />
          </div>
        </motion.div>

        {/* Subtle connection lines via SVG */}
        <svg className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)] pointer-events-none">
          <motion.circle
            cx="50%"
            cy="50%"
            r="35%"
            fill="none"
            stroke="#A855F7"
            strokeWidth="0.5"
            strokeDasharray="4 6"
            animate={{ strokeDashoffset: [0, -40] }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          />
        </svg>
      </div>
    </div>
  );
}

function AlertsVisual() {
  const alerts = [
    { color: "#22C55E", icon: "🐋", text: "Whale bought 50 ETH", sub: "Just now" },
    { color: "#F97316", icon: "🔓", text: "Liquidity unlocked", sub: "2m ago" },
    { color: "#3B82F6", icon: "💎", text: "New gem detected", sub: "5m ago" },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative w-[90%] max-w-[240px] h-[160px]">
        {alerts.map((alert, i) => (
          <motion.div
            key={i}
            animate={{
              y: [30, 0, 0, -30],
              opacity: [0, 1, 1, 0],
              scale: [0.92, 1, 1, 0.92],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              delay: i * 2,
              times: [0, 0.08, 0.92, 1],
            }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-xl bg-[#111]/90 border border-[#1E1E1E] backdrop-blur-sm p-3 flex items-center gap-3 shadow-xl"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
              style={{ backgroundColor: `${alert.color}15` }}
            >
              {alert.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-semibold truncate">{alert.text}</div>
              <div className="text-[#555] text-[10px] mt-0.5">{alert.sub}</div>
            </div>
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: alert.color, boxShadow: `0 0 6px ${alert.color}` }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ChartVisual() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-3 px-2">
      {/* Price header */}
      <div className="w-full max-w-[260px] flex items-end justify-between px-1">
        <div>
          <div className="text-[#555] text-[9px] font-mono uppercase">Price</div>
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-white text-xl font-bold tracking-tight"
          >
            $0.0847
          </motion.div>
        </div>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-[#22C55E] text-xs font-bold bg-[#22C55E]/10 px-2 py-1 rounded-md"
        >
          +24.6%
        </motion.div>
      </div>

      {/* SVG Chart area */}
      <div className="w-full max-w-[260px] h-[120px] bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl relative overflow-hidden p-2">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 200 60"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[15, 30, 45].map((y) => (
            <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#1E1E1E" strokeWidth="0.5" />
          ))}
          {/* Area fill */}
          <motion.path
            d="M0,50 C20,45 30,30 50,35 C70,40 80,20 100,25 C120,30 130,10 150,15 C170,20 180,8 200,12 L200,60 L0,60 Z"
            fill="url(#chartFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
          />
          {/* Line */}
          <motion.path
            d="M0,50 C20,45 30,30 50,35 C70,40 80,20 100,25 C120,30 130,10 150,15 C170,20 180,8 200,12"
            fill="none"
            stroke="#22C55E"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 3, ease: "easeOut" }}
          />
          {/* Dot at end */}
          <motion.circle
            cx="200"
            cy="12"
            r="3"
            fill="#22C55E"
            animate={{ opacity: [0, 0, 1, 1, 0], scale: [0, 0, 1, 1.5, 0] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.45, 0.5, 0.9, 1] }}
          />
        </svg>

        {/* Scanning line */}
        <motion.div
          animate={{ left: ["-5%", "105%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute top-0 bottom-0 w-px"
          style={{
            background: "linear-gradient(to bottom, transparent, #22C55E40, transparent)",
            boxShadow: "0 0 8px #22C55E40",
          }}
        />
      </div>
    </div>
  );
}


/* ─── MAIN COMPONENT ─── */
export default function Features() {
  return (
    <section
      id="features"
      className="py-16 relative overflow-hidden bg-[#0B0B0B]"
    >

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">
            Your Unfair Advantage
          </h2>
          <p className="text-[#888] mt-4 max-w-xl mx-auto">
            Everything you need to find, analyze, and act on crypto opportunities
            before the crowd.
          </p>
        </motion.div>

        {/* ═══════ BENTO GRID ═══════ */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          {/* ── Card 1 · AI Token Analyzer (top-left, 3 cols) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3 rounded-3xl border border-[#1E1E1E] bg-gradient-to-b from-[#111] to-[#0A0A0A] flex flex-col overflow-hidden group hover:border-[#F5D90A]/20 transition-colors duration-500"
          >
            <div className="h-[260px] relative">
              <AnalyzerVisual />
            </div>
            <div className="p-7 pt-0">
              <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-2">
                <RiSearchEyeLine className="text-[#F5D90A]" /> AI Token Analyzer
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Input any contract and get instant AI-generated research with
                liquidity analysis, holder patterns, and risk scores.
              </p>
            </div>
          </motion.div>

          {/* ── Card 2 · Hidden Gem Scanner (top-right, 3 cols) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3 rounded-3xl border border-[#1E1E1E] bg-gradient-to-b from-[#111] to-[#0A0A0A] flex flex-col overflow-hidden group hover:border-[#3B82F6]/20 transition-colors duration-500"
          >
            <div className="h-[260px] relative">
              <GemScannerVisual />
            </div>
            <div className="p-7 pt-0">
              <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-2">
                <RiVipDiamondLine className="text-[#3B82F6]" /> Hidden Gem
                Scanner
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Continuously monitors new launches and surfaces tokens with
                unusual activity, strong traction, and high Alpha Scores.
              </p>
            </div>
          </motion.div>

          {/* ── Card 3 · Wallet Intelligence (mid-left, 2 cols) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 rounded-3xl border border-[#1E1E1E] bg-gradient-to-b from-[#111] to-[#0A0A0A] flex flex-col overflow-hidden group hover:border-[#A855F7]/20 transition-colors duration-500"
          >
            <div className="h-[220px] relative">
              <WalletVisual />
            </div>
            <div className="p-7 pt-2">
              <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                <RiWallet3Line className="text-[#A855F7]" /> Wallet Intelligence
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Track smart wallets. See what top investors are buying before the
                market reacts.
              </p>
            </div>
          </motion.div>

          {/* ── Card 4 · Alpha Alerts (mid-center, 2 cols) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-2 rounded-3xl border border-[#1E1E1E] bg-gradient-to-b from-[#111] to-[#0A0A0A] flex flex-col overflow-hidden group hover:border-[#F97316]/20 transition-colors duration-500"
          >
            <div className="h-[220px] relative">
              <AlertsVisual />
            </div>
            <div className="p-7 pt-2">
              <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                <RiNotification3Line className="text-[#F97316]" /> Real-Time
                Alerts
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Instant notifications for whale buys, liquidity spikes, and smart
                money movements.
              </p>
            </div>
          </motion.div>

          {/* ── Card 5 · Live Dashboard (mid-right, 2 cols, row-span-2) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-2 md:row-span-1 rounded-3xl border border-[#1E1E1E] bg-gradient-to-b from-[#111] to-[#0A0A0A] flex flex-col overflow-hidden group hover:border-[#22C55E]/20 transition-colors duration-500"
          >
            <div className="flex-1 min-h-[200px] relative">
              <ChartVisual />
            </div>
            <div className="p-7 pt-0">
              <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                <RiLineChartLine className="text-[#22C55E]" /> Advanced Tracking
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Real-time charts, and comprehensive volume tracking built directly into the platform.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
