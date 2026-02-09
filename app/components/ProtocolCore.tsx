'use client';

import { useAccount, useReadContract, useChainId } from 'wagmi';
import { SOUL_ADDRESS, SOUL_ABI } from '../constants';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';

// COMPONENTS
import { Dashboard } from './Dashboard';
import { TheGate } from './TheGate';

export function ProtocolCore() {
  const { isConnected, address, status } = useAccount();
  const chainId = useChainId();
  const [isReady, setIsReady] = useState(false);

   // AJOUTE CETTE SÉCURITÉ DE CONVERSION
  let vitality = 0;
  try {
      if (soulData && Array.isArray(soulData)) {
          // On force la conversion en Number ou String, car React DÉTESTE les BigInt
          vitality = Number(soulData[0]); 
      }
  } catch (err) {
      console.error("Parsing Error:", err);
  }

  // 1. DÉLAI DE SÉCURITÉ (Anti-Flash)
  useEffect(() => {
    // On attend que Wagmi soit stabilisé
    if (status !== 'reconnecting' && status !== 'connecting') {
        // Petit délai artificiel pour laisser le temps au DOM de respirer
        const timer = setTimeout(() => setIsReady(true), 500);
        return () => clearTimeout(timer);
    }
  }, [status]);

  // 2. SÉCURITÉ RÉSEAU AVANT LECTURE
  // Si on n'est pas sur Sepolia (11155111), on ne tente même pas de lire le contrat
  // (Sinon ça crash car l'adresse n'existe pas sur les autres réseaux)
  const isSepolia = chainId === 11155111;

  // 3. LECTURE SÉCURISÉE
  const { 
    data: soulData, 
    isLoading: isContractLoading,
    isError: isContractError,
    error: contractErrorDetails 
  } = useReadContract({
    address: SOUL_ADDRESS,
    abi: SOUL_ABI,
    functionName: 'getMySoul',
    args: address ? [address] : undefined,
    query: {
        // On ne tire que si : Connecté + Prêt + Bon Réseau
        enabled: !!address && isConnected && isReady && isSepolia, 
        retry: 1, 
    }
  });

  // --- RENDU ---

  // A. ÉCRAN DE CHARGEMENT INITIAL (Le temps que Wagmi se réveille)
  if (!isReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono">
         <div className="animate-pulse text-zinc-600 text-xs tracking-[0.2em]">
            INITIALIZING NEURAL LINK...
         </div>
      </div>
    );
  }

  // B. SI PAS CONNECTÉ
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

  // C. SI MAUVAIS RÉSEAU (Crucial pour éviter le crash)
  if (!isSepolia) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6 font-mono">
        <h2 className="text-red-500 font-bold mb-4">⚠️ WRONG NETWORK DETECTED</h2>
        <p className="text-zinc-400 text-sm mb-6">
            You are connected to Chain ID <span className="text-white">{chainId}</span>.
            <br/>The Protocol resides on <span className="text-purple-400">Sepolia (11155111)</span>.
        </p>
        <ConnectButton />
      </div>
    );
  }

  // D. SI ERREUR DE LECTURE DU CONTRAT (Kintsugi Mode : On montre la cicatrice)
  if (isContractError) {
      console.error("Contract Error:", contractErrorDetails);
      return (
          <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6 font-mono border border-red-900">
              <h2 className="text-orange-500 font-bold mb-2">⚡ DATA FRACTURE</h2>
              <p className="text-zinc-500 text-xs max-w-md mb-4">
                  Unable to read Soul Signature. This usually means the RPC is busy or the contract address is wrong.
              </p>
              <div className="bg-zinc-900 p-4 rounded text-left text-[10px] text-red-400 overflow-auto max-w-lg mb-4">
                  {contractErrorDetails?.message || "Unknown Error"}
              </div>
              <button onClick={() => window.location.reload()} className="text-white underline text-xs">
                  Retry Connection
              </button>
          </div>
      );
  }

  // E. CHARGEMENT DES DONNÉES
  if (isContractLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">
        <div className="animate-bounce text-xs tracking-widest text-purple-400">
            READING BLOCKCHAIN MEMORY...
        </div>
      </div>
    );
  }

  // F. SUCCÈS - ANALYSE DES DONNÉES
  // Conversion sécurisée (BigInt -> Number)
  let vitality = 0;
  try {
      if (soulData && Array.isArray(soulData)) {
          // Conversion explicite pour éviter le crash BigInt
          vitality = Number(soulData[0]); 
      }
  } catch (err) {
      console.error("Parsing Error:", err);
      // On continue avec vitalité 0 par sécurité
  }

  // G. ROUTAGE FINAL
  if (vitality === 0) {
     return <TheGate />;
  }

  return <Dashboard />;
}
