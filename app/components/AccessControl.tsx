'use client';

import { useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { SOUL_ADDRESS, SOUL_ABI } from '../constants';

export function AccessControl() {
  const { address } = useAccount();
  const [copied, setCopied] = useState(false);

  // LECTURE DU DISCIPLE #1 (Index 0)
  const { data: disciple1, isError: noDisciple1 } = useReadContract({
    address: SOUL_ADDRESS,
    abi: SOUL_ABI,
    functionName: 'disciples',
    args: address ? [address, 0n] : undefined, // On demande l'index 0
  });

  // LECTURE DU DISCIPLE #2 (Index 1)
  const { data: disciple2, isError: noDisciple2 } = useReadContract({
    address: SOUL_ADDRESS,
    abi: SOUL_ABI,
    functionName: 'disciples',
    args: address ? [address, 1n] : undefined, // On demande l'index 1
  });

  const generateInvite = () => {
    // Dans la V1, le code est simplement "TRINITY-" suivi de ton adresse (ou un code fixe pour la demo)
    // Pour simplifier le test, on copie TRINITY-ALPHA
    navigator.clipboard.writeText("TRINITY-ALPHA");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper pour formater l'adresse (0x1234...5678)
  const formatAddress = (addr: string) => {
      return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="w-full border border-orange-500/20 rounded-xl bg-orange-950/5 p-6 relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors"></div>

      <div className="flex items-center gap-3 mb-6">
        <div className="text-orange-500 text-sm tracking-widest uppercase font-bold border border-orange-500/30 px-3 py-1 rounded-full">
           ▲ Trinity Protocol
        </div>
      </div>

      <div className="relative text-center py-8">
        <h3 className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mb-8">
            The Dominator's Lineage
        </h3>

        {/* PYRAMID VISUALIZATION */}
        <div className="relative w-64 h-40 mx-auto mb-8">
            {/* Lignes de connexion */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-orange-500 to-transparent"></div>
            <div className="absolute top-24 left-10 right-10 h-px bg-gradient-to-r from-transparent via-orange-900 to-transparent border-t border-dashed border-orange-900"></div>
            
            {/* YOU (Sommet) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                <div className="w-12 h-12 rounded-full bg-black border-2 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)] flex items-center justify-center text-xl">
                    👑
                </div>
                <div className="mt-2 bg-black px-2 py-0.5 text-[9px] font-bold text-orange-500 uppercase tracking-widest">
                    You
                </div>
            </div>

            {/* DISCIPLE 1 (Gauche) */}
            <div className="absolute bottom-0 left-0 flex flex-col items-center">
                {disciple1 && !noDisciple1 ? (
                    // DISCIPLE ACTIF
                    <>
                        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-lg animate-pulse">
                            🌪️
                        </div>
                        <div className="mt-2 text-[8px] text-zinc-400 font-mono bg-black/50 px-1 rounded">
                            {formatAddress(disciple1 as string)}
                        </div>
                    </>
                ) : (
                    // EMPLACEMENT VIDE
                    <>
                        <div className="w-10 h-10 rounded-full bg-black border border-dashed border-zinc-700 flex items-center justify-center text-zinc-700 text-xs">
                            ?
                        </div>
                        <div className="mt-2 text-[8px] text-zinc-700 font-bold uppercase">
                            Wind
                        </div>
                    </>
                )}
            </div>

            {/* DISCIPLE 2 (Droite) */}
            <div className="absolute bottom-0 right-0 flex flex-col items-center">
                {disciple2 && !noDisciple2 ? (
                    // DISCIPLE ACTIF
                    <>
                        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-lg animate-pulse">
                            ☁️
                        </div>
                        <div className="mt-2 text-[8px] text-zinc-400 font-mono bg-black/50 px-1 rounded">
                            {formatAddress(disciple2 as string)}
                        </div>
                    </>
                ) : (
                    // EMPLACEMENT VIDE
                    <>
                        <div className="w-10 h-10 rounded-full bg-black border border-dashed border-zinc-700 flex items-center justify-center text-zinc-700 text-xs">
                            ?
                        </div>
                        <div className="mt-2 text-[8px] text-zinc-700 font-bold uppercase">
                            Cloud
                        </div>
                    </>
                )}
            </div>
            
            {/* Lignes diagonales (SVG pour précision) */}
            <svg className="absolute inset-0 pointer-events-none opacity-20" width="100%" height="100%">
                <line x1="50%" y1="20%" x2="15%" y2="80%" stroke="#f97316" strokeWidth="1" />
                <line x1="50%" y1="20%" x2="85%" y2="80%" stroke="#f97316" strokeWidth="1" />
            </svg>
        </div>

        {/* BOUTON D'INVITATION (CORRIGÉ CSS) */}
        <button 
            onClick={generateInvite}
            // AJOUT DE 'relative' et 'overflow-hidden' pour corriger le bug visuel
            className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-black font-black uppercase tracking-widest text-xs px-8 py-4 rounded transition-all transform hover:scale-105 active:scale-95 group shadow-[0_0_20px_rgba(234,88,12,0.3)]"
        >
            <span className="relative z-10 flex items-center gap-2">
                {copied ? 'VECTOR COPIED' : '⚔️ SUMMON DISCIPLE'}
            </span>
            
            {/* Le carré décoratif ne dépassera plus grâce à overflow-hidden sur le parent */}
            <div className="absolute -right-4 -bottom-4 w-8 h-8 bg-black/20 rotate-45 group-hover:rotate-90 transition-transform"></div>
        </button>
        
        <p className="mt-4 text-[9px] text-zinc-600 italic max-w-sm mx-auto">
            "When Wind meets Cloud, chaos breeds empire. Choose your two disciples wisely."
        </p>
      </div>
    </div>
  );
}
