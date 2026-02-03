'use client';

import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants';
import { formatEther } from 'viem';

export function Vault() {
  const { address } = useAccount();

  // APPEL CORRECT : Pas d'arguments, bon nom
  const { data: lockedBalance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getLockedFounderAmount',
  });

  // Si le contrat est vide ou qu'on ne peut pas lire, on cache
  if (!lockedBalance || lockedBalance === 0n) return null;

  // On vérifie si c'est le compte Fondateur (celui qui finit par 59bf) pour l'affichage "propriétaire"
  // Note: Pour l'instant, on l'affiche à tout le monde par transparence, c'est mieux pour la confiance.
  
  const formattedLocked = Number(formatEther(lockedBalance)).toLocaleString();

  return (
    <div className="mt-6 w-full p-1 rounded-xl bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/20">
      <div className="bg-black/90 rounded-lg p-6 flex flex-col items-center text-center">
        
        <div className="mb-2 text-2xl">🔒</div>
        
        <h3 className="text-yellow-500 text-xs uppercase tracking-[0.2em] font-bold mb-1">
          The Vault (Vesting)
        </h3>
        
        <p className="text-zinc-500 text-xs mb-4">
          Fonds sécurisés par Smart Contract
        </p>

        <div className="text-3xl font-mono text-yellow-100/90 tracking-tighter">
          {formattedLocked}
          <span className="text-sm text-yellow-600 ml-2">GMNZ</span>
        </div>

        <div className="mt-4 text-[10px] text-zinc-600 uppercase border border-zinc-800 rounded px-2 py-1">
          Libération Progressive sur 24 Mois
        </div>

      </div>
    </div>
  );
}
