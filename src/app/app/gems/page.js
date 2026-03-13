"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  RiStarLine, RiArrowRightUpLine, RiArrowRightDownLine,
  RiExternalLinkLine, RiLoader4Line, RiLockLine,
  RiFilterLine, RiRefreshLine,
} from "react-icons/ri";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { useTokens } from "@/context/TokenContext";
import { getTrendingTokens, getTopBoostedTokens, searchTokens, formatPairData, formatCurrency, getChainLabel, timeAgo } from "@/lib/dexscreener";
import InsufficientTokensModal from "@/components/dashboard/InsufficientTokensModal";

const GEM_DETAIL_COST = 100;

export default function GemsPage() {
  const { balance, spendTokens } = useTokens();
  const [gems, setGems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("alphaScore");
  const [showModal, setShowModal] = useState(false);
  const [unlockedGems, setUnlockedGems] = useState(new Set());
  const [expandedGem, setExpandedGem] = useState(null);

  async function fetchGems() {
    setLoading(true);
    try {
      const [trending, top] = await Promise.all([getTrendingTokens(), getTopBoostedTokens()]);
      const allTokens = [...(trending || []), ...(top || [])];
      const unique = [...new Map(allTokens.map(t => [t.tokenAddress, t])).values()];
      const searchPromises = unique.slice(0, 15).map(t => searchTokens(t.tokenAddress).catch(() => []));
      const results = await Promise.all(searchPromises);
      const pairs = results.flatMap(r => r).filter(p => p && p.priceUsd);
      // Deduplicate by base token address
      const seen = new Set();
      const uniquePairs = pairs.filter(p => {
        const key = p.baseToken?.address;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      const formatted = uniquePairs.map(formatPairData).filter(Boolean);
      setGems(formatted);
    } catch (err) {
      console.error("Failed to fetch gems:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchGems(); }, []);

  function unlockGem(addr) {
    if (balance < GEM_DETAIL_COST) { setShowModal(true); return; }
    const success = spendTokens(GEM_DETAIL_COST, `Gem details: ${addr.slice(0, 8)}...`);
    if (!success) { setShowModal(true); return; }
    setUnlockedGems(prev => new Set(prev).add(addr));
    setExpandedGem(addr);
  }

  const sorted = [...gems].sort((a, b) => {
    if (sortBy === "alphaScore") return b.alphaScore - a.alphaScore;
    if (sortBy === "volume") return b.volume24h - a.volume24h;
    if (sortBy === "liquidity") return b.liquidity - a.liquidity;
    if (sortBy === "priceChange") return b.priceChange24h - a.priceChange24h;
    return 0;
  });

  // Generate sparkline data from price changes
  function getSparkline(token) {
    const base = 100;
    return [
      { v: base },
      { v: base * (1 + (token.priceChange6h || 0) / 100 * 0.1) },
      { v: base * (1 + (token.priceChange6h || 0) / 100 * 0.5) },
      { v: base * (1 + (token.priceChange1h || 0) / 100 * 0.3) },
      { v: base * (1 + (token.priceChange1h || 0) / 100) },
      { v: base * (1 + (token.priceChange24h || 0) / 100 * 0.8) },
      { v: base * (1 + (token.priceChange24h || 0) / 100) },
    ];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Hidden Gem Scanner</h1>
          <p className="text-[#888] text-sm mt-1">Live trending tokens · Deep details cost {GEM_DETAIL_COST} ASCP</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 rounded-xl bg-[#151515] border border-[#2A2A2A] text-white text-sm focus:outline-none cursor-pointer">
            <option value="alphaScore">Alpha Score</option>
            <option value="volume">Volume</option>
            <option value="liquidity">Liquidity</option>
            <option value="priceChange">24h Change</option>
          </select>
          <button onClick={fetchGems} disabled={loading} className="p-2 rounded-xl border border-[#2A2A2A] bg-[#151515] text-[#888] hover:text-white transition-colors">
            <RiRefreshLine className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <RiLoader4Line className="text-[#F5D90A] text-3xl animate-spin mx-auto mb-3" />
            <p className="text-[#888] text-sm">Scanning for hidden gems...</p>
          </div>
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-16 text-[#888]">No gems found. Try refreshing.</div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sorted.map((gem, i) => (
            <motion.div key={gem.address + i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }} className="p-4 rounded-2xl border border-[#2A2A2A] bg-[#151515] card-hover">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {gem.imageUrl ? (
                    <img src={gem.imageUrl} alt="" className="w-9 h-9 rounded-full" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F5D90A]/20 to-[#F97316]/20 flex items-center justify-center text-xs font-bold text-[#F5D90A]">{gem.symbol?.slice(0, 2)}</div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-semibold text-sm truncate max-w-[120px]">{gem.name}</h3>
                      <span className="text-[#888] text-xs">{gem.symbol}</span>
                    </div>
                    <span className="text-[#888] text-[10px]">{getChainLabel(gem.chain)} · {gem.dex}</span>
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${gem.alphaScore >= 8 ? "bg-[#22C55E]/10 text-[#22C55E]" : gem.alphaScore >= 6 ? "bg-[#F5D90A]/10 text-[#F5D90A]" : "bg-[#F97316]/10 text-[#F97316]"}`}>
                  <RiStarLine className="text-[10px]" /> {gem.alphaScore}
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-white font-bold text-lg">{gem.price}</span>
                  <span className={`ml-2 text-sm font-medium ${gem.positive ? "text-[#22C55E]" : "text-[#FF4444]"}`}>
                    {gem.positive ? "+" : ""}{gem.priceChange24h?.toFixed(1)}%
                  </span>
                </div>
                <div className="w-20 h-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getSparkline(gem)}>
                      <Line type="monotone" dataKey="v" stroke={gem.positive ? "#22C55E" : "#FF4444"} strokeWidth={1.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center p-2 rounded-lg bg-[#0B0B0B]">
                  <span className="text-[#888] text-[10px] block">Vol 24h</span>
                  <span className="text-white text-xs font-medium">{formatCurrency(gem.volume24h)}</span>
                </div>
                <div className="text-center p-2 rounded-lg bg-[#0B0B0B]">
                  <span className="text-[#888] text-[10px] block">Liq</span>
                  <span className="text-white text-xs font-medium">{formatCurrency(gem.liquidity)}</span>
                </div>
                <div className="text-center p-2 rounded-lg bg-[#0B0B0B]">
                  <span className="text-[#888] text-[10px] block">FDV</span>
                  <span className="text-white text-xs font-medium">{formatCurrency(gem.fdv)}</span>
                </div>
              </div>

              {/* Locked details */}
              {!unlockedGems.has(gem.address) ? (
                <button onClick={() => unlockGem(gem.address)} className="w-full py-2.5 rounded-xl border border-[#2A2A2A] text-[#888] hover:text-[#F5D90A] hover:border-[#F5D90A]/30 transition-colors text-sm flex items-center justify-center gap-2">
                  <RiLockLine /> Unlock Details · {GEM_DETAIL_COST} ASCP
                </button>
              ) : (
                <div className="space-y-2 pt-1 border-t border-[#2A2A2A]">
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="p-2 rounded-lg bg-[#0B0B0B]">
                      <span className="text-[#888] text-[10px] block">Buys 24h</span>
                      <span className="text-[#22C55E] text-xs font-medium">{gem.buys24h}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0B0B0B]">
                      <span className="text-[#888] text-[10px] block">Sells 24h</span>
                      <span className="text-[#FF4444] text-xs font-medium">{gem.sells24h}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0B0B0B]">
                      <span className="text-[#888] text-[10px] block">1h Change</span>
                      <span className={`text-xs font-medium ${gem.priceChange1h >= 0 ? "text-[#22C55E]" : "text-[#FF4444]"}`}>
                        {gem.priceChange1h >= 0 ? "+" : ""}{gem.priceChange1h?.toFixed(1)}%
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0B0B0B]">
                      <span className="text-[#888] text-[10px] block">Age</span>
                      <span className="text-white text-xs font-medium">{timeAgo(gem.pairCreatedAt)}</span>
                    </div>
                  </div>
                  <a href={gem.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-[#F5D90A] text-[#0B0B0B] font-semibold text-sm hover:bg-[#F5D90A]/90 transition-colors">
                    <RiExternalLinkLine /> View on DexScreener
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <InsufficientTokensModal isOpen={showModal} onClose={() => setShowModal(false)} required={GEM_DETAIL_COST} balance={balance} />
    </div>
  );
}
