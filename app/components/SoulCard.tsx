'use client';

import { useAccount, useReadContract } from 'wagmi';
import { SOUL_ADDRESS, SOUL_ABI } from '../constants';

export function SoulCard() {
  const { address } = useAccount();

  // Lecture de l'Âme (ID 0 pour l'instant pour tester, ou par tokenId si on avait un mapping address->id)
  // Pour simplifier, supposons que tu es l'ID 0 (Patient Zéro).
  // Dans une V2, on cherchera l'ID via "balanceOf + tokenOfOwnerByIndex".
  
  const { data: soulData, isLoading } = useReadContract({
    address: SOUL_ADDRESS,
    abi: SOUL_ABI,
    functionName: 'getSoul',
    args: [0n], // On regarde l'ID #0 (La Trinité)
    query: {
      refetchInterval: 5000, // Mise à jour live toutes les 5s
    }
  });

  if (isLoading || !soulData) return null;

  // soulData est un tableau [vitality, scars]
  const vitality = Number(soulData[0]);
  const scars = Number(soulData[1]);

  return (
    <div className="w-full mb-8 relative group">
      {/* Effet de Halo Doré pour la Trinité */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 via-purple-600 to-blue-600 rounded-2xl opacity-50 blur group-hover:opacity-100 transition duration-1000"></div>
      
      <div className="relative bg-black rounded-2xl p-6 border border-white/10 flex items-center justify-between overflow-hidden">
        
        {/* Arrière-plan subtil */}
        <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-serif text-white select-none">
          Ω
        </div>

        <div>
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 font-bold tracking-widest text-xs uppercase mb-1">
            Geminzi Identity // ORIGIN
          </h3>
          <div className="text-4xl font-bold text-white mb-2">
            PATIENT #0
          </div>
          <div className="flex gap-4 text-sm font-mono">
             <span className="text-green-400 flex items-center gap-1">
               ⚡ VITALITÉ: {vitality}
             </span>
             <span className="text-red-400 flex items-center gap-1">
               ❌ CICATRICES: {scars}
             </span>
          </div>
        </div>

        {/* Représentation Visuelle de l'Arbre (Simplifiée) */}
        <div className="h-16 w-16 rounded-full border-2 border-yellow-500/30 flex items-center justify-center bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
           <span className="text-2xl">🧬</span>
        </div>
      </div>
    </div>
  );
}
