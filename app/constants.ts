// ADRESSE DU CONTRAT DÉPLOYÉ
export const SOUL_ADDRESS = '0x15bAafA6f754F9Fddf0133B525C643da18272230';

// ADRESSE DU DOMINATEUR (TOI)
// C'est l'adresse qui servira de "Parrain par défaut" pour tes premiers tests.
// Remplace ceci par ton adresse de wallet (0x53acc...) si tu veux être le parrain.
export const DOMINATOR_ADDRESS = '0x53acc98eD6fb58412c981F504dC8E8239b6559bf'; 

export const SOUL_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "_mentorAddress", "type": "address" },
      { "internalType": "uint8", "name": "_archetype", "type": "uint8" }
    ],
    "name": "manifestSoul",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sacrifice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }],
    "name": "getMySoul",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint8", "name": "", "type": "uint8" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" },
      { "indexed": false, "internalType": "uint8", "name": "archetype", "type": "uint8" },
      { "indexed": false, "internalType": "address", "name": "mentor", "type": "address" }
    ],
    "name": "SoulBorn",
    "type": "event"
  }
] as const;

// Pour la compatibilité avec le reste du code (si utilisé ailleurs)
export const CONTRACT_ADDRESS = SOUL_ADDRESS;
export const CONTRACT_ABI = SOUL_ABI;
export const CONTRACT_ADDRESSES = { 11155111: SOUL_ADDRESS };
