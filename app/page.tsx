'use client';

import { useState, useEffect } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

// Import du composant logique
import { ProtocolCore } from './components/ProtocolCore';

// CONFIGURATION ROBUSTE
const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export default function Page() {
  // ETAT DE MONTAGE (LA SÉCURITÉ)
  const [mounted, setMounted] = useState(false);

  // On attend que le navigateur soit prêt avant de charger quoi que ce soit
  useEffect(() => {
    setMounted(true);
  }, []);

  // Tant que ce n'est pas monté, on renvoie un écran noir vide (pas d'erreur possible)
  if (!mounted) {
      return <div className="min-h-screen bg-black" />;
  }

  // Une fois prêt, on lance le moteur
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: '#7b3fe4',
          accentColorForeground: 'white',
          borderRadius: 'small',
        })}>
          
          <ProtocolCore />
          
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
