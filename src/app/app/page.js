"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  RiCoinLine, RiSearchEyeLine, RiAlertLine, RiStarLine,
  RiArrowRightUpLine, RiArrowRightDownLine, RiFlashlightLine,
  RiVipDiamondLine, RiTaskLine,
} from "react-icons/ri";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useTokens } from "@/context/TokenContext";
import { getTrendingTokens, searchTokens, formatPairData, formatCurrency, getChainLabel } from "@/lib/dexscreener";

function StatCard({ stat, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[#888] text-sm">{stat.label}</span>
        {stat.change && (
          <div className={`flex items-center gap-1 text-xs font-medium ${stat.positive ? "text-[#22C55E]" : "text-[#F97316]"}`}>
            {stat.positive ? <RiArrowRightUpLine /> : <RiArrowRightDownLine />}
            {stat.change}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white">{stat.value}</div>
    </motion.div>
  );
}

function ActivityIcon({ type }) {
  const icons = {
    earn: <RiCoinLine className="text-[#22C55E]" />,
    spend: <RiCoinLine className="text-[#F97316]" />,
    analysis: <RiSearchEyeLine className="text-[#3B82F6]" />,
    alert: <RiAlertLine className="text-[#F97316]" />,
    quest: <RiTaskLine className="text-[#22C55E]" />,
    gem: <RiVipDiamondLine className="text-[#A855F7]" />,
  };
  return icons[type] || <RiFlashlightLine className="text-[#F5D90A]" />;
}

export default function DashboardPage() {
  const { balance, history, completedQuests, loaded } = useTokens();
  const [trending, setTrending] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const boosts = await getTrendingTokens();
        // Get token details for boosted tokens
        const uniqueTokens = [...new Set(boosts.slice(0, 12).map(b => b.tokenAddress))];
        const searchPromises = uniqueTokens.slice(0, 6).map(addr => searchTokens(addr).catch(() => []));
        const results = await Promise.all(searchPromises);
        const pairs = results.flatMap(r => r).filter(p => p && p.priceUsd);
        const formatted = pairs.slice(0, 8).map(formatPairData).filter(Boolean);
        setTrending(formatted);
      } catch (err) {
        console.error("Failed to fetch trending:", err);
      } finally {
        setTrendingLoading(false);
      }
    }
    fetchTrending();
  }, []);

  const stats = [
    { label: "ASCP Balance", value: loaded ? balance.toLocaleString() : "...", change: null, positive: true },
    { label: "Quests Done", value: loaded ? completedQuests.length.toString() : "...", change: null, positive: true },
    { label: "Actions Logged", value: loaded ? history.length.toString() : "...", change: null, positive: true },
    { label: "Trending Live", value: trendingLoading ? "..." : trending.length.toString(), change: "Real-time", positive: true },
  ];

  const recentHistory = loaded ? history.slice(0, 6) : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Trending Tokens */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="lg:col-span-2 p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-lg">Trending Tokens</h3>
              <p className="text-[#888] text-sm">Live from DexScreener boosted tokens</p>
            </div>
            <Link href="/app/gems" className="text-[#F5D90A] text-sm font-medium hover:underline">View All →</Link>
          </div>
          {trendingLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-[#F5D90A] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : trending.length === 0 ? (
            <p className="text-[#888] text-sm text-center py-8">No trending data available</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2A2A2A]">
                    <th className="text-left text-[#888] text-xs font-medium py-3 px-2">Token</th>
                    <th className="text-right text-[#888] text-xs font-medium py-3 px-2">Price</th>
                    <th className="text-right text-[#888] text-xs font-medium py-3 px-2">24h</th>
                    <th className="text-right text-[#888] text-xs font-medium py-3 px-2 hidden sm:table-cell">Volume</th>
                    <th className="text-right text-[#888] text-xs font-medium py-3 px-2 hidden md:table-cell">Liquidity</th>
                    <th className="text-right text-[#888] text-xs font-medium py-3 px-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {trending.map((token, i) => (
                    <tr key={i} className="border-b border-[#2A2A2A]/50 hover:bg-[#1E1E1E] transition-colors cursor-pointer">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          {token.imageUrl ? (
                            <img src={token.imageUrl} alt="" className="w-7 h-7 rounded-full" />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F5D90A]/20 to-[#F97316]/20 flex items-center justify-center text-[10px] font-bold text-[#F5D90A]">{token.symbol?.slice(0, 2)}</div>
                          )}
                          <div>
                            <span className="text-white text-sm font-medium block truncate max-w-[100px]">{token.name}</span>
                            <span className="text-[#888] text-[10px]">{token.symbol} · {getChainLabel(token.chain)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-right text-white text-sm">{token.price}</td>
                      <td className={`py-3 px-2 text-right text-sm font-medium ${token.positive ? "text-[#22C55E]" : "text-[#FF4444]"}`}>
                        {token.positive ? "+" : ""}{token.priceChange24h?.toFixed(1)}%
                      </td>
                      <td className="py-3 px-2 text-right text-[#888] text-sm hidden sm:table-cell">{formatCurrency(token.volume24h)}</td>
                      <td className="py-3 px-2 text-right text-[#888] text-sm hidden md:table-cell">{formatCurrency(token.liquidity)}</td>
                      <td className="py-3 px-2 text-right">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${token.alphaScore >= 8 ? "bg-[#22C55E]/10 text-[#22C55E]" : token.alphaScore >= 7 ? "bg-[#F5D90A]/10 text-[#F5D90A]" : "bg-[#F97316]/10 text-[#F97316]"}`}>
                          <RiStarLine className="text-[10px]" />{token.alphaScore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Activity Log */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
          <h3 className="text-white font-semibold text-lg mb-4">Recent Activity</h3>
          {recentHistory.length === 0 ? (
            <p className="text-[#888] text-sm text-center py-8">No activity yet. Complete quests to get started!</p>
          ) : (
            <div className="space-y-3">
              {recentHistory.map((entry, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
                  <div className="w-8 h-8 rounded-lg bg-[#0B0B0B] flex items-center justify-center shrink-0 mt-0.5">
                    <ActivityIcon type={entry.type} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{entry.reason}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-semibold ${entry.type === "earn" ? "text-[#22C55E]" : "text-[#F97316]"}`}>
                        {entry.type === "earn" ? "+" : "-"}{entry.amount} ASCP
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: "Analyze Token", desc: "AI-powered research report", href: "/app/analyzer", icon: RiSearchEyeLine, color: "#3B82F6" },
          { title: "Scan Gems", desc: "Find hidden opportunities", href: "/app/gems", icon: RiVipDiamondLine, color: "#A855F7" },
          { title: "Earn $ASCP", desc: "Complete quests for rewards", href: "/app/quests", icon: RiCoinLine, color: "#F5D90A" },
        ].map((action, i) => (
          <motion.div key={action.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}>
            <Link href={action.href} className="flex items-center gap-4 p-4 rounded-2xl border border-[#2A2A2A] bg-[#151515] card-hover group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${action.color}15` }}>
                <action.icon className="text-lg" style={{ color: action.color }} />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm group-hover:text-[#F5D90A] transition-colors">{action.title}</h4>
                <p className="text-[#888] text-xs">{action.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
