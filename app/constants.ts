// Imports des ABIs (Manuels d'instruction)
// Assure-toi que les fichiers JSON existent bien dans src/abis/
import GeminziABI from '../src/abis/GeminziOFT.json';
import GeminziSoulABI from '../src/abis/GeminziSoul.json';

export const CONTRACT_ABI = GeminziABI.abi;
export const SOUL_ABI = GeminziSoulABI.abi;

// 1. GEMINZI TOKEN (L'Argent)
export const CONTRACT_ADDRESSES: Record<number, `0x${string}`> = {
  11155111: "0x5f2eA208e85d00D3322043bf558eE1035883C4d6", // Sepolia
  84532: "0xb146A8CAe83bF88007863A34b9537A855c918CC0"    // Base
};

// 2. GEMINZI SOUL (L'Identité)
// C'est cette ligne qui manquait ou qui était mal exportée !
export const SOUL_ADDRESS: `0x${string}` = "0xEC1C5d51e6080d7b10DaF319591407632e750C11";

// 3. LAYERZERO (Le Pont)
export const LZ_EIDS: Record<number, number> = {
  11155111: 40245,
  84532: 40161
};

// 4. FALLBACK (Sécurité pour les vieux composants)
export const CONTRACT_ADDRESS = CONTRACT_ADDRESSES[11155111];
