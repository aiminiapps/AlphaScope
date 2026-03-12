"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  RiCoinLine,
  RiSearchEyeLine,
  RiAlertLine,
  RiStarLine,
  RiArrowRightUpLine,
  RiArrowRightDownLine,
  RiFlashlightLine,
  RiVipDiamondLine,
  RiTaskLine,
} from "react-icons/ri";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { dashboardStats, marketChartData, trendingTokens, recentActivity } from "@/lib/mockData";

function StatCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[#888] text-sm">{stat.label}</span>
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            stat.positive ? "text-[#22C55E]" : "text-[#F97316]"
          }`}
        >
          {stat.positive ? (
            <RiArrowRightUpLine />
          ) : (
            <RiArrowRightDownLine />
          )}
          {stat.change}
        </div>
      </div>
      <div className="text-2xl font-bold text-white">{stat.value}</div>
    </motion.div>
  );
}

function ActivityIcon({ type }) {
  const icons = {
    analysis: <RiSearchEyeLine className="text-[#3B82F6]" />,
    alert: <RiAlertLine className="text-[#F97316]" />,
    quest: <RiTaskLine className="text-[#22C55E]" />,
    gem: <RiVipDiamondLine className="text-[#A855F7]" />,
  };
  return icons[type] || <RiFlashlightLine className="text-[#F5D90A]" />;
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Market Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold text-lg">Market Overview</h3>
              <p className="text-[#888] text-sm">ASCP price performance</p>
            </div>
            <div className="flex items-center gap-2">
              {["1D", "1W", "1M", "1Y"].map((period) => (
                <button
                  key={period}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    period === "1Y"
                      ? "bg-[#F5D90A]/10 text-[#F5D90A]"
                      : "text-[#888] hover:text-white hover:bg-[#1E1E1E]"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketChartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5D90A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F5D90A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis
                  dataKey="date"
                  stroke="#666"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#666"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E1E1E",
                    border: "1px solid #2A2A2A",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "13px",
                  }}
                  labelStyle={{ color: "#888" }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#F5D90A"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]"
        >
          <h3 className="text-white font-semibold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0B0B0B] flex items-center justify-center shrink-0 mt-0.5">
                  <ActivityIcon type={activity.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {activity.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#888] text-xs">{activity.time}</span>
                    <span className="text-[#666] text-xs">•</span>
                    <span className="text-[#F5D90A] text-xs">{activity.detail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Trending Tokens */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">Trending Tokens</h3>
          <Link
            href="/app/gems"
            className="text-[#F5D90A] text-sm font-medium hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                <th className="text-left text-[#888] text-xs font-medium py-3 px-2">
                  Token
                </th>
                <th className="text-right text-[#888] text-xs font-medium py-3 px-2">
                  Price
                </th>
                <th className="text-right text-[#888] text-xs font-medium py-3 px-2">
                  24h Change
                </th>
                <th className="text-right text-[#888] text-xs font-medium py-3 px-2 hidden sm:table-cell">
                  Volume
                </th>
                <th className="text-right text-[#888] text-xs font-medium py-3 px-2">
                  Alpha Score
                </th>
              </tr>
            </thead>
            <tbody>
              {trendingTokens.map((token, i) => (
                <tr
                  key={i}
                  className="border-b border-[#2A2A2A]/50 hover:bg-[#1E1E1E] transition-colors cursor-pointer"
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5D90A]/20 to-[#F97316]/20 flex items-center justify-center text-xs font-bold text-[#F5D90A]">
                        {token.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <span className="text-white text-sm font-medium">
                          {token.name}
                        </span>
                        <span className="text-[#888] text-xs ml-2">
                          {token.symbol}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-right text-white text-sm">
                    {token.price}
                  </td>
                  <td
                    className={`py-3 px-2 text-right text-sm font-medium ${
                      token.positive ? "text-[#22C55E]" : "text-[#FF4444]"
                    }`}
                  >
                    {token.change}
                  </td>
                  <td className="py-3 px-2 text-right text-[#888] text-sm hidden sm:table-cell">
                    {token.volume}
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                        token.alphaScore >= 8
                          ? "bg-[#22C55E]/10 text-[#22C55E]"
                          : token.alphaScore >= 7
                          ? "bg-[#F5D90A]/10 text-[#F5D90A]"
                          : "bg-[#F97316]/10 text-[#F97316]"
                      }`}
                    >
                      <RiStarLine className="text-[10px]" />
                      {token.alphaScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            title: "Analyze Token",
            desc: "AI-powered research report",
            href: "/app/analyzer",
            icon: RiSearchEyeLine,
            color: "#3B82F6",
          },
          {
            title: "Scan Gems",
            desc: "Find hidden opportunities",
            href: "/app/gems",
            icon: RiVipDiamondLine,
            color: "#A855F7",
          },
          {
            title: "Earn $ASCP",
            desc: "Complete quests for rewards",
            href: "/app/quests",
            icon: RiCoinLine,
            color: "#F5D90A",
          },
        ].map((action, i) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
          >
            <Link
              href={action.href}
              className="flex items-center gap-4 p-4 rounded-2xl border border-[#2A2A2A] bg-[#151515] card-hover group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${action.color}15` }}
              >
                <action.icon
                  className="text-lg"
                  style={{ color: action.color }}
                />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm group-hover:text-[#F5D90A] transition-colors">
                  {action.title}
                </h4>
                <p className="text-[#888] text-xs">{action.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
