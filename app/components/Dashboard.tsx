'use client';

import { useAccount, useBalance, useChainId } from 'wagmi';
import { formatEther } from 'viem';
import { CONTRACT_ADDRESSES } from '../constants';
import { SoulCard } from './SoulCard';
import { Prophecy } from './Prophecy';
import { MoralAI } from './MoralAI';
import { Altar } from './Altar';       // La Forge
import { CryoVault } from './CryoVault'; // Le Vesting
import { Railgun } from './Railgun';     // Le Transfert
import { AccessControl } from './AccessControl'; // La Colonie

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
      <div className="text-center text-zinc-500 animate-pulse mt-10 px-4 font-mono text-sm">
        > WAITING FOR NEURAL LINK... (Connect Wallet)
      </div>
    );
  }

  // SÉCURITÉ RÉSEAU : Si on n'est pas sur Sepolia (11155111), on bloque tout.
  if (chainId !== 11155111) {
      return (
          <div className="w-full max-w-2xl mx-auto mt-12 p-6 bg-red-950/30 border border-red-500 rounded-xl text-center font-mono">
              <h3 className="text-red-500 font-bold text-xl mb-2">⚠️ NETWORK MISMATCH</h3>
              <p className="text-red-400 text-xs mb-4">
                  You are currently on Chain ID: {chainId}.<br/>
                  Target Protocol requires: SEPOLIA (11155111).
              </p>
              <div className="inline-block bg-red-900/50 px-4 py-2 rounded text-xs text-white">
                  PLEASE SWITCH NETWORK IN WALLET
              </div>
          </div>
      );
  }

  // Calcul du Vesting
  const rawBalance = tokenBalance ? Number(formatEther(tokenBalance.value)) : 0;
  const vestingAmount = 20202020;
  const freeBalance = Math.round(rawBalance - vestingAmount); // Ajuster selon ta logique réelle

  return (
    <div className="w-full max-w-2xl mt-8 md:mt-12 p-1 rounded-2xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-xl border border-white/10 mx-auto">
      <div className="bg-black/80 rounded-xl p-2 md:p-8 text-center space-y-2">
        
        {/* HEADER RÉSEAU */}
        <div className="inline-flex items-center gap-2 bg-zinc-900/80 px-4 py-2 rounded-full border border-white/5 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                System: <span className="text-white font-bold">ONLINE (SEPOLIA)</span>
            </span>
        </div>

        {/* 1. LA MENACE (ROUGE) */}
        <div className="animate-fade-in">
           <Prophecy />
        </div>

        {/* 2. LE CERVEAU (IA) */}
        <div className="animate-fade-in delay-100">
            <MoralAI />
        </div>

        {/* 3. L'IDENTITÉ (VIOLET) */}
        <div className="animate-fade-in delay-200">
            <SoulCard />
        </div>

        {/* 4. LA FORGE (JAUNE) */}
        <div className="animate-fade-in delay-300">
            <Altar />
        </div>

        {/* 5. LE TRANSFERT (VERT) */}
        <div className="animate-fade-in delay-400">
            <Railgun />
        </div>

        {/* 6. LA RÉSERVE (BLEU) */}
        <div className="animate-fade-in delay-500">
            <CryoVault />
        </div>
        
        {/* 7. LA COLONIE (OR) */}
        <div className="animate-fade-in delay-700">
            <AccessControl />
        </div>

      </div>
    </div>
  );
}
