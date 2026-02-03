'use client';

import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useChainId, useAccount, usePublicClient } from 'wagmi';
import { parseEther, pad, encodePacked } from 'viem'; // On a besoin de pad pour le format Bytes32
import { CONTRACT_ADDRESSES, CONTRACT_ABI, LZ_EIDS } from '../constants';

export function Transfer() {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState<'LOCAL' | 'BRIDGE'>('LOCAL'); // Le Switch
  const [isQuoting, setIsQuoting] = useState(false); // État de chargement du devis

  const chainId = useChainId();
  const { address } = useAccount();
  const publicClient = usePublicClient(); // Pour lire le devis manuellement
  
  // Récupération dynamique des adresses
  const currentContract = CONTRACT_ADDRESSES[chainId];
  const targetEid = LZ_EIDS[chainId];

  const { data: hash, writeContract, isPending, error: writeError } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // --- LOGIQUE DE TRANSFERT LOCAL ---
  const handleLocalTransfer = () => {
    if (!to || !amount || !currentContract) return;
    
    writeContract({
      address: currentContract,
      abi: CONTRACT_ABI,
      functionName: 'transfer',
      args: [to as `0x${string}`, parseEther(amount)],
    });
  };

  // --- LOGIQUE DE BRIDGE (TÉLÉPORTATION) ---
  const handleBridge = async () => {
    if (!amount || !currentContract || !publicClient || !address) return;

    try {
      setIsQuoting(true);

      // 1. Préparer les paramètres LayerZero
      const amountBigInt = parseEther(amount);
      const recipientBytes32 = pad(address, { size: 32 }); // On s'envoie à soi-même sur l'autre chaine par défaut

      // 2. Options de Gaz (Standard LZ V2 : 200k gaz pour l'exécution à l'arrivée)
      // C'est du "Low Level" hex encoding pour éviter d'importer la lourde librairie LZ dans le frontend
      // Type 3 (0003) + 200k gaz (00030d40)
      const options = "0x00030100110100000000000000000000000000030d40"; 

      const sendParam = {
        dstEid: targetEid,
        to: recipientBytes32,
        amountLD: amountBigInt,
        minAmountLD: amountBigInt, // Pas de slippage pour l'instant
        extraOptions: options,
        composeMsg: "0x",
        oftCmd: "0x"
      };

      // 3. Demander le Devis (Quote)
      // On lit le contrat directement sans passer par un hook pour avoir la data fraîche
      const messagingFee = await publicClient.readContract({
        address: currentContract,
        abi: CONTRACT_ABI,
        functionName: 'quoteSend',
        args: [sendParam, false]
      }) as any; // Cast rapide car la structure retournée est complexe

      console.log("Devis reçu:", messagingFee);

      // 4. Lancer la transaction avec le paiement (Value)
      writeContract({
        address: currentContract,
        abi: CONTRACT_ABI,
        functionName: 'send',
        args: [sendParam, messagingFee, address], // args: [param, fee, refundAddr]
        value: messagingFee.nativeFee // On paie en ETH ce que le devis a demandé
      });

    } catch (error) {
      console.error("Erreur Bridge:", error);
      alert("Erreur lors de l'estimation du pont. Vérifie la console.");
    } finally {
      setIsQuoting(false);
    }
  };

  return (
    <div className="mt-8 w-full bg-zinc-900/50 p-6 rounded-xl border border-white/5 relative overflow-hidden">
      
      {/* TABS DE SÉLECTION */}
      <div className="flex border-b border-zinc-800 mb-6">
        <button
          onClick={() => setMode('LOCAL')}
          className={`pb-2 px-4 text-sm font-bold tracking-widest transition-colors ${mode === 'LOCAL' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-zinc-600 hover:text-zinc-400'}`}
        >
          LOCAL TRANSFER
        </button>
        <button
          onClick={() => setMode('BRIDGE')}
          className={`pb-2 px-4 text-sm font-bold tracking-widest transition-colors ${mode === 'BRIDGE' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-zinc-600 hover:text-zinc-400'}`}
        >
          OMNICHAIN BRIDGE
        </button>
      </div>

      <div className="flex flex-col gap-4">
        
        {/* INPUTS */}
        {mode === 'LOCAL' ? (
           <input
           type="text"
           placeholder="Adresse destinataire (0x...)"
           className="bg-black border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-purple-500 font-mono text-sm"
           value={to}
           onChange={(e) => setTo(e.target.value)}
         />
        ) : (
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-200">
            ℹ️ <strong>Mode Téléportation :</strong> Les fonds seront envoyés vers votre même adresse sur 
            {chainId === 84532 ? ' SEPOLIA' : ' BASE'}.
          </div>
        )}

        <div className="flex gap-2">
            <input
            type="number"
            placeholder="Montant GMNZ"
            className="bg-black border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-purple-500 font-mono text-sm w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            />
            
            <button
            onClick={mode === 'LOCAL' ? handleLocalTransfer : handleBridge}
            disabled={isPending || isConfirming || isQuoting}
            className={`px-6 rounded font-bold transition-all text-white min-w-[140px]
              ${mode === 'LOCAL' 
                ? 'bg-purple-600 hover:bg-purple-500' 
                : 'bg-blue-600 hover:bg-blue-500'
              } disabled:bg-zinc-700 disabled:cursor-not-allowed`}
            >
            {isPending ? 'Signature...' 
              : isConfirming ? 'Validation...' 
              : isQuoting ? 'Calcul...' 
              : mode === 'LOCAL' ? 'ENVOYER' : 'TELEPORTER'}
            </button>
        </div>

        {/* FEEDBACK & ERREURS */}
        {writeError && (
          <div className="mt-2 text-xs text-red-500 bg-red-900/20 p-2 rounded border border-red-900">
            Erreur: {writeError.message.split('\n')[0]}
          </div>
        )}

        {hash && (
            <div className="mt-4 p-3 bg-zinc-950 rounded border border-zinc-800">
                <div className="text-xs text-zinc-500 uppercase mb-1">Transaction Hash</div>
                <a 
                  href={chainId === 84532 ? `https://sepolia.basescan.org/tx/${hash}` : `https://sepolia.etherscan.io/tx/${hash}`}
                  target="_blank"
                  className="text-xs text-purple-400 font-mono hover:underline break-all"
                >
                  {hash}
                </a>
                {mode === 'BRIDGE' && (
                  <div className="mt-2 text-xs text-blue-400">
                    👉 <a href={`https://testnet.layerzeroscan.com/tx/${hash}`} target="_blank" className="underline">Suivre sur LayerZeroScan</a>
                  </div>
                )}
            </div>
        )}

        {isSuccess && (
            <div className="mt-2 text-sm text-green-400 font-bold flex items-center gap-2">
                ✅ Opération confirmée !
            </div>
        )}
      </div>
    </div>
  );
}
