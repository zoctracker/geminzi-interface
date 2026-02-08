'use client';

import { useState, useEffect } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

// NOS COMPOSANTS
import { ProtocolCore } from './components/ProtocolCore';
import { ErrorBoundary } from './components/ErrorBoundary';

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export default function Page() {
  // ETAT DE MONTAGE (SÉCURITÉ NAVIGATEUR)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Si le navigateur n'est pas prêt, on affiche un écran noir (pas d'erreur possible)
  if (!mounted) {
      return <div className="min-h-screen bg-black" />;
  }

  return (
    // 1. LE FILET DE SÉCURITÉ (Attrape les crashs)
    <ErrorBoundary>
      
      {/* 2. LES FOURNISSEURS WEB3 */}
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme({
            accentColor: '#7b3fe4',
            accentColorForeground: 'white',
            borderRadius: 'small',
          })}>
            
            {/* 3. LE CERVEAU DU PROTOCOLE */}
            <ProtocolCore />
            
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>

    </ErrorBoundary>
  );
}
