"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { RiAddLine, RiSearchLine, RiArrowRightUpLine, RiTimeLine, RiPercentLine, RiExchangeLine, RiArrowUpLine, RiArrowDownLine } from "react-icons/ri";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { smartWallets, walletActivity } from "@/lib/mockData";

export default function WalletsPage() {
  const [trackInput, setTrackInput] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Wallet Intelligence</h1>
        <p className="text-[#888] text-sm mt-1">Track smart wallets and see what experienced investors are buying</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
        <div className="relative flex-1">
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
          <input type="text" value={trackInput} onChange={(e) => setTrackInput(e.target.value)} placeholder="Enter wallet address to track..." className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#151515] border border-[#2A2A2A] text-white text-sm placeholder:text-[#666] focus:outline-none focus:border-[#F5D90A]/50 transition-colors" />
        </div>
        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#F5D90A] text-[#0B0B0B] font-semibold text-sm hover:bg-[#F5D90A]/90 transition-all shrink-0">
          <RiAddLine /> Track
        </button>
      </motion.div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {smartWallets.map((wallet, i) => (
          <motion.div key={wallet.address} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515] card-hover cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F5D90A]/20 to-[#A855F7]/20 flex items-center justify-center text-sm font-bold text-[#F5D90A]">{wallet.label.charAt(0)}</div>
              <div>
                <h3 className="text-white font-semibold text-sm">{wallet.label}</h3>
                <span className="text-[#888] text-xs font-mono">{wallet.address}</span>
              </div>
            </div>
            <div className="h-[50px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={wallet.trend.map((v, idx) => ({ v, i: idx }))}>
                  <defs>
                    <linearGradient id={`w-${wallet.address}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#22C55E" strokeWidth={1.5} fill={`url(#w-${wallet.address})`} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 rounded-lg bg-[#1E1E1E]">
                <div className="text-[#22C55E] text-xs font-bold">{wallet.pnl}</div>
                <div className="text-[#666] text-[10px]">PnL</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-[#1E1E1E]">
                <div className="text-white text-xs font-bold">{wallet.winRate}</div>
                <div className="text-[#666] text-[10px]">Win Rate</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-[#1E1E1E]">
                <div className="text-white text-xs font-bold">{wallet.trades}</div>
                <div className="text-[#666] text-[10px]">Trades</div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#888] text-[10px]">Top:</span>
              {wallet.topTokens.map((t) => (
                <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-[#1E1E1E] text-[#F5D90A] font-medium">${t}</span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-[#888] text-xs">
              <RiTimeLine /><span>Active {wallet.lastActive}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
        <h3 className="text-white font-semibold text-lg mb-4">Recent Wallet Activity</h3>
        <div className="space-y-2">
          {walletActivity.map((a, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.type === "buy" ? "bg-[#22C55E]/10" : "bg-[#FF4444]/10"}`}>
                  {a.type === "buy" ? <RiArrowUpLine className="text-[#22C55E] text-sm" /> : <RiArrowDownLine className="text-[#FF4444] text-sm" />}
                </div>
                <div>
                  <div className="text-white text-sm"><span className="font-medium">{a.wallet}</span> <span className="text-[#888]">{a.action.toLowerCase()}</span> <span className="text-[#F5D90A] font-medium">${a.token}</span></div>
                  <span className="text-[#888] text-xs">{a.time}</span>
                </div>
              </div>
              <span className={`font-semibold text-sm ${a.type === "buy" ? "text-[#22C55E]" : "text-[#FF4444]"}`}>{a.amount}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
