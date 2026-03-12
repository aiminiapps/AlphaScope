"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  RiMenu3Line,
  RiCloseLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { NAV_ITEMS } from "@/lib/constants";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href) => {
    if (href === "/app") return pathname === "/app";
    return pathname.startsWith(href);
  };

  const SidebarContent = ({ mobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 flex items-center justify-between border-b border-[#2A2A2A]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F5D90A] flex items-center justify-center shrink-0">
            <span className="text-[#0B0B0B] font-bold text-sm">AS</span>
          </div>
          {(!collapsed || mobile) && (
            <span className="text-white font-bold text-lg">
              Alpha<span className="text-[#F5D90A]">Scope</span>
            </span>
          )}
        </Link>
        {!mobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:block text-[#888] hover:text-white transition-colors"
          >
            {collapsed ? <RiMenu3Line size={18} /> : <RiCloseLine size={18} />}
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => mobile && setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                active
                  ? "bg-[#F5D90A]/10 text-[#F5D90A]"
                  : "text-[#888] hover:text-white hover:bg-[#1E1E1E]"
              }`}
            >
              <Icon className={`text-lg shrink-0 ${active ? "text-[#F5D90A]" : ""}`} />
              {(!collapsed || mobile) && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-[#2A2A2A]">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#888] hover:text-white hover:bg-[#1E1E1E] transition-all text-sm font-medium w-full">
          <RiLogoutBoxRLine className="text-lg shrink-0" />
          {(!collapsed || mobile) && <span>Disconnect</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col border-r border-[#2A2A2A] bg-[#0F0F0F] h-screen sticky top-0 transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-[240px]"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-[#151515] border border-[#2A2A2A] flex items-center justify-center text-white"
      >
        <RiMenu3Line size={18} />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-[260px] bg-[#0F0F0F] border-r border-[#2A2A2A]"
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-[#888] hover:text-white"
                >
                  <RiCloseLine size={20} />
                </button>
              </div>
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
