'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI, SOUL_ADDRESS, SOUL_ABI } from '../constants';

export function Altar() {
  const { address } = useAccount();
  const [amount, setAmount] = useState('10');

  // RATIO D'ETHERALITY (Simulation)
  // 10 GMNZ = 1 KG CO2 Compensé
  const co2Offset = Number(amount) ? (Number(amount) / 10).toFixed(1) : "0";

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
    <div className="w-full mt-4 mb-4 relative group font-mono">
      
      {/* CADRE JAUNE INDUSTRIEL */}
      <div className="relative bg-neutral-900 border border-yellow-600/50 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(234,179,8,0.1)]">
        
        {/* HAZARD STRIPES */}
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
                {/* STATUS INDICATOR */}
                <div className="flex flex-col items-end">
                    <div className="text-[10px] text-neutral-500 uppercase">System Status</div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-white">ETHERALITY LINKED</span>
                    </div>
                </div>
            </div>

            {/* INPUT SECTION (FUEL) */}
            <div className="bg-black/50 p-4 rounded-lg border border-yellow-500/30 mb-4 flex items-center justify-between group-hover:border-yellow-500/60 transition-colors">
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

            {/* IMPACT PREVIEW (NOUVEAU BLOC ETHERALITY) */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                {/* 1. Vitalité (Interne) */}
                <div className="bg-yellow-900/10 border border-yellow-500/20 p-2 rounded flex flex-col items-center justify-center">
                    <span className="text-[9px] text-yellow-600 uppercase">Soul Gain</span>
                    <span className="text-lg font-bold text-yellow-400">+{amount} VIT</span>
                </div>
                
                {/* 2. Impact Carbone (Externe) */}
                <div className="bg-green-900/10 border border-green-500/20 p-2 rounded flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 opacity-20">🌿</div>
                    <span className="text-[9px] text-green-600 uppercase">Real World Impact</span>
                    <span className="text-lg font-bold text-green-400">-{co2Offset} KG CO₂</span>
                </div>
            </div>

            {/* ACTION BUTTONS */}
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
                    className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black py-4 rounded shadow-[0_0_20px_rgba(234,179,8,0.4)] uppercase text-xs font-black tracking-widest transition-all active:scale-95 flex justify-center items-center gap-2"
                >
                    {isPending ? 'Processing...' : '⚡ IGNITE REACTOR'}
                </button>
            </div>

            {isSuccess && (
                <div className="mt-4 p-3 bg-green-900/20 border-l-2 border-green-500 text-[10px] text-green-400 font-mono text-center">
                    &gt; FUSION SUCCESSFUL. VITALITY +{amount} / CO₂ -{co2Offset}KG.
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
