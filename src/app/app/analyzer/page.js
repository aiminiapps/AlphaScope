"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  RiSearchLine, RiShieldCheckLine, RiAlertLine,
  RiLockLine, RiSparklingLine, RiArrowRightUpLine,
  RiArrowRightDownLine, RiExternalLinkLine, RiCoinLine,
  RiLoader4Line, RiStarLine,
} from "react-icons/ri";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useTokens } from "@/context/TokenContext";
import { searchTokens, formatPairData, formatCurrency, formatNumber, getChainLabel, timeAgo } from "@/lib/dexscreener";
import InsufficientTokensModal from "@/components/dashboard/InsufficientTokensModal";

const AI_REPORT_COST = 200;

const RISK_COLORS = {
  LOW: "#22C55E",
  MEDIUM: "#F5D90A",
  HIGH: "#F97316",
  CRITICAL: "#FF4444",
};

const REC_COLORS = {
  STRONG_BUY: "#22C55E",
  BUY: "#22C55E",
  HOLD: "#F5D90A",
  CAUTION: "#F97316",
  AVOID: "#FF4444",
};

export default function AnalyzerPage() {
  const { balance, spendTokens, cacheAnalysis, getCachedAnalysis } = useTokens();
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [aiReport, setAiReport] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reportUnlocked, setReportUnlocked] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    setSelectedToken(null);
    setAiReport(null);
    setReportUnlocked(false);
    try {
      const pairs = await searchTokens(query.trim());
      const formatted = pairs.slice(0, 10).map(formatPairData).filter(Boolean);
      setSearchResults(formatted);
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }

  function selectToken(token) {
    setSelectedToken(token);
    setAiReport(null);
    setReportUnlocked(false);
    setSearchResults([]);
    // Check cache
    const cached = getCachedAnalysis(token.address);
    if (cached?.report) {
      setAiReport(cached.report);
      setReportUnlocked(true);
    }
  }

  async function unlockReport() {
    if (balance < AI_REPORT_COST) {
      setShowModal(true);
      return;
    }
    const success = spendTokens(AI_REPORT_COST, `AI Report: ${selectedToken.symbol}`);
    if (!success) {
      setShowModal(true);
      return;
    }
    setReportLoading(true);
    setReportUnlocked(true);
    try {
      const res = await fetch("/api/ai/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenData: selectedToken }),
      });
      const data = await res.json();
      setAiReport(data.report);
      cacheAnalysis(selectedToken.address, { ...selectedToken, report: data.report });
    } catch (err) {
      console.error("AI report failed:", err);
    } finally {
      setReportLoading(false);
    }
  }

  const radarData = selectedToken ? [
    { metric: "Liquidity", value: Math.min(10, (selectedToken.liquidity / 500000) * 10) },
    { metric: "Volume", value: Math.min(10, (selectedToken.volume24h / 1000000) * 10) },
    { metric: "Txns", value: Math.min(10, ((selectedToken.buys24h + selectedToken.sells24h) / 500) * 10) },
    { metric: "Momentum", value: Math.min(10, Math.max(0, (selectedToken.priceChange24h + 50) / 10)) },
    { metric: "Buy Power", value: selectedToken.buys24h + selectedToken.sells24h > 0 ? (selectedToken.buys24h / (selectedToken.buys24h + selectedToken.sells24h)) * 10 : 5 },
    { metric: "Alpha", value: selectedToken.alphaScore },
  ] : [];

  const pieData = selectedToken ? [
    { name: "Buys", value: selectedToken.buys24h || 1 },
    { name: "Sells", value: selectedToken.sells24h || 1 },
  ] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Token Analyzer</h1>
        <p className="text-[#888] text-sm mt-1">Search any token for deep-dive analytics · AI report costs {AI_REPORT_COST} ASCP</p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by token name, symbol, or contract address..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#151515] border border-[#2A2A2A] text-white placeholder:text-[#666] focus:border-[#F5D90A]/50 focus:outline-none transition-colors"
          />
        </div>
        <button type="submit" disabled={searching} className="px-6 py-3 rounded-xl bg-[#F5D90A] text-[#0B0B0B] font-semibold hover:bg-[#F5D90A]/90 transition-colors disabled:opacity-50 flex items-center gap-2">
          {searching && <RiLoader4Line className="animate-spin" />}
          Analyze
        </button>
      </form>

      {/* Search results dropdown */}
      <AnimatePresence>
        {searchResults.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-2xl border border-[#2A2A2A] bg-[#151515] overflow-hidden">
            <p className="text-[#888] text-xs px-4 pt-3 pb-1">Found {searchResults.length} results — select one to analyze</p>
            {searchResults.map((token, i) => (
              <button key={i} onClick={() => selectToken(token)} className="w-full flex items-center gap-4 px-4 py-3 hover:bg-[#1E1E1E] transition-colors text-left border-b border-[#2A2A2A]/50 last:border-b-0">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {token.imageUrl ? (
                    <img src={token.imageUrl} alt="" className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5D90A]/20 to-[#F97316]/20 flex items-center justify-center text-xs font-bold text-[#F5D90A]">{token.symbol?.slice(0, 2)}</div>
                  )}
                  <div className="min-w-0">
                    <span className="text-white font-medium text-sm block truncate">{token.name}</span>
                    <span className="text-[#888] text-xs">{token.symbol} · {getChainLabel(token.chain)} · {token.dex}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-white text-sm font-medium block">{token.price}</span>
                  <span className={`text-xs ${token.positive ? "text-[#22C55E]" : "text-[#FF4444]"}`}>
                    {token.positive ? "+" : ""}{token.priceChange24h?.toFixed(1)}%
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Token Analysis */}
      {selectedToken && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Header */}
          <div className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
            <div className="flex flex-wrap items-center gap-4">
              {selectedToken.imageUrl ? (
                <img src={selectedToken.imageUrl} alt="" className="w-14 h-14 rounded-2xl" />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F5D90A]/20 to-[#F97316]/20 flex items-center justify-center font-bold text-[#F5D90A] text-lg">{selectedToken.symbol?.slice(0, 2)}</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-white font-bold text-xl">{selectedToken.name}</h2>
                  <span className="text-[#888] text-sm">{selectedToken.symbol}</span>
                  <span className="px-2 py-0.5 rounded-lg bg-[#1E1E1E] text-[#888] text-[10px] font-medium">{getChainLabel(selectedToken.chain)}</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-white text-2xl font-bold">{selectedToken.price}</span>
                  <span className={`flex items-center gap-1 text-sm font-medium ${selectedToken.positive ? "text-[#22C55E]" : "text-[#FF4444]"}`}>
                    {selectedToken.positive ? <RiArrowRightUpLine /> : <RiArrowRightDownLine />}
                    {selectedToken.positive ? "+" : ""}{selectedToken.priceChange24h?.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-bold ${selectedToken.alphaScore >= 8 ? "bg-[#22C55E]/10 text-[#22C55E]" : selectedToken.alphaScore >= 6 ? "bg-[#F5D90A]/10 text-[#F5D90A]" : "bg-[#F97316]/10 text-[#F97316]"}`}>
                  <RiStarLine /> {selectedToken.alphaScore}/10
                </div>
                {selectedToken.url && (
                  <a href={selectedToken.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl border border-[#2A2A2A] text-[#888] hover:text-white transition-colors">
                    <RiExternalLinkLine />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Free Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Volume 24h", value: formatCurrency(selectedToken.volume24h) },
              { label: "Liquidity", value: formatCurrency(selectedToken.liquidity) },
              { label: "FDV", value: formatCurrency(selectedToken.fdv) },
              { label: "Market Cap", value: formatCurrency(selectedToken.marketCap) },
              { label: "24h Buys", value: formatNumber(selectedToken.buys24h) },
              { label: "24h Sells", value: formatNumber(selectedToken.sells24h) },
              { label: "1h Change", value: `${selectedToken.priceChange1h >= 0 ? "+" : ""}${selectedToken.priceChange1h?.toFixed(1)}%` },
              { label: "Pair Age", value: timeAgo(selectedToken.pairCreatedAt) },
            ].map((m) => (
              <div key={m.label} className="p-4 rounded-xl bg-[#151515] border border-[#2A2A2A]">
                <span className="text-[#888] text-xs block mb-1">{m.label}</span>
                <span className="text-white font-semibold text-sm">{m.value}</span>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Radar chart */}
            <div className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
              <h3 className="text-white font-semibold mb-3">Risk / Strength Radar</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#2A2A2A" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "#888", fontSize: 11 }} />
                  <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
                  <Radar name="Token" dataKey="value" stroke="#F5D90A" fill="#F5D90A" fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Buy/Sell Pie */}
            <div className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
              <h3 className="text-white font-semibold mb-3">Buy / Sell Pressure (24h)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} strokeWidth={0}>
                    <Cell fill="#22C55E" />
                    <Cell fill="#FF4444" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 -mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                  <span className="text-[#888] text-xs">Buys ({formatNumber(selectedToken.buys24h)})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF4444]" />
                  <span className="text-[#888] text-xs">Sells ({formatNumber(selectedToken.sells24h)})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Premium AI Report */}
          <div className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515] relative overflow-hidden">
            {!reportUnlocked ? (
              <div className="text-center py-10 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#F5D90A]/10 flex items-center justify-center mx-auto mb-4">
                  <RiLockLine className="text-[#F5D90A] text-2xl" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Unlock AI Research Report</h3>
                <p className="text-[#888] text-sm mb-1 max-w-md mx-auto">
                  Get an AI-generated deep analysis including risk assessment, narrative analysis, buy/sell signals, and actionable recommendations.
                </p>
                <p className="text-[#F5D90A] text-sm font-semibold mb-6">Cost: {AI_REPORT_COST} ASCP (Balance: {balance})</p>
                <button onClick={unlockReport} className="px-8 py-3 rounded-xl bg-[#F5D90A] text-[#0B0B0B] font-bold hover:bg-[#F5D90A]/90 transition-colors inline-flex items-center gap-2">
                  <RiSparklingLine /> Unlock Report
                </button>
              </div>
            ) : reportLoading ? (
              <div className="text-center py-16">
                <RiLoader4Line className="text-[#F5D90A] text-3xl animate-spin mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Analyzing {selectedToken.symbol}...</h3>
                <p className="text-[#888] text-sm">AI is processing on-chain data and generating insights</p>
              </div>
            ) : aiReport ? (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <RiSparklingLine className="text-[#F5D90A]" />
                  <h3 className="text-white font-bold text-lg">AI Research Report</h3>
                </div>

                {/* Summary */}
                <div className="p-4 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
                  <h4 className="text-white text-sm font-semibold mb-2">Executive Summary</h4>
                  <p className="text-[#CCC] text-sm leading-relaxed">{aiReport.summary}</p>
                </div>

                {/* Risk + Recommendation */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
                    <span className="text-[#888] text-xs block mb-2">Risk Level</span>
                    <div className="flex items-center gap-2">
                      <RiShieldCheckLine style={{ color: RISK_COLORS[aiReport.riskLevel] || "#888" }} />
                      <span className="text-white font-bold" style={{ color: RISK_COLORS[aiReport.riskLevel] }}>{aiReport.riskLevel}</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
                    <span className="text-[#888] text-xs block mb-2">Recommendation</span>
                    <span className="text-white font-bold text-sm" style={{ color: REC_COLORS[aiReport.recommendation?.split(" ")[0]] || "#888" }}>
                      {aiReport.recommendation}
                    </span>
                  </div>
                </div>

                {/* Narrative */}
                {aiReport.narrative && (
                  <div className="p-4 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
                    <h4 className="text-white text-sm font-semibold mb-2">Narrative Analysis</h4>
                    <p className="text-[#CCC] text-sm leading-relaxed">{aiReport.narrative}</p>
                  </div>
                )}

                {/* Strengths & Risks */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
                    <h4 className="text-[#22C55E] text-sm font-semibold mb-3">Strengths</h4>
                    <ul className="space-y-2">
                      {aiReport.strengths?.map((s, i) => (
                        <li key={i} className="text-[#CCC] text-sm flex items-start gap-2">
                          <span className="text-[#22C55E] mt-1 text-xs">●</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
                    <h4 className="text-[#FF4444] text-sm font-semibold mb-3">Risks</h4>
                    <ul className="space-y-2">
                      {aiReport.risks?.map((r, i) => (
                        <li key={i} className="text-[#CCC] text-sm flex items-start gap-2">
                          <span className="text-[#FF4444] mt-1 text-xs">●</span> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Deep Analysis Sections */}
                {[
                  { title: "Liquidity Analysis", content: aiReport.liquidityAnalysis },
                  { title: "Volume Analysis", content: aiReport.volumeAnalysis },
                  { title: "Buy Pressure Analysis", content: aiReport.buyPressureAnalysis },
                  { title: "Price Action", content: aiReport.priceAction },
                ].filter(s => s.content).map((section) => (
                  <div key={section.title} className="p-4 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
                    <h4 className="text-white text-sm font-semibold mb-2">{section.title}</h4>
                    <p className="text-[#CCC] text-sm leading-relaxed">{section.content}</p>
                  </div>
                ))}

                {/* Key Insights */}
                {aiReport.keyInsights && (
                  <div className="p-4 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
                    <h4 className="text-[#F5D90A] text-sm font-semibold mb-3">Key Insights</h4>
                    <ul className="space-y-2">
                      {aiReport.keyInsights.map((insight, i) => (
                        <li key={i} className="text-[#CCC] text-sm flex items-start gap-2">
                          <span className="text-[#F5D90A] mt-1 text-xs">★</span> {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </motion.div>
      )}

      <InsufficientTokensModal isOpen={showModal} onClose={() => setShowModal(false)} required={AI_REPORT_COST} balance={balance} />
    </div>
  );
}
