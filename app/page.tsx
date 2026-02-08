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

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

function AccessManager() {
  const { isConnected, address } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  // ANTI-CRASH : On force l'attente du montage client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: soulData, isLoading } = useReadContract({
    address: SOUL_ADDRESS,
    abi: SOUL_ABI,
    functionName: 'getMySoul',
    args: [address],
  });

  const vitality = soulData ? Number(soulData[0]) : 0;

  // Si le navigateur n'est pas prêt, on renvoie une div vide (évite le crash)
  if (!isMounted) return null;

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

  // LOGIQUE D'ACCÈS
  // Si Vitalité = 0 -> THE GATE (Le Choix)
  if (vitality === 0 && !isLoading) {
     return <TheGate />;
  }

  // Si Vitalité > 0 -> DASHBOARD (Le Maître)
  return <Dashboard />;
}

export default function Page() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({ accentColor: '#7b3fe4' })}>
          <AccessManager />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
