// app/power/page.tsx

'use client';

import { useState, useRef } from 'react';
import { Play, Trash2, Copy, Check, FileText, ArrowLeft, ShieldCheck, Search } from 'lucide-react';
import Link from 'next/link';

interface PowerTransaction {
  bank: string;
  account: string;
  username: string;
  realname: string;
  amount: number;
}

export default function PowerParser() {
  const [input, setInput] = useState('');
  const [transactions, setTransactions] = useState<PowerTransaction[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const formatRupiah = (num: number) => 'Rp ' + num.toLocaleString('en-GB');

  const handleProcess = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setTransactions([]);
    setHasProcessed(false);

    try {
      const res = await fetch('/api/power', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawData: input })
      });
      const data = await res.json();
      if (res.ok) {
        setTransactions(data.data);
        setTotalCount(data.totalCount);
        setTotalAmount(data.totalAmount);
        setHasProcessed(true);
      }
    } catch (error) {
      console.error("Gagal memproses data");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setTransactions([]);
    setHasProcessed(false);
    setTotalCount(0);
    setTotalAmount(0);
    inputRef.current?.focus();
  };

  const handleCopy = () => {
    if (transactions.length === 0) return;
    const text = transactions.map(t => `${t.bank}\t'${t.account}\t${t.username}\t${t.realname}\t${t.amount}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-slate-950 text-slate-200 md:flex-row">
      <aside className="relative flex w-full flex-shrink-0 flex-col border-b border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl md:w-[400px] md:border-b-0 md:border-r">
        <div className="mb-8">
          <Link href="/" className="group mb-6 inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition-colors hover:text-violet-400">
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            KEMBALI KE DASHBOARD
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 shadow-inner shadow-violet-500/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AutoWD <span className="text-violet-500">Power</span></h1>
              <p className="text-xs text-slate-400">Parser AutoWD Power</p>
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Input Data</label>
            <span className="text-[10px] text-slate-600">Sumber: Dashboard Power</span>
          </div>
          <textarea 
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 resize-none rounded-xl border border-slate-800 bg-black/40 p-4 font-mono text-xs leading-relaxed text-slate-300 outline-none placeholder:text-slate-700 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50"
            placeholder="Tempel data power mentah di sini..."
            spellCheck={false}
          />
        </div>

        <div className="mt-6 flex gap-3">
          <button 
            onClick={handleProcess} 
            disabled={loading || !input.trim()} 
            className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-900/20 transition-all hover:bg-violet-500 hover:shadow-violet-900/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none cursor-pointer"
          >
            {loading ? <Search className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4 fill-current" />}
            {loading ? 'MENGANALISIS...' : 'ANALISIS DATA'}
          </button>
          <button 
            onClick={handleClear} 
            className="flex flex-1 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 transition-colors hover:bg-red-500/20 hover:border-red-500/30 cursor-pointer"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </aside>

      <main className="relative flex h-full flex-1 flex-col overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        
        <div className="z-10 flex h-full flex-col p-6 md:p-10">
          <header className="mb-8 flex flex-shrink-0 items-end justify-between border-b border-slate-800 pb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">Hasil Parser</h2>
              <p className="text-sm text-slate-500">Data admin power terstruktur</p>
            </div>
            {hasProcessed && (
               <button 
               onClick={handleCopy}
               className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                 copied 
                 ? 'border-violet-500/30 bg-violet-500/10 text-violet-400' 
                 : 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300'
               }`}
             >
               {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
               {copied ? 'BERHASIL DISALIN' : 'SALIN HASIL'}
             </button>
            )}
          </header>

          {hasProcessed ? (
            <div className="flex h-full flex-col gap-6 overflow-hidden">
              <div className="grid flex-shrink-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-500/5 blur-2xl transition-all group-hover:bg-violet-500/10"></div>
                  <span className="relative z-10 text-xs font-bold uppercase tracking-wider text-slate-500">Transaksi Ditemukan</span>
                  <div className="relative z-10 mt-2 text-3xl font-bold text-white">{totalCount}</div>
                </div>
                
                <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
                   <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-500/5 blur-2xl transition-all group-hover:bg-purple-500/10"></div>
                  <span className="relative z-10 text-xs font-bold uppercase tracking-wider text-slate-500">Total Volume</span>
                  <div className="relative z-10 mt-2 text-3xl font-bold text-violet-400">{formatRupiah(totalAmount)}</div>
                </div>
              </div>

              <div className="flex-1 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                <div className="h-full overflow-auto custom-scrollbar">
                  <table className="w-full text-left">
                    <thead className="sticky top-0 z-20 bg-slate-900 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="w-12 border-b border-slate-800 px-4 py-4">No</th>
                        <th className="border-b border-slate-800 px-4 py-4">Bank</th>
                        <th className="border-b border-slate-800 px-4 py-4">Rekening</th>
                        <th className="border-b border-slate-800 px-4 py-4">User ID</th>
                        <th className="border-b border-slate-800 px-4 py-4">Nama Asli</th>
                        <th className="border-b border-slate-800 px-4 py-4 text-right">Nominal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-sm">
                      {transactions.map((trx, i) => (
                        <tr key={i} className="group transition-colors hover:bg-slate-800/50">
                          <td className="px-4 py-3 font-mono text-slate-500 group-hover:text-slate-400">{i + 1}</td>
                          <td className="px-4 py-3 font-medium text-slate-300">{trx.bank}</td>
                          <td className="px-4 py-3 font-mono text-slate-400">{trx.account}</td>
                          <td className="px-4 py-3 text-slate-400">{trx.username}</td>
                          <td className="px-4 py-3 text-slate-300 uppercase">{trx.realname}</td>
                          <td className="px-4 py-3 text-right font-mono font-medium text-violet-400">{formatRupiah(trx.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 shadow-inner">
                <FileText className="h-10 w-10 text-slate-700" />
              </div>
              <h3 className="text-lg font-medium text-slate-300">Siap Audit Data</h3>
              <p className="mt-2 max-w-xs text-sm text-slate-500">Tempel data dashboard Power di sidebar untuk memulai analisis.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}