'use client';

import { useAccount, useReadContract, useChainId } from 'wagmi'; // <--- Ajout de useChainId
import { CONTRACT_ADDRESSES, CONTRACT_ABI } from '../constants'; // <--- Import du Mapping (Pluriel)
import { formatEther } from 'viem';
import { Transfer } from './Transfer';
import { Vault } from './Vault';

export function Dashboard() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId(); // <--- On récupère l'ID du réseau actuel

  // Sélection dynamique de l'adresse selon le réseau
  const currentContractAddress = CONTRACT_ADDRESSES[chainId];

  const { data: balance, isLoading } = useReadContract({
    address: currentContractAddress, // <--- C'est ici que ça change tout !
    abi: CONTRACT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!currentContractAddress, // Ne cherche que si on a une adresse valide
    },
  });

  if (!isConnected) return null;

  // Si on est sur un réseau non supporté (pas dans notre liste)
  if (!currentContractAddress) {
    return (
      <div className="mt-12 p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-200">
        ⚠️ Réseau non supporté. Veuillez passer sur Sepolia ou Base Sepolia.
      </div>
    );
  }

  const formattedBalance = balance ? Number(formatEther(balance)).toLocaleString() : '0';
  const isNoble = balance && balance > 0n;

  return (
    <div className="w-full max-w-2xl mt-12 p-1 rounded-2xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-xl border border-white/10">
      <div className="bg-black/80 rounded-xl p-8 text-center space-y-6">

        {/* INDICATEUR DE RÉSEAU (Nouveau) */}
        <div className="absolute top-4 right-4">
            <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                Réseau: {chainId === 84532 ? '🔵 BASE' : '⚫ SEPOLIA'}
            </span>
        </div>

        {/* STATUT */}
        <div>
          <h2 className="text-zinc-400 text-sm uppercase tracking-widest mb-2">Statut Identifié</h2>
          <div className={`text-3xl font-bold ${isNoble ? 'text-green-400' : 'text-red-500'}`}>
            {isLoading ? 'Analyse...' : (isNoble ? '🛡️ NOBLE FONDATEUR' : 'GHOST')}
          </div>
        </div>

        <div className="h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

        {/* SOLDE LIQUIDE */}
        <div>
          <h2 className="text-zinc-400 text-sm uppercase tracking-widest mb-2">Trésorerie Personnelle</h2>
          <div className="text-5xl font-mono text-white tracking-tighter">
            {isLoading ? '...' : formattedBalance}
            <span className="text-lg text-purple-500 ml-2">GMNZ</span>
          </div>
        </div>

        <div className="pt-4">
          <code className="bg-zinc-900 px-3 py-1 rounded text-xs text-zinc-500">
            {address?.slice(0,6)}...{address?.slice(-4)}
          </code>
        </div>

        {/* LE COFFRE-FORT (Vesting) */}
        <Vault />

        {/* SECTION DE TRANSFERT */}
        {isNoble && <Transfer />}

      </div>
    </div>
  );
}
