"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  RiStarLine,
  RiFilter2Line,
  RiArrowUpLine,
  RiArrowDownLine,
  RiTimeLine,
  RiGroupLine,
  RiWaterFlashLine,
  RiBarChartLine,
} from "react-icons/ri";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { gemTokens } from "@/lib/mockData";
import { CHAIN_BADGES } from "@/lib/constants";

export default function GemsPage() {
  const [sortBy, setSortBy] = useState("alphaScore");
  const [filterChain, setFilterChain] = useState("All");

  const chains = ["All", ...Object.keys(CHAIN_BADGES)];

  const filtered = gemTokens
    .filter((t) => filterChain === "All" || t.chain === filterChain)
    .sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Hidden Gem Scanner</h1>
        <p className="text-[#888] text-sm mt-1">
          Discover newly launched tokens with unusual activity and strong early traction
        </p>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-[#2A2A2A] bg-[#151515]"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <RiFilter2Line className="text-[#888]" />
          {chains.map((chain) => (
            <button
              key={chain}
              onClick={() => setFilterChain(chain)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterChain === chain
                  ? "bg-[#F5D90A]/10 text-[#F5D90A] border border-[#F5D90A]/30"
                  : "text-[#888] border border-[#2A2A2A] hover:text-white hover:bg-[#1E1E1E]"
              }`}
            >
              {chain === "All" ? "All Chains" : CHAIN_BADGES[chain]?.label || chain}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#888] text-xs">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#1E1E1E] border border-[#2A2A2A] text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#F5D90A]/50"
          >
            <option value="alphaScore">Alpha Score</option>
            <option value="holders">Holders</option>
          </select>
        </div>
      </motion.div>

      {/* Token Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((token, i) => (
          <motion.div
            key={token.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515] card-hover cursor-pointer"
          >
            {/* Token header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5D90A]/20 to-[#F97316]/20 flex items-center justify-center text-sm font-bold text-[#F5D90A]">
                  {token.symbol.slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{token.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[#888] text-xs">${token.symbol}</span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                      style={{
                        backgroundColor: `${CHAIN_BADGES[token.chain]?.color || "#888"}20`,
                        color: CHAIN_BADGES[token.chain]?.color || "#888",
                      }}
                    >
                      {token.chain}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-sm font-bold ${
                  token.alphaScore >= 8.5
                    ? "bg-[#22C55E]/10 text-[#22C55E]"
                    : token.alphaScore >= 7
                    ? "bg-[#F5D90A]/10 text-[#F5D90A]"
                    : "bg-[#F97316]/10 text-[#F97316]"
                }`}
              >
                <RiStarLine className="text-xs" />
                {token.alphaScore}
              </div>
            </div>

            {/* Mini chart */}
            <div className="h-[60px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={token.miniChart.map((v, idx) => ({ v, i: idx }))}>
                  <defs>
                    <linearGradient id={`gem-${token.symbol}`} x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={token.positive ? "#22C55E" : "#FF4444"}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={token.positive ? "#22C55E" : "#FF4444"}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={token.positive ? "#22C55E" : "#FF4444"}
                    strokeWidth={1.5}
                    fill={`url(#gem-${token.symbol})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Metrics */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-semibold">{token.price}</span>
              <span
                className={`text-sm font-medium flex items-center gap-0.5 ${
                  token.positive ? "text-[#22C55E]" : "text-[#FF4444]"
                }`}
              >
                {token.positive ? <RiArrowUpLine /> : <RiArrowDownLine />}
                {token.change}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: RiWaterFlashLine, label: "Liq", value: token.liquidity },
                { icon: RiBarChartLine, label: "Vol", value: token.volume },
                { icon: RiGroupLine, label: "Holders", value: token.holders.toLocaleString() },
              ].map((metric) => (
                <div key={metric.label} className="text-center p-2 rounded-lg bg-[#1E1E1E]">
                  <metric.icon className="text-[#888] text-xs mx-auto mb-1" />
                  <div className="text-white text-xs font-semibold">{metric.value}</div>
                  <div className="text-[#666] text-[10px]">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Age badge */}
            <div className="mt-3 flex items-center gap-1 text-[#888] text-xs">
              <RiTimeLine />
              <span>Launched {token.age} ago</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
