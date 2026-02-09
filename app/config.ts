import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Geminzi Protocol',
  projectId: 'YOUR_PROJECT_ID', // Tu pourras mettre un vrai ID WalletConnect plus tard
  chains: [sepolia],
  ssr: true, // Server Side Rendering activé pour la stabilité
});
