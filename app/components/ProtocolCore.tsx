'use client';

import { useAccount, useReadContract } from 'wagmi';
import { SOUL_ADDRESS, SOUL_ABI } from '../constants';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// COMPONENTS
import { Dashboard } from './Dashboard';
import { TheGate } from './TheGate';
import { useState, useEffect } from 'react';

export function ProtocolCore() {
  const { isConnected, address, status } = useAccount();
  const [isReady, setIsReady] = useState(false);

  // Sécurité supplémentaire : on attend que Wagmi ait fini son initialisation interne
  useEffect(() => {
    if (status !== 'reconnecting' && status !== 'connecting') {
        setIsReady(true);
    }
  }, [status]);

  // LECTURE SÉCURISÉE (LE DISJONCTEUR)
  const { data: soulData, isLoading: isContractLoading } = useReadContract({
    address: SOUL_ADDRESS,
    abi: SOUL_ABI,
    functionName: 'getMySoul',
    args: address ? [address] : undefined, // On ne passe l'argument que s'il existe
    query: {
        enabled: !!address && isConnected, // NE PAS TIRER SI PAS CONNECTÉ
        retry: false, // Ne pas spammer si ça échoue
    }
  });

  // Sécurisation de la donnée
  const vitality = soulData && Array.isArray(soulData) ? Number(soulData[0]) : 0;

  // 1. SI WAGMI N'EST PAS ENCORE PRÊT (État transitoire)
  if (!isReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono">
         <div className="animate-pulse text-zinc-500 text-xs">INITIALIZING LINK...</div>
      </div>
    );
  }

  // 2. SI PAS CONNECTÉ
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

  // 3. CHARGEMENT DU CONTRAT
  if (isContractLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">
        <div className="animate-pulse text-xs tracking-widest text-purple-400">READING SOUL SIGNATURE...</div>
      </div>
    );
  }

  // 4. ROUTAGE (GATE vs DASHBOARD)
  if (vitality === 0) {
     return <TheGate />;
  }

  return <Dashboard />;
}
