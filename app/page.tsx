// app/page.tsx

import Link from 'next/link';
import { CreditCard, Layers, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const currentYear = new Date().getFullYear();
  const startYear = 2026;

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center p-6 sm:p-12">
      <div className="mb-16 max-w-2xl text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 backdrop-blur-md">
          <Sparkles className="mr-2 h-3 w-3" />
          <span>ShortcutX Parser Tools v1.0</span>
        </div>
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          ShortcutX <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Dashboard</span>
        </h1>
        <p className="text-lg leading-relaxed text-slate-400">
          Shortcut tools untuk mutasi BCA dan Withdraw Operate PNG & Power dalam satu dashboard terintegrasi.
        </p>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        <Link href="/bca" className="group relative block">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-blue-500/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 blur-sm"></div>
          <div className="relative flex h-full flex-col items-start rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-blue-900/20">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 shadow-inner shadow-blue-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:text-blue-300">
              <CreditCard className="h-7 w-7" />
            </div>
            <h2 className="mb-3 text-xl font-bold text-slate-100">Mutasi BCA</h2>
            <p className="mb-8 flex-grow text-sm leading-relaxed text-slate-400">
              Konversi data mutasi rekening BCA menjadi format kompatibel sheets Deposit untuk spreadsheets.
            </p>
            <div className="flex w-full items-center text-sm font-semibold text-blue-400 group-hover:text-blue-300">
              <span>Akses Tool</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        <Link href="/autowd" className="group relative block">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-emerald-500/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 blur-sm"></div>
          <div className="relative flex h-full flex-col items-start rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-emerald-900/20">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 shadow-inner shadow-emerald-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:text-emerald-300">
              <Layers className="h-7 w-7" />
            </div>
            <h2 className="mb-3 text-xl font-bold text-slate-100">Withdraw Operate PNG</h2>
            <p className="mb-8 flex-grow text-sm leading-relaxed text-slate-400">
              Konversi withdraw operate PNG menjadi format kompatibel sheets Withdraw untuk spreadsheets.
            </p>
            <div className="flex w-full items-center text-sm font-semibold text-emerald-400 group-hover:text-emerald-300">
              <span>Akses Tool</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        <Link href="/power" className="group relative block">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-violet-500/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 blur-sm"></div>
          <div className="relative flex h-full flex-col items-start rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/50 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-violet-900/20">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 shadow-inner shadow-violet-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-violet-500/20 group-hover:text-violet-300">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h2 className="mb-3 text-xl font-bold text-slate-100">Admin Power</h2>
            <p className="mb-8 flex-grow text-sm leading-relaxed text-slate-400">
              Konversi transaksi Admin Power Dashboard menjadi format kompatibel sheets Withdraw untuk spreadsheets.
            </p>
            <div className="flex w-full items-center text-sm font-semibold text-violet-400 group-hover:text-violet-300">
              <span>Akses Tool</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-20 flex items-center gap-4 text-sm text-slate-600">
        <span>
          &copy; {currentYear > startYear ? `${startYear} - ${currentYear}` : currentYear} ShortcutX
        </span>
        <span className="h-1 w-1 rounded-full bg-slate-700"></span>
        <span>Internal Use Only</span>
      </div>
    </div>
  );
}