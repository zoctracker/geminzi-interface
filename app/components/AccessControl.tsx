'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';

export function AccessControl() {
  const { address } = useAccount();
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Simulation
  const recruitCount = 0;
  const maxRecruits = 5;

  const generateCode = () => {
    if (!address) return;
    const uniquePart = address.slice(2, 6) + address.slice(-4);
    const newCode = `GMNZ-${uniquePart.toUpperCase()}-2029`;
    setCode(newCode);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (code) {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    // AJOUT DE pb-24 POUR L'ESPACE EN BAS SUR MOBILE
    <div className="w-full mt-12 mb-8 pb-24 font-mono">
      
      <div className="relative bg-gradient-to-b from-neutral-900 to-black border border-amber-500/30 rounded-xl p-1 shadow-[0_0_30px_rgba(245,158,11,0.05)]">
        
        {/* HEADER */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 py-1 border border-amber-500/50 rounded-full z-10">
            <span className="text-[10px] text-amber-500 font-bold tracking-widest uppercase flex items-center gap-2">
                👑 Colony Protocol
            </span>
        </div>

        <div className="p-6 pt-8 text-center relative z-0">
            
            <h3 className="text-zinc-400 text-xs uppercase tracking-[0.2em] mb-4">
                Founder Privileges
            </h3>

            {/* RECRUITMENT CIRCLE */}
            <div className="flex justify-center mb-6">
                <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-2 border-dashed border-zinc-800">
                    <div className="absolute inset-0 border-t-2 border-amber-500 rounded-full animate-spin duration-[10s]"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-black text-white">{recruitCount}</span>
                        <span className="text-[8px] text-zinc-500 uppercase">of {maxRecruits} Recruits</span>
                    </div>
                </div>
            </div>

            {/* GENERATE BUTTON */}
            {!code ? (
                // AJOUT DE 'relative z-50 cursor-pointer' POUR FORCER LE CLIC
                <button 
                    onClick={generateCode}
                    className="relative z-50 cursor-pointer group inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-amber-600 rounded hover:bg-amber-500 focus:outline-none focus:ring shadow-lg active:scale-95"
                >
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-amber-800 rounded group-hover:-mr-4 group-hover:-mt-4">
                      <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white opacity-10"></span>
                    </span>
                    <span className="relative text-xs uppercase tracking-widest">Generate Access Vector</span>
                </button>
            ) : (
                <div className="animate-fade-in-up relative z-50">
                    <div className="text-[10px] text-amber-700 uppercase mb-2">Unique Access Vector Generated</div>
                    <div 
                        onClick={copyToClipboard}
                        className="cursor-pointer bg-amber-950/20 border border-amber-500/50 rounded-lg p-4 flex items-center justify-between hover:bg-amber-900/20 transition-colors group active:bg-amber-900/40"
                    >
                        <code className="text-lg text-amber-400 font-bold tracking-wider">{code}</code>
                        <span className="text-xs text-amber-600 uppercase font-bold border border-amber-600/30 px-2 py-1 rounded">
                            {copied ? 'COPIED' : 'COPY'}
                        </span>
                    </div>
                    <p className="text-[9px] text-zinc-600 mt-3 italic">
                        "Grant passage to those worthy of the Ark."
                    </p>
                </div>
            )}

        </div>
      </div>
    </div>
  );
}
