"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  RiSearchLine,
  RiLockLine,
  RiCoinLine,
  RiShieldCheckLine,
  RiGroupLine,
  RiArrowRightUpLine,
  RiArrowRightDownLine,
  RiFlashlightLine,
  RiFileTextLine,
  RiStarLine,
} from "react-icons/ri";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { sampleAnalysis } from "@/lib/mockData";

const PIE_COLORS = ["#F5D90A", "#F97316", "#3B82F6", "#22C55E", "#A855F7"];

export default function AnalyzerPage() {
  const [address, setAddress] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const data = sampleAnalysis;

  const handleAnalyze = () => {
    if (address.trim()) setAnalyzed(true);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">AI Token Analyzer</h1>
        <p className="text-[#888] text-sm mt-1">
          Input a contract address to generate an AI-powered research report
        </p>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3"
      >
        <div className="relative flex-1">
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter token contract address (e.g., 0x1a2b...)"
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#151515] border border-[#2A2A2A] text-white text-sm placeholder:text-[#666] focus:outline-none focus:border-[#F5D90A]/50 transition-colors"
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
          />
        </div>
        <button
          onClick={handleAnalyze}
          className="px-6 py-3.5 rounded-xl bg-[#F5D90A] text-[#0B0B0B] font-semibold text-sm hover:bg-[#F5D90A]/90 transition-all shrink-0"
        >
          Analyze
        </button>
      </motion.div>

      {/* Results */}
      {analyzed && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Token Header */}
          <div className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F5D90A]/20 to-[#F97316]/20 flex items-center justify-center text-xl font-bold text-[#F5D90A]">
                  {data.token.symbol.slice(0, 2)}
                </div>
                <div>
                  <h2 className="text-white text-xl font-bold flex items-center gap-2">
                    {data.token.name}
                    <span className="text-[#888] text-sm font-normal">
                      ${data.token.symbol}
                    </span>
                  </h2>
                  <p className="text-[#888] text-xs mt-1 font-mono">
                    {data.token.address.slice(0, 10)}...{data.token.address.slice(-8)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-white text-xl font-bold">{data.token.price}</div>
                  <div className="text-[#22C55E] text-xs font-medium flex items-center justify-end gap-1">
                    <RiArrowRightUpLine /> +34.2%
                  </div>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-[#22C55E]/10 flex flex-col items-center justify-center">
                  <RiStarLine className="text-[#22C55E] text-sm" />
                  <span className="text-[#22C55E] text-xl font-bold">{data.alphaScore}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Liquidity", value: data.metrics.liquidity, change: data.metrics.liquidityChange, positive: true },
              { label: "24h Volume", value: data.metrics.volume24h, change: data.metrics.volumeChange, positive: true },
              { label: "Holders", value: data.metrics.holders.toLocaleString(), change: `+${data.metrics.holdersChange}`, positive: true },
              { label: "24h Txns", value: data.metrics.transactions24h.toLocaleString(), change: "", positive: true },
            ].map((m) => (
              <div key={m.label} className="p-4 rounded-xl border border-[#2A2A2A] bg-[#151515]">
                <span className="text-[#888] text-xs">{m.label}</span>
                <div className="text-white text-lg font-bold mt-1">{m.value}</div>
                {m.change && (
                  <span className="text-[#22C55E] text-xs font-medium">{m.change}</span>
                )}
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Price Chart */}
            <div className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
              <h3 className="text-white font-semibold mb-4">Price History (24h)</h3>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.priceHistory}>
                    <defs>
                      <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F5D90A" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#F5D90A" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} domain={["auto", "auto"]} />
                    <Tooltip contentStyle={{ backgroundColor: "#1E1E1E", border: "1px solid #2A2A2A", borderRadius: "12px", color: "#fff", fontSize: "12px" }} />
                    <Area type="monotone" dataKey="price" stroke="#F5D90A" strokeWidth={2} fill="url(#priceGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Risk Radar */}
            <div className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
              <h3 className="text-white font-semibold mb-4">Risk Analysis Radar</h3>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={data.riskFactors} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid stroke="#2A2A2A" />
                    <PolarAngleAxis dataKey="label" tick={{ fill: "#888", fontSize: 10 }} />
                    <Radar dataKey="score" stroke="#F5D90A" fill="#F5D90A" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* AI Summary */}
          <div className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
            <div className="flex items-center gap-2 mb-4">
              <RiFlashlightLine className="text-[#F5D90A]" />
              <h3 className="text-white font-semibold">AI Analysis Summary</h3>
            </div>
            <p className="text-[#ccc] text-sm leading-relaxed">{data.aiSummary}</p>
          </div>

          {/* Holder Distribution */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
              <h3 className="text-white font-semibold mb-4">Holder Distribution</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.holderDistribution} dataKey="percentage" nameKey="range" cx="50%" cy="50%" outerRadius={70} innerRadius={40} paddingAngle={3} strokeWidth={0}>
                      {data.holderDistribution.map((entry, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#1E1E1E", border: "1px solid #2A2A2A", borderRadius: "12px", color: "#fff", fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-3 mt-2 justify-center">
                {data.holderDistribution.map((entry, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-[#888]">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                    {entry.range} ({entry.percentage}%)
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Insights */}
            <div className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515] relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <RiFileTextLine className="text-[#F5D90A]" />
                <h3 className="text-white font-semibold">Premium Insights</h3>
              </div>

              {!unlocked ? (
                <>
                  <div className="space-y-3 filter blur-sm select-none">
                    {data.premiumInsights.map((insight, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-[#1E1E1E]">
                        <RiShieldCheckLine className="text-[#F5D90A] mt-0.5 shrink-0" />
                        <span className="text-[#ccc] text-sm">{insight}</span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-[#151515]/60 backdrop-blur-sm">
                    <button
                      onClick={() => setUnlocked(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-[#F5D90A] text-[#0B0B0B] rounded-xl font-semibold text-sm hover:shadow-[0_0_20px_rgba(245,217,10,0.3)] transition-all"
                    >
                      <RiLockLine />
                      Unlock for 200 ASCP
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  {data.premiumInsights.map((insight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="flex items-start gap-2 p-3 rounded-lg bg-[#1E1E1E] border border-[#2A2A2A]"
                    >
                      <RiShieldCheckLine className="text-[#22C55E] mt-0.5 shrink-0" />
                      <span className="text-[#ccc] text-sm">{insight}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Token Info */}
          <div className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
            <h3 className="text-white font-semibold mb-4">Token Details</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Chain", value: data.token.chain },
                { label: "Market Cap", value: data.token.marketCap },
                { label: "Total Supply", value: data.token.totalSupply },
                { label: "Circulating", value: data.token.circulatingSupply },
                { label: "Launch Date", value: data.token.launchDate },
              ].map((info) => (
                <div key={info.label}>
                  <span className="text-[#888] text-xs">{info.label}</span>
                  <div className="text-white text-sm font-medium mt-1">{info.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty state */}
      {!analyzed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#151515] border border-[#2A2A2A] flex items-center justify-center mb-4">
            <RiSearchLine className="text-[#888] text-2xl" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">Enter a Token Address</h3>
          <p className="text-[#888] text-sm max-w-md">
            Paste any token contract address above to get an
            AI-generated research report with risk analysis, holder metrics, and alpha insights.
          </p>
        </motion.div>
      )}
    </div>
  );
}
