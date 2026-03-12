"use client";

import Link from "next/link";
import { RiTwitterXLine, RiTelegramLine, RiDiscordLine, RiGithubLine } from "react-icons/ri";

const footerLinks = {
  Product: [
    { name: "AI Analyzer", href: "/app/analyzer" },
    { name: "Gem Scanner", href: "/app/gems" },
    { name: "Wallet Tracker", href: "/app/wallets" },
    { name: "Alpha Alerts", href: "/app/alerts" },
  ],
  Community: [
    { name: "Twitter / X", href: "#" },
    { name: "Telegram", href: "#" },
    { name: "Discord", href: "#" },
    { name: "Blog", href: "#" },
  ],
  Resources: [
    { name: "Documentation", href: "#" },
    { name: "API", href: "#" },
    { name: "Tokenomics", href: "#" },
    { name: "FAQ", href: "#" },
  ],
};

const socials = [
  { icon: RiTwitterXLine, href: "#" },
  { icon: RiTelegramLine, href: "#" },
  { icon: RiDiscordLine, href: "#" },
  { icon: RiGithubLine, href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2A2A] bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#F5D90A] flex items-center justify-center">
                <span className="text-[#0B0B0B] font-bold text-sm">AS</span>
              </div>
              <span className="text-white font-bold text-xl">
                Alpha<span className="text-[#F5D90A]">Scope</span>
              </span>
            </Link>
            <p className="text-[#888] text-sm leading-relaxed mb-6 max-w-xs">
              AI-powered crypto research platform. Discover early-stage tokens
              and hidden opportunities.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 rounded-lg border border-[#2A2A2A] bg-[#151515] flex items-center justify-center text-[#888] hover:text-[#F5D90A] hover:border-[#F5D90A]/30 transition-all"
                >
                  <social.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[#888] text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#2A2A2A] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#666] text-xs">
            © 2025 AlphaScope. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#666] text-xs hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[#666] text-xs hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
