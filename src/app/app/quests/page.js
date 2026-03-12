"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  RiTwitterXLine,
  RiHeart3Line,
  RiChat3Line,
  RiTelegramLine,
  RiGroupLine,
  RiSearchLine,
  RiVipDiamondLine,
  RiNotification3Line,
  RiWallet3Line,
  RiCalendarLine,
  RiDiscordLine,
  RiShareLine,
  RiCheckLine,
  RiCoinLine,
  RiArrowRightLine,
  RiStarLine,
} from "react-icons/ri";
import { quests } from "@/lib/mockData";
import { QUEST_CATEGORIES } from "@/lib/constants";

const QUEST_ICONS = {
  twitter: RiTwitterXLine,
  heart: RiHeart3Line,
  comment: RiChat3Line,
  telegram: RiTelegramLine,
  users: RiGroupLine,
  search: RiSearchLine,
  gem: RiVipDiamondLine,
  bell: RiNotification3Line,
  wallet: RiWallet3Line,
  calendar: RiCalendarLine,
  discord: RiDiscordLine,
  share: RiShareLine,
};

export default function QuestsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [completedQuests, setCompletedQuests] = useState(
    quests.filter((q) => q.completed).map((q) => q.id)
  );

  const filtered =
    activeCategory === "All"
      ? quests
      : quests.filter((q) => q.category === activeCategory);

  const totalEarned = quests
    .filter((q) => completedQuests.includes(q.id))
    .reduce((sum, q) => sum + q.reward, 0);

  const totalAvailable = quests.reduce((sum, q) => sum + q.reward, 0);

  const handleClaim = (questId) => {
    if (!completedQuests.includes(questId)) {
      setCompletedQuests([...completedQuests, questId]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Quest Center</h1>
          <p className="text-[#888] text-sm mt-1">
            Complete tasks to earn $ASCP tokens and unlock premium features
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#151515] border border-[#2A2A2A]">
            <RiCoinLine className="text-[#F5D90A]" />
            <div>
              <span className="text-[#F5D90A] font-bold text-sm">{totalEarned}</span>
              <span className="text-[#888] text-xs ml-1">/ {totalAvailable} ASCP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-medium text-sm">Quest Progress</span>
          <span className="text-[#888] text-xs">
            {completedQuests.length}/{quests.length} completed
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#1E1E1E] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${(completedQuests.length / quests.length) * 100}%`,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-[#F5D90A] to-[#F97316]"
          />
        </div>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {QUEST_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-[#F5D90A]/10 text-[#F5D90A] border border-[#F5D90A]/30"
                : "text-[#888] border border-[#2A2A2A] hover:text-white hover:bg-[#1E1E1E]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Quest Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((quest, i) => {
          const Icon = QUEST_ICONS[quest.icon] || RiStarLine;
          const isCompleted = completedQuests.includes(quest.id);
          return (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`p-5 rounded-2xl border bg-[#151515] transition-all ${
                isCompleted
                  ? "border-[#22C55E]/20"
                  : "border-[#2A2A2A] card-hover"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isCompleted
                      ? "bg-[#22C55E]/10"
                      : "bg-[#F5D90A]/10"
                  }`}
                >
                  <Icon
                    className={`text-lg ${
                      isCompleted ? "text-[#22C55E]" : "text-[#F5D90A]"
                    }`}
                  />
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F5D90A]/10 text-[#F5D90A] text-xs font-semibold">
                  <RiCoinLine className="text-[10px]" />
                  +{quest.reward}
                </div>
              </div>

              <h3 className="text-white font-semibold text-sm mb-1">
                {quest.title}
              </h3>
              <p className="text-[#888] text-xs mb-4">{quest.description}</p>

              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] px-2 py-1 rounded-lg font-medium"
                  style={{
                    backgroundColor:
                      quest.category === "Social"
                        ? "#3B82F620"
                        : quest.category === "Platform"
                        ? "#A855F720"
                        : "#22C55E20",
                    color:
                      quest.category === "Social"
                        ? "#3B82F6"
                        : quest.category === "Platform"
                        ? "#A855F7"
                        : "#22C55E",
                  }}
                >
                  {quest.category}
                </span>

                {isCompleted ? (
                  <span className="flex items-center gap-1 text-[#22C55E] text-xs font-medium">
                    <RiCheckLine /> Completed
                  </span>
                ) : (
                  <button
                    onClick={() => handleClaim(quest.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F5D90A] text-[#0B0B0B] text-xs font-semibold hover:bg-[#F5D90A]/90 transition-colors"
                  >
                    Start <RiArrowRightLine />
                  </button>
                )}
              </div>

              {quest.daily && (
                <div className="mt-3 pt-3 border-t border-[#2A2A2A] flex items-center gap-1 text-[#888] text-[10px]">
                  <RiCalendarLine />
                  <span>Resets daily</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
