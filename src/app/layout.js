import { Inter } from "next/font/google";
import "./globals.css";
import Web3Provider from "@/providers/Web3Provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL("https://www.alpha-scope.xyz"),
  title: {
    default: "AlphaScope — AI-Powered Crypto Research",
    template: "%s | AlphaScope",
  },
  description: "Discover early-stage tokens and hidden opportunities before they become widely known. AI-powered on-chain research, gem scanning, and wallet intelligence.",
  keywords: ["crypto", "AI", "token research", "blockchain", "DeFi", "alpha", "gem scanner", "smart money tracker", "crypto scanner", "web3"],
  authors: [{ name: "AlphaScope Team" }],
  creator: "AlphaScope",
  icons: {
    icon: "/agent.png",
    shortcut: "/agent.png",
    apple: "/agent.png",
  },
  openGraph: {
    title: "AlphaScope — AI-Powered Crypto Research",
    description: "Discover early-stage tokens and hidden opportunities with AI-powered on-chain analytics.",
    url: "https://www.alpha-scope.xyz",
    siteName: "AlphaScope",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "AlphaScope - Identify crypto opportunities before the crowd",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaScope — AI-Powered Crypto Research",
    description: "Discover early-stage tokens and hidden opportunities with AI-powered on-chain analytics.",
    site: "@ascp_ai",
    creator: "@ascp_ai",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  applicationName: "AlphaScope"
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AlphaScope",
    url: "https://www.alpha-scope.xyz",
    description: "AI-Powered Crypto Research, Gem Scanning, and Wallet Intelligence Platform",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.alpha-scope.xyz/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    sameAs: [
      "https://x.com/ascp_ai",
      "https://alpha-scope.gitbook.io/alpha-scope-docs"
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
