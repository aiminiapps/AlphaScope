"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  RiAddLine, RiDeleteBinLine, RiSearchLine, RiExternalLinkLine,
  RiLoader4Line, RiWallet3Line, RiStarLine,
} from "react-icons/ri";
import { useTokens } from "@/context/TokenContext";
import { searchTokens, formatPairData, formatCurrency, getChainLabel } from "@/lib/dexscreener";

export default function WalletsPage() {
  const { trackedWallets, trackWallet, removeTrackedWallet, earnTokens, completedQuests } = useTokens();
  const [newAddress, setNewAddress] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [lookupQuery, setLookupQuery] = useState("");
  const [lookupResults, setLookupResults] = useState([]);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);

  function handleAddWallet(e) {
    e.preventDefault();
    if (!newAddress.trim()) return;
    const added = trackWallet(newAddress.trim(), newLabel.trim());
    if (added) {
      setNewAddress("");
      setNewLabel("");
    }
  }

  async function handleTokenLookup(e) {
    e.preventDefault();
    if (!lookupQuery.trim()) return;
    setLookupLoading(true);
    try {
      const pairs = await searchTokens(lookupQuery.trim());
      const formatted = pairs.slice(0, 8).map(formatPairData).filter(Boolean);
      setLookupResults(formatted);
    } catch (err) {
      console.error("Lookup failed:", err);
    } finally {
      setLookupLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Wallet Intelligence</h1>
        <p className="text-[#888] text-sm mt-1">Track wallets and lookup token holdings</p>
      </div>

      {/* Add wallet form */}
      <div className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
        <h3 className="text-white font-semibold mb-3">Track a Wallet</h3>
        <form onSubmit={handleAddWallet} className="flex flex-col sm:flex-row gap-3">
          <input type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} placeholder="Wallet address (0x... or SOL...)" className="flex-1 px-4 py-2.5 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm placeholder:text-[#666] focus:border-[#F5D90A]/50 focus:outline-none" />
          <input type="text" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Label (optional)" className="sm:w-40 px-4 py-2.5 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm placeholder:text-[#666] focus:border-[#F5D90A]/50 focus:outline-none" />
          <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#F5D90A] text-[#0B0B0B] font-semibold text-sm hover:bg-[#F5D90A]/90 transition-colors flex items-center gap-2 justify-center">
            <RiAddLine /> Track
          </button>
        </form>
      </div>

      {/* Tracked wallets */}
      {trackedWallets.length > 0 && (
        <div className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
          <h3 className="text-white font-semibold mb-4">Tracked Wallets ({trackedWallets.length})</h3>
          <div className="space-y-3">
            {trackedWallets.map((wallet) => (
              <div key={wallet.address} className="flex items-center justify-between p-3 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#F5D90A]/10 flex items-center justify-center shrink-0">
                    <RiWallet3Line className="text-[#F5D90A]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-white text-sm font-medium block">{wallet.label}</span>
                    <span className="text-[#888] text-xs truncate block font-mono">{wallet.address}</span>
                  </div>
                </div>
                <button onClick={() => removeTrackedWallet(wallet.address)} className="p-2 rounded-lg text-[#888] hover:text-[#FF4444] hover:bg-[#FF4444]/10 transition-colors shrink-0">
                  <RiDeleteBinLine />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Token Lookup */}
      <div className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
        <h3 className="text-white font-semibold mb-3">Token Lookup</h3>
        <p className="text-[#888] text-sm mb-4">Search for any token to see live market data</p>
        <form onSubmit={handleTokenLookup} className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888] text-sm" />
            <input type="text" value={lookupQuery} onChange={(e) => setLookupQuery(e.target.value)} placeholder="Search token name or address..." className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-white text-sm placeholder:text-[#666] focus:border-[#F5D90A]/50 focus:outline-none" />
          </div>
          <button type="submit" disabled={lookupLoading} className="px-5 py-2.5 rounded-xl bg-[#F5D90A] text-[#0B0B0B] font-semibold text-sm hover:bg-[#F5D90A]/90 transition-colors disabled:opacity-50 flex items-center gap-2">
            {lookupLoading ? <RiLoader4Line className="animate-spin" /> : <RiSearchLine />} Lookup
          </button>
        </form>

        {lookupResults.length > 0 && (
          <div className="space-y-3">
            {lookupResults.map((token, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center justify-between p-3 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
                <div className="flex items-center gap-3 min-w-0">
                  {token.imageUrl ? (
                    <img src={token.imageUrl} alt="" className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5D90A]/20 to-[#F97316]/20 flex items-center justify-center text-xs font-bold text-[#F5D90A]">{token.symbol?.slice(0, 2)}</div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium truncate max-w-[120px]">{token.name}</span>
                      <span className="text-[#888] text-xs">{token.symbol}</span>
                      <span className="text-[#888] text-[10px] px-1.5 py-0.5 rounded bg-[#0B0B0B]">{getChainLabel(token.chain)}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[#888] text-xs">Vol: {formatCurrency(token.volume24h)}</span>
                      <span className="text-[#888] text-xs">Liq: {formatCurrency(token.liquidity)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0 flex items-center gap-3">
                  <div>
                    <span className="text-white text-sm font-medium block">{token.price}</span>
                    <span className={`text-xs ${token.positive ? "text-[#22C55E]" : "text-[#FF4444]"}`}>
                      {token.positive ? "+" : ""}{token.priceChange24h?.toFixed(1)}%
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${token.alphaScore >= 8 ? "bg-[#22C55E]/10 text-[#22C55E]" : token.alphaScore >= 6 ? "bg-[#F5D90A]/10 text-[#F5D90A]" : "bg-[#F97316]/10 text-[#F97316]"}`}>
                    <RiStarLine className="text-[10px]" /> {token.alphaScore}
                  </div>
                  <a href={token.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-[#888] hover:text-white transition-colors">
                    <RiExternalLinkLine />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
