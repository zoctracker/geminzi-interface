'use client';

import dynamic from 'next/dynamic';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

// CONFIGURATION WAGMI
const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true, 
});

const queryClient = new QueryClient();

// IMPORT DYNAMIQUE (L'ARME ABSOLUE CONTRE L'ERREUR D'HYDRATATION)
// On dit à Next.js : "Charge ce composant uniquement côté client, jamais sur le serveur."
const ProtocolCore = dynamic(
  () => import('./components/ProtocolCore').then((mod) => mod.ProtocolCore),
  { ssr: false }
);

export default function Page() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: '#7b3fe4',
          accentColorForeground: 'white',
          borderRadius: 'small',
        })}>
          
          {/* C'est ici que la magie opère : Chargement Client Uniquement */}
          <ProtocolCore />
          
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
