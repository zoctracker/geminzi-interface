import GeminziABI from '../abis/GeminziOFT.json'; // Vérifie que ce chemin pointe bien vers ton JSON

export const CONTRACT_ABI = GeminziABI.abi;

// Le Mapping Intelligent : Quel contrat pour quel réseau ?
export const CONTRACT_ADDRESSES: Record<number, `0x${string}`> = {
  11155111: "0x5f2eA208e85d00D3322043bf558eE1035883C4d6", // Sepolia
  84532: "0xb146A8CAe83bF88007863A34b9537A855c918CC0"    // Base Sepolia
};

// Pour plus tard (le Bridge)
export const LZ_EIDS: Record<number, number> = {
  11155111: 40245, // De Sepolia vers Base
  84532: 40161     // De Base vers Sepolia
};
