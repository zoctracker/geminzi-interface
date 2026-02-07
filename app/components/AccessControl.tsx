'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';

export function AccessControl() {
  const { address } = useAccount();
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // LA LOI DU 2 (TRINITÉ)
  const recruitCount = 0; // Pour l'instant 0
  const maxRecruits = 2;  // Vent & Nuage

  const generateCode = () => {
    if (!address) return;
    const uniquePart = address.slice(2, 6) + address.slice(-4);
    const newCode = `TRINITY-${uniquePart.toUpperCase()}`; // Nouveau format de code
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
    <div className="w-full mt-12 mb-8 pb-24 font-mono">
      
      {/* CADRE TRINITAIRE (AMBER/GOLD) */}
      <div className="relative bg-gradient-to-b from-neutral-900 to-black border border-amber-500/30 rounded-xl p-1 shadow-[0_0_30px_rgba(245,158,11,0.05)]">
        
        {/* HEADER */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 py-1 border border-amber-500/50 rounded-full z-10">
            <span className="text-[10px] text-amber-500 font-bold tracking-widest uppercase flex items-center gap-2">
                🔺 Trinity Protocol
            </span>
        </div>

        <div className="p-6 pt-10 text-center relative z-0">
            
            <h3 className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mb-8">
                The Dominator's Lineage
            </h3>

            {/* DIAGRAMME DE LA TRINITÉ */}
            <div className="relative h-48 mb-8 flex flex-col items-center justify-center">
                
                {/* Lignes de connexion (Triangle) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                    {/* Sommet vers Gauche */}
                    <line x1="50%" y1="20%" x2="25%" y2="80%" stroke="#d97706" strokeWidth="1" />
                    {/* Sommet vers Droite */}
                    <line x1="50%" y1="20%" x2="75%" y2="80%" stroke="#d97706" strokeWidth="1" />
                    {/* Base */}
                    <line x1="25%" y1="80%" x2="75%" y2="80%" stroke="#d97706" strokeWidth="1" strokeDasharray="4 4" />
                </svg>

                {/* SOMMET : LE DOMINATEUR (TOI) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] z-10">
                        <span className="text-lg">👑</span>
                    </div>
                    <span className="text-[9px] text-amber-500 font-bold mt-2 tracking-widest bg-black px-2">YOU</span>
                </div>

                {/* BASE GAUCHE : LE VENT */}
                <div className="absolute bottom-0 left-[15%] md:left-[25%] flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full border border-dashed border-zinc-700 flex items-center justify-center z-10 ${recruitCount > 0 ? 'bg-amber-900/50 border-amber-500' : 'bg-black'}`}>
                        <span className="text-xs text-zinc-600">{recruitCount > 0 ? '👤' : '?'}</span>
                    </div>
                    <span className="text-[8px] text-zinc-600 mt-2 tracking-widest uppercase">Wind</span>
                </div>

                {/* BASE DROITE : LE NUAGE */}
                <div className="absolute bottom-0 right-[15%] md:right-[25%] flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full border border-dashed border-zinc-700 flex items-center justify-center z-10 ${recruitCount > 1 ? 'bg-amber-900/50 border-amber-500' : 'bg-black'}`}>
                         <span className="text-xs text-zinc-600">{recruitCount > 1 ? '👤' : '?'}</span>
                    </div>
                    <span className="text-[8px] text-zinc-600 mt-2 tracking-widest uppercase">Cloud</span>
                </div>
            </div>

            {/* ACTION : RECRUTEMENT */}
            <div className="relative z-50">
                {!code ? (
                    <button 
                        onClick={generateCode}
                        disabled={recruitCount >= maxRecruits}
                        className="cursor-pointer group inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-amber-700 rounded hover:bg-amber-600 focus:outline-none focus:ring shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-amber-900 rounded group-hover:-mr-4 group-hover:-mt-4">
                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white opacity-10"></span>
                        </span>
                        <span className="relative text-[10px] uppercase tracking-widest flex items-center gap-2">
                           <span>⚔️</span> Summon Disciple
                        </span>
                    </button>
                ) : (
                    <div className="animate-fade-in-up">
                        <div className="text-[10px] text-amber-600 uppercase mb-2">Trinity Key Forged</div>
                        <div 
                            onClick={copyToClipboard}
                            className="cursor-pointer bg-amber-950/30 border border-amber-500/50 rounded-lg p-4 flex items-center justify-between hover:bg-amber-900/40 transition-colors group active:bg-amber-900/60"
                        >
                            <code className="text-sm md:text-base text-amber-400 font-bold tracking-wider">{code}</code>
                            <span className="text-[10px] text-amber-600 uppercase font-bold border border-amber-600/30 px-2 py-1 rounded">
                                {copied ? 'COPIED' : 'COPY'}
                            </span>
                        </div>
                    </div>
                )}
            </div>
            
            <p className="text-[9px] text-zinc-600 mt-6 italic max-w-xs mx-auto">
                "When Wind meets Cloud, chaos breeds empire. Choose your two disciples wisely."
            </p>

        </div>
      </div>
    </div>
  );
}
