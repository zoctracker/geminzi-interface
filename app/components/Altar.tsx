'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI, SOUL_ADDRESS, SOUL_ABI } from '../constants';

export function Altar() {
  const { address } = useAccount();
  const [amount, setAmount] = useState('10'); // Default Fuel

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // 1. OPEN VALVES (Approve)
  const handleApprove = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'approve',
      args: [SOUL_ADDRESS, parseEther(amount)],
    });
  };

  // 2. IGNITE REACTOR (Sacrifice)
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
      
      {/* CADRE INDUSTRIEL */}
      <div className="relative bg-neutral-900 border border-orange-900/50 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(234,88,12,0.1)]">
        
        {/* BANDEAU D'ALERTE (HAZARD STRIPES) */}
        <div className="h-2 w-full" style={{backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 10px, #ea580c 10px, #ea580c 20px)'}}></div>

        <div className="p-6">
            
            {/* HEADER DU RÉACTEUR */}
            <div className="flex justify-between items-end mb-8 border-b border-orange-500/20 pb-4">
                <div>
                    <h3 className="text-orange-500 font-black text-xl tracking-tighter uppercase flex items-center gap-2">
                        <span className="animate-pulse">🔥</span> VITALITY FORGE
                    </h3>
                    <p className="text-[10px] text-orange-700 uppercase tracking-widest mt-1">
                        System Status: <span className="text-orange-400">WAITING FOR FUEL</span>
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-xs text-neutral-500 uppercase">CONVERSION RATE</div>
                    <div className="text-orange-400 font-bold">1 GMNZ = +1 VIT</div>
                </div>
            </div>

            {/* CŒUR DU RÉACTEUR (INPUT) */}
            <div className="bg-black/50 p-4 rounded-lg border border-orange-500/30 mb-6 flex items-center justify-between group-hover:border-orange-500/60 transition-colors">
                <div className="flex flex-col">
                    <label className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Fuel Injection (Input)</label>
                    <div className="flex items-baseline gap-2">
                        <input 
                            type="number" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-transparent text-4xl font-black text-white w-32 focus:outline-none placeholder-neutral-700"
                            placeholder="0"
                        />
                        <span className="text-orange-600 font-bold text-sm">GMNZ</span>
                    </div>
                </div>
                {/* Visual Gauge */}
                <div className="hidden md:flex flex-col gap-1 items-end">
                     <div className="flex gap-1">
                        <div className={`w-2 h-6 rounded ${Number(amount) > 0 ? 'bg-orange-600' : 'bg-neutral-800'}`}></div>
                        <div className={`w-2 h-6 rounded ${Number(amount) >= 50 ? 'bg-orange-500' : 'bg-neutral-800'}`}></div>
                        <div className={`w-2 h-6 rounded ${Number(amount) >= 100 ? 'bg-orange-400' : 'bg-neutral-800'}`}></div>
                        <div className={`w-2 h-6 rounded ${Number(amount) >= 500 ? 'bg-red-500 animate-pulse' : 'bg-neutral-800'}`}></div>
                     </div>
                     <span className="text-[9px] text-neutral-600">PRESSURE</span>
                </div>
            </div>

            {/* PANNEAU DE COMMANDE (BOUTONS) */}
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={handleApprove}
                    disabled={isPending || isConfirming}
                    className="relative overflow-hidden bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white py-4 rounded border border-white/5 uppercase text-xs font-bold tracking-widest transition-all group/btn"
                >
                    <span className="relative z-10">1. Open Valves</span>
                    {/* Industrial Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500"></div>
                </button>

                <button 
                    onClick={handleSacrifice}
                    disabled={isPending || isConfirming}
                    className="relative overflow-hidden bg-gradient-to-b from-orange-600 to-red-700 hover:from-orange-500 hover:to-red-600 text-white py-4 rounded shadow-[0_0_20px_rgba(220,38,38,0.4)] uppercase text-xs font-bold tracking-widest transition-all active:scale-95"
                >
                    <span className="flex items-center justify-center gap-2">
                        {isPending ? (
                            <span className="animate-spin">⚙️</span>
                        ) : (
                            <span>☢️ IGNITE REACTOR</span>
                        )}
                    </span>
                </button>
            </div>

            {/* FEEDBACK LOOP */}
            {isSuccess && (
                <div className="mt-4 bg-green-900/20 border border-green-500/30 p-3 rounded text-center">
                    <p className="text-green-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                        &gt; FUSION COMPLETE. VITALITY INCREASED.
                    </p>
                </div>
            )}
            
            {error && (
                <div className="mt-4 bg-red-900/20 border border-red-500/30 p-3 rounded text-center">
                    <p className="text-red-500 text-[10px] font-mono break-all">
                        ERROR: {error.message.split('.')[0]}
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
