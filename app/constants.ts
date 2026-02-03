import GeminziABI from '../src/abis/GeminziOFT.json'; 
// Note: Si l'import ci-dessus échoue, essaie: import GeminziABI from '../abis/GeminziOFT.json';
// Cela dépend si ton dossier 'app' est dans 'src' ou à la racine.

export const CONTRACT_ABI = GeminziABI.abi;

// --- LE NOUVEAU SYSTÈME (OMNICHAIN) ---
export const CONTRACT_ADDRESSES: Record<number, `0x${string}`> = {
  11155111: "0x5f2eA208e85d00D3322043bf558eE1035883C4d6", // Sepolia (Prime)
  84532: "0xb146A8CAe83bF88007863A34b9537A855c918CC0"    // Base Sepolia (Miroir)
};

export const LZ_EIDS: Record<number, number> = {
  11155111: 40245,
  84532: 40161
};

// --- L'ANCIEN SYSTÈME (BACKUP) ---
// On garde cette ligne pour que Transfer.tsx et Vault.tsx ne plantent pas.
// Ils utiliseront Sepolia par défaut en attendant qu'on les mette à jour.
export const CONTRACT_ADDRESS = CONTRACT_ADDRESSES[11155111];
