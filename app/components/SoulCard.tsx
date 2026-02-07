'use client';

import { useAccount, useReadContract } from 'wagmi';
import { SOUL_ADDRESS, SOUL_ABI } from '../constants';

export function SoulCard() {
  const { address } = useAccount();

  // Lecture de l'Âme sur la Blockchain
  const { data: soulData } = useReadContract({
    address: SOUL_ADDRESS,
    abi: SOUL_ABI,
    functionName: 'getMySoul',
    args: [address],
  });

  // Extraction des données (ou valeurs par défaut si chargement)
  // Format retourné par le contrat: [vitality, scars, tokenId]
  // Note: Wagmi renvoie parfois des BigInt, on convertit en Number pour l'affichage
  const vitality = soulData ? Number(soulData[0]) : 0;
  const scars = soulData ? Number(soulData[1]) : 0;
  const tokenId = soulData ? Number(soulData[2]) : 0;

  // Calcul du Rang (Logique Cosmogonique)
  const getRank = (v: number) => {
    if (v > 100) return "ETHERAL ARCHITECT";
    if (v > 50) return "VOID WALKER";
    if (v > 30) return "NOBLE FOUNDER";
    return "INITIATE";
  };

  return (
    <div className="relative group w-full mt-8">
      
      {/* 1. L'AURA (Glow externe qui pulse) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition duration-1000 animate-pulse"></div>

      {/* 2. LE CONTENEUR PRINCIPAL (Verre Givré) */}
      <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden">
        
        {/* 3. LE SCANNER (Ligne qui descend) */}
        {/* Animation CSS infinie simulée via group-hover ou keyframes custom si besoin. Ici on fait un effet de passage. */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-[2000ms] ease-in-out pointer-events-none"></div>

        {/* HEADER: ID & Puce */}
        <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                    Identity Protocol // V.1
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 tracking-tighter">
                    PATIENT #{tokenId}
                </h2>
            </div>
            
            {/* PUCE HOLOGRAPHIQUE (Animation tournante - Octonion Shield) */}
            <div className="w-10 h-10 rounded-lg border border-purple-500/30 bg-purple-900/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#a855f7_100%)] animate-spin opacity-50"></div>
                <div className="z-10 text-lg">💠</div>
            </div>
        </div>

        {/* DATA GRID (Vitalité & Cicatrices) */}
        <div className="grid grid-cols-2 gap-4 mb-6">
            
            {/* VITALITÉ (Cœur du système) */}
            <div className="bg-zinc-900/50 border border-white/5 p-3 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Vitality</div>
                <div className="text-4xl font-black text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    {vitality}
                </div>
                {/* Visualiseur d'onde cardiaque */}
                <div className="w-full h-1 bg-zinc-800 mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 animate-[pulse_2s_ease-in-out_infinite]" style={{width: `${Math.min(vitality, 100)}%`}}></div>
                </div>
            </div>

            {/* CICATRICES (Mémoire du système) */}
            <div className="bg-zinc-900/50 border border-white/5 p-3 rounded-xl flex flex-col items-center justify-center">
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Scars</div>
                <div className="text-4xl font-black text-zinc-600">
                    {scars}
                </div>
                <div className="w-full h-1 bg-zinc-800 mt-2 rounded-full"></div>
            </div>
        </div>

        {/* FOOTER: RANG & STATUT */}
        <div className="border-t border-white/5 pt-4 flex justify-between items-center">
            <div className="flex flex-col">
                <span className="text-[9px] text-zinc-600 uppercase">Current Rank</span>
                <span className="text-xs font-bold text-purple-400 tracking-widest uppercase glow-text">
                    {getRank(vitality)}
                </span>
            </div>
            
            <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[9px] text-zinc-500 uppercase">Soul Synced</span>
            </div>
        </div>

      </div>
    </div>
  );
}
