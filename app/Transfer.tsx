'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants';

export function Transfer() {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');

  const { data: hash, writeContract, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleTransfer = async () => {
    if (!to || !amount) return;
    
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'transfer',
      args: [to as `0x${string}`, parseEther(amount)],
    });
  };

  return (
    <div className="mt-8 w-full bg-zinc-900/50 p-6 rounded-xl border border-white/5">
      <h3 className="text-zinc-400 text-sm uppercase tracking-widest mb-4">Anoblir un Sujet</h3>
      
      <div className="flex flex-col gap-4">
        {/* Champ Adresse */}
        <input
          type="text"
          placeholder="Adresse du destinataire (0x...)"
          className="bg-black border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-purple-500 font-mono text-sm"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        {/* Champ Montant */}
        <div className="flex gap-2">
            <input
            type="number"
            placeholder="Montant"
            className="bg-black border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-purple-500 font-mono text-sm w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            />
            <button
            onClick={handleTransfer}
            disabled={isPending || isConfirming}
            className="bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 text-white px-6 rounded font-bold transition-all"
            >
            {isPending ? 'Signature...' : isConfirming ? 'Validation...' : 'ENVOYER'}
            </button>
        </div>

        {/* Feedback */}
        {hash && (
            <div className="mt-2 text-xs text-zinc-500 font-mono break-all">
                Hash: {hash}
            </div>
        )}
        {isSuccess && (
            <div className="mt-2 text-sm text-green-400 font-bold">
                ✅ Transfert confirmé ! Le sujet est anobli.
            </div>
        )}
      </div>
    </div>
  );
}