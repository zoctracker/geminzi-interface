'use client';

import dynamic from 'next/dynamic';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Providers } from './providers';

// Import dynamique du Cerveau (Désactive le SSR pour ce composant spécifique)
const ProtocolCore = dynamic(
  () => import('./components/ProtocolCore').then((mod) => mod.ProtocolCore),
  { ssr: false }
);

export default function Page() {
  return (
    <ErrorBoundary>
      <Providers>
         <ProtocolCore />
      </Providers>
    </ErrorBoundary>
  );
}
