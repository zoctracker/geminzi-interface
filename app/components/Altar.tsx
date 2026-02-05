'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI, SOUL_ADDRESS, SOUL_ABI } from '../constants';

export function Altar() {
  const { address } = useAccount();
  const [amount, setAmount] = useState('10'); // Par défaut 10 GMNZ

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // 1. D'ABORD : Approuver les tokens (Donner la permission à l'Autel)
  const handleApprove = () => {
    writeContract({
      address: CONTRACT_ADDRESS, // Adresse du Token GMNZ
      abi: CONTRACT_ABI,
      functionName: 'approve',
      args: [SOUL_ADDRESS, parseEther(amount)],
    });
  };

  // 2. ENSUITE : Sacrifier (Brûler pour la Gloire)
  const handleSacrifice = () => {
    writeContract({
      address: SOUL_ADDRESS, // Adresse de l'Autel
      abi: SOUL_ABI,
      functionName: 'sacrifice',
      args: [parseEther(amount)],
    });
  };

  return (
    <div className="w-full mt-6 mb-8 relative group">
      {/* Effet de Sang/Feu en arrière-plan */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-900 via-orange-900 to-red-900 rounded-2xl opacity-30 blur group-hover:opacity-70 transition duration-1000"></div>
      
      <div className="relative bg-black border border-red-900/30 rounded-2xl p-4 md:p-6 overflow-hidden">
        
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-red-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                🔥 L'Autel du Sacrifice
            </h3>
            <span className="text-[10px] text-zinc-600 uppercase border border-zinc-800 px-2 py-0.5 rounded">
                Rate: 1 GMNZ = +1 Vitalité
            </span>
        </div>

        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 bg-zinc-900/50 p-2 rounded-lg border border-white/5">
                <span className="text-2xl">🩸</span>
                <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-transparent text-white font-mono text-xl w-full focus:outline-none"
                    placeholder="Montant"
                />
                <span className="text-xs font-bold text-zinc-500">GMNZ</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button 
                    onClick={handleApprove}
                    disabled={isPending || isConfirming}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wide transition border border-white/10"
                >
                    1. Autoriser
                </button>

                <button 
                    onClick={handleSacrifice}
                    disabled={isPending || isConfirming}
                    className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wide transition shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                >
                    {isPending ? 'Incantation...' : '2. Sacrifier'}
                </button>
            </div>

            {isSuccess && (
                <div className="text-center text-green-500 text-xs font-bold animate-pulse mt-2">
                    ✨ OFFRANDE ACCEPTÉE. VOTRE ÂME GRANDIT.
                </div>
            )}
            
            {error && (
                <div className="text-center text-red-500 text-[10px] mt-2 break-all">
                    Erreur: {error.message.split('.')[0]}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
