"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { RiSearchLine, RiNotification3Line, RiCoinLine } from "react-icons/ri";
import { useTokens } from "@/context/TokenContext";

export default function Topbar() {
  const { balance, loaded } = useTokens();

  return (
    <header className="sticky top-0 z-30 bg-[#0B0B0B]/80 backdrop-blur-xl border-b border-[#2A2A2A]">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        <div className="flex items-center gap-3 flex-1 max-w-md ml-12 lg:ml-0">
          <div className="relative w-full">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888] text-sm" />
            <input
              type="text"
              placeholder="Search tokens, wallets..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#151515] border border-[#2A2A2A] text-white text-sm placeholder:text-[#666] focus:outline-none focus:border-[#F5D90A]/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#151515] border border-[#2A2A2A]">
            <RiCoinLine className="text-[#F5D90A] text-sm" />
            <span className="text-[#F5D90A] font-semibold text-sm">
              {loaded ? balance.toLocaleString() : "..."}
            </span>
            <span className="text-[#888] text-xs">ASCP</span>
          </div>

          <button className="relative w-9 h-9 rounded-xl bg-[#151515] border border-[#2A2A2A] flex items-center justify-center text-[#888] hover:text-white transition-colors">
            <RiNotification3Line className="text-sm" />
          </button>

          <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
              const ready = mounted;
              const connected = ready && account && chain;
              return (
                <div {...(!ready && { "aria-hidden": true, style: { opacity: 0, pointerEvents: "none", userSelect: "none" } })}>
                  {connected ? (
                    <button onClick={openAccountModal} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#151515] border border-[#2A2A2A] hover:border-[#F5D90A]/30 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F5D90A] to-[#F97316]" />
                      <span className="text-white text-sm font-medium hidden sm:block">{account.displayName}</span>
                    </button>
                  ) : (
                    <button onClick={openConnectModal} className="px-4 py-2 rounded-xl bg-[#F5D90A] text-[#0B0B0B] font-semibold text-sm hover:bg-[#F5D90A]/90 transition-colors">
                      Connect
                    </button>
                  )}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </header>
  );
}
