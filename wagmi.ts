import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, baseSepolia } from 'wagmi/chains'; // <--- AJOUTE baseSepolia

export const config = getDefaultConfig({
  appName: 'Geminzi Cockpit',
  projectId: 'YOUR_PROJECT_ID', // Laisse ça pour l'instant
  chains: [sepolia, baseSepolia], // <--- AJOUTE LE ICI
  ssr: true,
});
