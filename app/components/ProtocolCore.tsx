'use client';

import { useAccount, useReadContract } from 'wagmi';
import { SOUL_ADDRESS, SOUL_ABI } from '../constants';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// COMPONENTS
import { Dashboard } from './Dashboard';
import { TheGate } from './TheGate';

export function ProtocolCore() {
  const { isConnected, address } = useAccount();

  // Lecture de la Vitalité
  const { data: soulData, isLoading } = useReadContract({
    address: SOUL_ADDRESS,
    abi: SOUL_ABI,
    functionName: 'getMySoul',
    args: [address],
  });

  // Sécurisation de la lecture des données (évite les crashs si undefined)
  const vitality = soulData && Array.isArray(soulData) ? Number(soulData[0]) : 0;

  // 1. SI PAS CONNECTÉ
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono p-4">
        <div className="mb-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 animate-pulse"></div>
            <div className="relative text-6xl md:text-8xl">💠</div>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 tracking-tighter mb-8">
            GEMINZI
        </h1>
        
        <ConnectButton />

        <p className="mt-8 text-[10px] text-zinc-600 uppercase tracking-widest">
            Protocol v1.0 // Sepolia Network
        </p>
      </div>
    );
  }

  // 2. CHARGEMENT
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">
        <div className="animate-pulse text-xs tracking-widest">SCANNING SOUL SIGNATURE...</div>
      </div>
    );
  }

  // 3. SI CONNECTÉ MAIS PAS D'ÂME (VITALITÉ = 0) -> THE GATE
  if (vitality === 0) {
     return <TheGate />;
  }

  // 4. SI MEMBRE CONFIRMÉ -> DASHBOARD
  return <Dashboard />;
}
