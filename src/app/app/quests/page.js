"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  RiTwitterXLine, RiHeart3Line, RiChat3Line, RiTelegramLine,
  RiGroupLine, RiSearchLine, RiVipDiamondLine, RiNotification3Line,
  RiWallet3Line, RiCalendarLine, RiDiscordLine, RiShareLine,
  RiCheckLine, RiCoinLine, RiArrowRightLine, RiStarLine,
} from "react-icons/ri";
import { useTokens } from "@/context/TokenContext";

const QUEST_ICONS = {
  twitter: RiTwitterXLine, like: RiHeart3Line, chat: RiChat3Line,
  telegram: RiTelegramLine, users: RiGroupLine, search: RiSearchLine,
  gem: RiVipDiamondLine, bell: RiNotification3Line, wallet: RiWallet3Line,
  calendar: RiCalendarLine, discord: RiDiscordLine, share: RiShareLine,
  coin: RiCoinLine, star: RiStarLine,
};

const CATEGORIES = [
  { id: "all", label: "All Quests" },
  { id: "social", label: "Social" },
  { id: "platform", label: "Platform" },
  { id: "community", label: "Community" },
];

const ALL_QUESTS = [
  { id: "q1", title: "Follow AlphaScope on X", desc: "Follow our official account and stay updated", category: "social", icon: "twitter", reward: 100 },
  { id: "q2", title: "Like & Repost Launch Tweet", desc: "Engage with our launch announcement", category: "social", icon: "like", reward: 50 },
  { id: "q3", title: "Join Telegram Community", desc: "Join our Telegram group for alpha leaks", category: "social", icon: "telegram", reward: 100 },
  { id: "q4", title: "Join Discord Server", desc: "Be part of the community on Discord", category: "social", icon: "discord", reward: 100 },
  { id: "q5", title: "Share AlphaScope with Friends", desc: "Share a referral link on any platform", category: "social", icon: "share", reward: 75 },
  { id: "q6", title: "Analyze Your First Token", desc: "Run the AI Analyzer on any token", category: "platform", icon: "search", reward: 150 },
  { id: "q7", title: "Explore the Gem Scanner", desc: "Open the Hidden Gem Scanner page", category: "platform", icon: "gem", reward: 50 },
  { id: "q8", title: "Connect Your Wallet", desc: "Link a wallet to your AlphaScope account", category: "platform", icon: "wallet", reward: 200 },
  { id: "q9", title: "Set Up Alert Preferences", desc: "Customize your Alpha Alert settings", category: "platform", icon: "bell", reward: 50 },
  { id: "q10", title: "Daily Login Streak (3 Days)", desc: "Open AlphaScope for 3 consecutive days", category: "community", icon: "calendar", reward: 150 },
  { id: "q11", title: "Invite 3 Friends", desc: "Get 3 friends to sign up via referral", category: "community", icon: "users", reward: 300 },
  { id: "q12", title: "Submit Feedback", desc: "Share your thoughts on how to improve AlphaScope", category: "community", icon: "chat", reward: 100 },
];

export default function QuestsPage() {
  const { balance, completedQuests, completeQuest } = useTokens();
  const [category, setCategory] = useState("all");
  const [claimingId, setClaimingId] = useState(null);

  const filtered = ALL_QUESTS.filter(
    (q) => category === "all" || q.category === category
  );
  const totalReward = ALL_QUESTS.reduce((acc, q) => acc + q.reward, 0);
  const earnedReward = ALL_QUESTS.filter(q => completedQuests.includes(q.id)).reduce((acc, q) => acc + q.reward, 0);
  const progressPct = (completedQuests.length / ALL_QUESTS.length) * 100;

  function handleClaim(quest) {
    setClaimingId(quest.id);
    setTimeout(() => {
      completeQuest(quest.id, quest.reward);
      setClaimingId(null);
    }, 800);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Quest Center</h1>
          <p className="text-[#888] text-sm mt-1">Complete tasks to earn $ASCP tokens</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151515] border border-[#2A2A2A]">
          <RiCoinLine className="text-[#F5D90A]" />
          <span className="text-[#F5D90A] font-bold">{balance.toLocaleString()}</span>
          <span className="text-[#888] text-xs">ASCP</span>
        </div>
      </div>

      {/* Progress */}
      <div className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-semibold text-sm">Overall Progress</span>
          <span className="text-[#888] text-xs">{completedQuests.length}/{ALL_QUESTS.length} Quests · {earnedReward.toLocaleString()}/{totalReward.toLocaleString()} ASCP</span>
        </div>
        <div className="w-full h-3 rounded-full bg-[#0B0B0B] overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full rounded-full bg-gradient-to-r from-[#F5D90A] to-[#F97316]" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button key={cat.id} onClick={() => setCategory(cat.id)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${category === cat.id ? "bg-[#F5D90A] text-[#0B0B0B]" : "bg-[#151515] border border-[#2A2A2A] text-[#888] hover:text-white"}`}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Quests */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((quest, i) => {
          const isCompleted = completedQuests.includes(quest.id);
          const isClaiming = claimingId === quest.id;
          const Icon = QUEST_ICONS[quest.icon] || RiStarLine;
          return (
            <motion.div key={quest.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }} className={`p-4 rounded-2xl border bg-[#151515] transition-colors ${isCompleted ? "border-[#22C55E]/30" : "border-[#2A2A2A]"}`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isCompleted ? "bg-[#22C55E]/10" : "bg-[#F5D90A]/10"}`}>
                  {isCompleted ? <RiCheckLine className="text-[#22C55E] text-lg" /> : <Icon className="text-[#F5D90A] text-lg" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-sm ${isCompleted ? "text-[#888] line-through" : "text-white"}`}>{quest.title}</h3>
                  <p className="text-[#888] text-xs mt-0.5">{quest.desc}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <RiCoinLine className="text-[#F5D90A] text-xs" />
                    <span className="text-[#F5D90A] text-xs font-semibold">+{quest.reward} ASCP</span>
                  </div>
                </div>
                <div className="shrink-0">
                  {isCompleted ? (
                    <span className="px-3 py-1.5 rounded-lg bg-[#22C55E]/10 text-[#22C55E] text-xs font-semibold">Done</span>
                  ) : (
                    <button onClick={() => handleClaim(quest)} disabled={isClaiming} className="px-4 py-1.5 rounded-lg bg-[#F5D90A] text-[#0B0B0B] text-xs font-bold hover:bg-[#F5D90A]/90 transition-colors disabled:opacity-50 flex items-center gap-1">
                      {isClaiming ? (
                        <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>
                          <RiCoinLine />
                        </motion.div>
                      ) : (
                        <>Claim <RiArrowRightLine /></>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
