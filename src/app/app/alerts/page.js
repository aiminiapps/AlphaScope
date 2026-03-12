"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { RiAlarmWarningLine, RiArrowUpLine, RiBarChartLine, RiVipCrownLine, RiSparklingLine, RiSettings3Line, RiToggleLine, RiToggleFill } from "react-icons/ri";
import { alphaAlerts } from "@/lib/mockData";
import { ALERT_TYPES } from "@/lib/constants";

const SEVERITY_STYLES = {
  high: { bg: "bg-[#FF4444]/10", text: "text-[#FF4444]", label: "High" },
  medium: { bg: "bg-[#F97316]/10", text: "text-[#F97316]", label: "Medium" },
  low: { bg: "bg-[#22C55E]/10", text: "text-[#22C55E]", label: "Low" },
};

const ALERT_ICONS = {
  WHALE_BUY: RiVipCrownLine,
  LIQUIDITY_SPIKE: RiArrowUpLine,
  VOLUME_SURGE: RiBarChartLine,
  SMART_MONEY: RiSparklingLine,
  NEW_TOKEN: RiAlarmWarningLine,
};

export default function AlertsPage() {
  const [alertSettings, setAlertSettings] = useState({
    WHALE_BUY: true, LIQUIDITY_SPIKE: true, VOLUME_SURGE: true, SMART_MONEY: true, NEW_TOKEN: false,
  });
  const [showSettings, setShowSettings] = useState(false);

  const toggleSetting = (key) => setAlertSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const filtered = alphaAlerts.filter((a) => alertSettings[a.type]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Alpha Alerts</h1>
          <p className="text-[#888] text-sm mt-1">Real-time signals for market opportunities</p>
        </div>
        <button onClick={() => setShowSettings(!showSettings)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#2A2A2A] bg-[#151515] text-[#888] hover:text-white text-sm transition-colors">
          <RiSettings3Line /> Settings
        </button>
      </div>

      {showSettings && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-5 rounded-2xl border border-[#2A2A2A] bg-[#151515]">
          <h3 className="text-white font-semibold mb-4">Alert Configuration</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(ALERT_TYPES).map(([key, val]) => (
              <button key={key} onClick={() => toggleSetting(key)} className="flex items-center justify-between p-3 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A] hover:border-[#2A2A2A]/80 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: val.color }} />
                  <span className="text-white text-sm">{val.label}</span>
                </div>
                {alertSettings[key] ? <RiToggleFill className="text-[#F5D90A] text-xl" /> : <RiToggleLine className="text-[#888] text-xl" />}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {filtered.map((alert, i) => {
          const Icon = ALERT_ICONS[alert.type] || RiAlarmWarningLine;
          const severity = SEVERITY_STYLES[alert.severity];
          const typeInfo = ALERT_TYPES[alert.type];
          return (
            <motion.div key={alert.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }} className="p-4 rounded-2xl border border-[#2A2A2A] bg-[#151515] card-hover">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${typeInfo?.color || "#888"}15` }}>
                  <Icon className="text-lg" style={{ color: typeInfo?.color || "#888" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-white font-semibold text-sm">{alert.title}</h3>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: `${typeInfo?.color || "#888"}20`, color: typeInfo?.color || "#888" }}>{typeInfo?.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${severity.bg} ${severity.text}`}>{severity.label}</span>
                      </div>
                      <p className="text-[#888] text-sm">{alert.description}</p>
                    </div>
                    <span className="text-[#888] text-xs shrink-0">{alert.time}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[#F5D90A] text-xs font-medium">${alert.token}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <RiAlarmWarningLine className="text-[#888] text-3xl mb-3" />
          <h3 className="text-white font-semibold mb-1">No Active Alerts</h3>
          <p className="text-[#888] text-sm">Enable alert types in settings to see signals</p>
        </div>
      )}
    </div>
  );
}
