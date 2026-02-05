'use client';

import { useAccount, useBalance, useChainId } from 'wagmi';
import { formatEther } from 'viem';
import { CONTRACT_ADDRESSES } from '../constants';
import { Transfer } from './Transfer';
import { SoulCard } from './SoulCard'; // Import de la Trinité
import { Altar } from './Altar';

export function Dashboard() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  
  // Solde ETH (Gaz)
  const { data: ethBalance } = useBalance({ address });

  // Solde GMNZ (Token)
  const { data: tokenBalance } = useBalance({
    address,
    token: CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES],
  });

  if (!isConnected) {
    return (
      <div className="text-center text-zinc-500 animate-pulse mt-10 px-4">
        Connecte ton Wallet pour entrer dans la Matrice...
      </div>
    );
  }

  // Calcul du Vesting (Simulé pour l'instant)
  const rawBalance = tokenBalance ? Number(formatEther(tokenBalance.value)) : 0;
  const vestingAmount = 20202020;
  const freeBalance = Math.round(rawBalance - vestingAmount);

  return (
    <div className="w-full max-w-2xl mt-8 md:mt-12 p-1 rounded-2xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-xl border border-white/10 mx-auto">
      <div className="bg-black/80 rounded-xl p-2 md:p-8 text-center space-y-6 md:space-y-8">
        
        {/* SÉLECTEUR RÉSEAU (Optimisé Mobile) */}
        <div className="inline-flex items-center gap-2 bg-zinc-900/80 px-4 py-2 rounded-full border border-white/5 mb-4">
            <div className={`w-2 h-2 rounded-full ${chainId === 84532 ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                Réseau: <span className="text-white font-bold">{chainId === 84532 ? 'BASE' : 'SEPOLIA'}</span>
            </span>
        </div>

        {/* L'ÂME DE LA TRINITÉ (Visible sur Sepolia) */}
        {chainId === 11155111 && (
            <div className="animate-fade-in-up">
                <SoulCard />
                <Altar />
            </div>
        )}

        {/* STATUT */}
        <div>
          <h3 className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-2">Statut Identifié</h3>
          <div className="text-2xl md:text-3xl font-black text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)] flex items-center justify-center gap-2 flex-wrap">
             <span>🛡️</span> 
             <span>NOBLE FONDATEUR</span>
          </div>
        </div>

        {/* TRÉSORERIE */}
        <div className="py-4 border-y border-white/5">
           <h3 className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-1">Trésorerie Personnelle</h3>
           <div className="text-4xl md:text-6xl font-thin text-white font-mono tracking-tighter break-all">
             {freeBalance.toLocaleString('fr-FR')}
             <span className="text-lg md:text-2xl text-purple-500 ml-2 font-bold">GMNZ</span>
           </div>
           
           <div className="mt-2 text-xs text-zinc-600 font-mono bg-black/50 inline-block px-3 py-1 rounded border border-white/5 truncate max-w-[200px] md:max-w-full">
             {address}
           </div>
        </div>

        {/* VESTING */}
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4 md:p-6">
            <div className="flex justify-center mb-2 text-2xl">🔒</div>
            <h4 className="text-yellow-600 text-xs font-bold uppercase tracking-widest mb-1">The Vault (Vesting)</h4>
            <p className="text-xs text-yellow-600/60 mb-3">Fonds sécurisés par Smart Contract</p>
            <div className="text-2xl md:text-3xl font-mono text-yellow-500">
                {vestingAmount.toLocaleString('fr-FR')} <span className="text-sm">GMNZ</span>
            </div>
            <div className="mt-4 inline-block px-3 py-1 border border-white/10 rounded text-[10px] text-zinc-500 uppercase">
                Libération progressive sur 24 mois
            </div>
        </div>

        {/* COMPOSANT DE TRANSFERT */}
        <Transfer />

      </div>
    </div>
  );
}
