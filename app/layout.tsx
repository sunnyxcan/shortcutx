// app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ['400', '500', '600', '700', '800'],
});

const mono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "ShortcutX - Multi Parser Tools Dashboard",
  description: "Platform terpadu untuk parsing dan analisis data mutasi BCA, Withdraw IDN, Withdraw Operate, dan Admin Power dengan presisi tinggi.",
  keywords: ["Parser", "BCA", "Mutasi", "Withdraw IDN", "Withdraw Operate", "Admin Power", "Tools", "ShortcutX"],
  authors: [{ name: "ShortcutX Team" }],
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 12h-4l-3 9L9 3l-3 9H2'/%3E%3C/svg%3E",
  },
  openGraph: {
    title: "ShortcutX - Multi Parser Tools Dashboard",
    description: "Platform terpadu untuk parsing dan analisis data mutasi BCA, Withdraw IDN, Withdraw Operate, dan Admin Power dengan presisi tinggi.",
    type: "website",
    siteName: "ShortcutX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark scroll-smooth" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${mono.variable} min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-blue-500/30 selection:text-blue-200`}>
        <div className="fixed inset-0 -z-10 h-full w-full bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
        </div>
        <main className="relative flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}