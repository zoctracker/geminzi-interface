'use client';

import { WagmiConfig, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultConfig, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { useAccount, useReadContract } from 'wagmi';
import { SOUL_ADDRESS, SOUL_ABI } from './constants';

// COMPONENTS
import { Dashboard } from './components/Dashboard';
import { TheGate } from './components/TheGate'; // Nouveau composant
import { ConnectButton } from '@rainbow-me/rainbowkit';

// CONFIG (Identique à avant)
const config = getDefaultConfig({
  appName: 'Geminzi Interface',
  projectId: 'YOUR_PROJECT_ID',
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

// COMPOSANT DE GESTION D'ACCÈS
function AccessManager() {
  const { address, isConnected } = useAccount();

  // On lit la vitalité sur la blockchain
  const { data: soulData, isLoading } = useReadContract({
    address: SOUL_ADDRESS,
    abi: SOUL_ABI,
    functionName: 'getMySoul',
    args: [address],
  });

  const vitality = soulData ? Number(soulData[0]) : 0;

  // 1. SI PAS CONNECTÉ : Écran d'accueil simple
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

  // 2. SI CONNECTÉ MAIS PAS D'ÂME (VITALITÉ = 0) -> THE GATE
  // Note: Pour tester le Dashboard si tu as 0 vitalité, tu peux commenter cette condition temporairement.
  if (vitality === 0 && !isLoading) {
     return <TheGate />;
  }

  // 3. SI CONNECTÉ ET ÂME PRÉSENTE (VITALITÉ > 0) -> DASHBOARD
  return <Dashboard />;
}

export default function Page() {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: '#7b3fe4',
          accentColorForeground: 'white',
          borderRadius: 'small',
        })}>
          
          <AccessManager />
          
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
