'use client';

import { useState, useEffect } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme, ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { useAccount, useReadContract } from 'wagmi';
import { SOUL_ADDRESS, SOUL_ABI } from './constants';

// COMPONENTS
import { Dashboard } from './components/Dashboard';
import { TheGate } from './components/TheGate';

// CONFIGURATION WAGMI
const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true, // Server Side Rendering activé pour éviter les mismatches
});

const queryClient = new QueryClient();

// COMPOSANT LOGIQUE (INTERNE)
function AccessManager() {
  const { isConnected, address } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  // HYDRATION FIX: On attend que le composant soit monté côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lecture de la Vitalité
  const { data: soulData, isLoading } = useReadContract({
    address: SOUL_ADDRESS,
    abi: SOUL_ABI,
    functionName: 'getMySoul',
    args: [address],
  });

  const vitality = soulData ? Number(soulData[0]) : 0;

  // 0. SI PAS ENCORE MONTÉ (Page blanche rapide pour éviter le crash)
  if (!isMounted) return null;

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
        
        {/* BOUTON RAINBOW KIT */}
        <ConnectButton.Custom>
          {({ openConnectModal, mounted }) => {
            return (
              <button 
                onClick={openConnectModal}
                className="bg-white text-black px-6 py-3 rounded font-bold uppercase tracking-widest hover:scale-105 transition-transform"
              >
                {mounted ? 'Initialize Link' : 'Loading...'}
              </button>
            );
          }}
        </ConnectButton.Custom>

        <p className="mt-8 text-[10px] text-zinc-600 uppercase tracking-widest">
            Protocol v1.0 // Sepolia Network
        </p>
      </div>
    );
  }

  // 2. SI CONNECTÉ ET ÂME VIERGE (VITALITÉ = 0) -> THE GATE
  // (NOTE: Si tu veux tester le Dashboard même avec 0 vitalité, commente les 3 lignes ci-dessous)
  if (vitality === 0 && !isLoading) {
     return <TheGate />;
  }

  // 3. SI MEMBRE CONFIRMÉ -> DASHBOARD
  return <Dashboard />;
}

export default function Page() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: '#7b3fe4',
          accentColorForeground: 'white',
          borderRadius: 'small',
        })}>
          <AccessManager />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
