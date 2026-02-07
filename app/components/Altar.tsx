'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI, SOUL_ADDRESS, SOUL_ABI } from '../constants';

export function Altar() {
  const { address } = useAccount();
  const [amount, setAmount] = useState('10');

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleApprove = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'approve',
      args: [SOUL_ADDRESS, parseEther(amount)],
    });
  };

  const handleSacrifice = () => {
    writeContract({
      address: SOUL_ADDRESS,
      abi: SOUL_ABI,
      functionName: 'sacrifice',
      args: [parseEther(amount)],
    });
  };

  return (
    <div className="w-full mt-4 mb-12 relative group font-mono">
      
      {/* CADRE JAUNE INDUSTRIEL */}
      <div className="relative bg-neutral-900 border border-yellow-600/50 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(234,179,8,0.1)]">
        
        {/* HAZARD STRIPES (Noir et Jaune) */}
        <div className="h-3 w-full" style={{backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 10px, #eab308 10px, #eab308 20px)'}}></div>

        <div className="p-6">
            
            {/* HEADER */}
            <div className="flex justify-between items-end mb-8 border-b border-yellow-500/20 pb-4">
                <div>
                    <h3 className="text-yellow-400 font-black text-xl tracking-tighter uppercase flex items-center gap-2">
                        <span className="animate-pulse">⚡</span> VITALITY FORGE
                    </h3>
                    <p className="text-[10px] text-yellow-600 uppercase tracking-widest mt-1">
                        High Voltage Area
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-xs text-neutral-500 uppercase">Rate</div>
                    <div className="text-yellow-400 font-bold">1:1 VIT</div>
                </div>
            </div>

            {/* INPUT JAUNE */}
            <div className="bg-black/50 p-4 rounded-lg border border-yellow-500/30 mb-6 flex items-center justify-between group-hover:border-yellow-500/60 transition-colors">
                <div className="flex flex-col">
                    <label className="text-[10px] text-yellow-700 uppercase tracking-widest mb-1">Fuel Input</label>
                    <div className="flex items-baseline gap-2">
                        <input 
                            type="number" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-transparent text-4xl font-black text-white w-32 focus:outline-none placeholder-neutral-700"
                            placeholder="0"
                        />
                        <span className="text-yellow-500 font-bold text-sm">GMNZ</span>
                    </div>
                </div>
            </div>

            {/* BOUTONS JAUNES */}
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={handleApprove}
                    disabled={isPending || isConfirming}
                    className="bg-neutral-800 hover:bg-neutral-700 text-yellow-500 hover:text-white py-4 rounded border border-yellow-500/10 uppercase text-xs font-bold tracking-widest transition-all"
                >
                    1. Unlock Valve
                </button>

                <button 
                    onClick={handleSacrifice}
                    disabled={isPending || isConfirming}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded shadow-[0_0_20px_rgba(234,179,8,0.4)] uppercase text-xs font-black tracking-widest transition-all active:scale-95 flex justify-center items-center gap-2"
                >
                    {isPending ? 'Processing...' : '⚡ IGNITE'}
                </button>
            </div>

            {isSuccess && (
                <div className="mt-4 text-center text-yellow-400 text-xs font-bold uppercase animate-pulse">
                    &gt; POWER SURGE CONFIRMED.
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
