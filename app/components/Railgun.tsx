'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants';

export function Railgun() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const { writeContract, data: hash, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleFire = () => {
    if (!recipient || !amount) return;
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'transfer',
      args: [recipient, parseEther(amount)],
    });
  };

  return (
    <div className="w-full mt-12 mb-8 font-mono group">
      
      {/* STRUCTURE DU CANON */}
      <div className="relative bg-zinc-900 border-x-4 border-zinc-700 p-1">
        
        {/* Lignes de visée décoratives */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500/50"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500/50"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500/50"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500/50"></div>

        <div className="bg-black border border-zinc-800 p-6 relative overflow-hidden">
            
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-2">
                <h3 className="text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    ASSET RAILGUN // MK-II
                </h3>
                <span className="text-[10px] text-zinc-600">READY TO FIRE</span>
            </div>

            {/* SYSTÈME DE VISÉE (INPUT ADRESSE) */}
            <div className="mb-4">
                <label className="text-[9px] text-red-500/80 uppercase tracking-widest mb-1 block">
                    [1] TARGET COORDINATES (ADDRESS)
                </label>
                <div className="relative group/input">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 text-lg">⊕</div>
                    <input 
                        type="text" 
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="0x..." 
                        className="w-full bg-zinc-900/50 border border-zinc-700 text-zinc-300 pl-10 pr-4 py-3 focus:outline-none focus:border-red-500/50 focus:bg-zinc-900 transition-all font-mono text-xs placeholder-zinc-700"
                    />
                    {/* Crosshair effect on focus */}
                    <div className="absolute inset-0 border border-red-500/0 group-focus-within/input:border-red-500/20 pointer-events-none transition-all"></div>
                </div>
            </div>

            {/* CHARGEMENT MUNITION (INPUT MONTANT) */}
            <div className="mb-6">
                <label className="text-[9px] text-red-500/80 uppercase tracking-widest mb-1 block">
                    [2] PAYLOAD (AMOUNT)
                </label>
                <div className="flex items-center bg-zinc-900/50 border border-zinc-700 px-4 py-2 focus-within:border-red-500/50 transition-colors">
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.0" 
                        className="bg-transparent text-2xl font-black text-white w-full focus:outline-none placeholder-zinc-800"
                    />
                    <span className="text-zinc-500 font-bold text-xs border-l border-zinc-700 pl-4 ml-2">
                        GMNZ
                    </span>
                </div>
            </div>

            {/* DÉCLENCHEUR (BOUTON) */}
            <button 
                onClick={handleFire}
                disabled={isPending || isConfirming || !recipient || !amount}
                className="w-full relative overflow-hidden bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white py-4 border-t-2 border-red-600/50 hover:border-red-500 transition-all active:scale-[0.99]"
            >
                {/* Scanline effect */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 animate-[scan_2s_linear_infinite]"></div>
                
                <span className="relative z-10 flex items-center justify-center gap-3 font-bold tracking-[0.2em] text-xs uppercase">
                    {isPending ? 'CHARGING COILS...' : isConfirming ? 'PROJECTILE IN FLIGHT...' : '>>> ENGAGE TARGET <<<'}
                </span>
            </button>

            {/* FEEDBACK */}
            {isSuccess && (
                <div className="mt-4 p-2 bg-green-900/20 border-l-2 border-green-500 text-[10px] text-green-500 font-mono">
                    IMPACT CONFIRMED. ASSETS TRANSFERRED.
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
