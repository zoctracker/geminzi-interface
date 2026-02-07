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
      
      {/* Structure Verte Tactique */}
      <div className="relative bg-zinc-900 border-x-4 border-emerald-900 p-1">
        
        {/* Viseurs Verts */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-500"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-500"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500"></div>

        <div className="bg-black border border-emerald-900/50 p-6 relative overflow-hidden">
            
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6 border-b border-emerald-900/30 pb-2">
                <h3 className="text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_lime]"></span>
                    TARGETING SYSTEM
                </h3>
                <span className="text-[10px] text-emerald-700">ONLINE</span>
            </div>

            {/* INPUT CIBLE */}
            <div className="mb-4">
                <label className="text-[9px] text-emerald-600 uppercase tracking-widest mb-1 block">
                    Target Address
                </label>
                <div className="relative group/input">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 text-lg">⊕</div>
                    <input 
                        type="text" 
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="0x..." 
                        className="w-full bg-emerald-950/10 border border-emerald-900 text-emerald-100 pl-10 pr-4 py-3 focus:outline-none focus:border-emerald-500 focus:bg-emerald-950/30 transition-all font-mono text-xs placeholder-emerald-900"
                    />
                </div>
            </div>

            {/* INPUT MONTANT */}
            <div className="mb-6">
                <label className="text-[9px] text-emerald-600 uppercase tracking-widest mb-1 block">
                    Asset Amount
                </label>
                <div className="flex items-center bg-emerald-950/10 border border-emerald-900 px-4 py-2 focus-within:border-emerald-500 transition-colors">
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.0" 
                        className="bg-transparent text-2xl font-black text-white w-full focus:outline-none placeholder-emerald-900"
                    />
                    <span className="text-emerald-600 font-bold text-xs border-l border-emerald-900 pl-4 ml-2">GMNZ</span>
                </div>
            </div>

            {/* BOUTON DE TIR VERT */}
            <button 
                onClick={handleFire}
                disabled={isPending || isConfirming || !recipient || !amount}
                className="w-full bg-emerald-900/50 hover:bg-emerald-800 text-emerald-400 hover:text-white py-4 border border-emerald-500/50 hover:border-emerald-400 transition-all active:scale-[0.99] font-bold tracking-[0.2em] text-xs uppercase shadow-[0_0_15px_rgba(16,185,129,0.1)]"
            >
                {isPending ? 'CALIBRATING...' : '>>> EXECUTE TRANSFER <<<'}
            </button>

            {isSuccess && (
                <div className="mt-4 p-2 bg-emerald-900/20 border-l-2 border-emerald-500 text-[10px] text-emerald-400 font-mono">
                    TARGET HIT. ASSETS TRANSFERRED.
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
