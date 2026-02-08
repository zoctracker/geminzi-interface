'use client';

import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { SOUL_ADDRESS, SOUL_ABI } from '../constants';

export function TheGate() {
  const { address } = useAccount();
  const [step, setStep] = useState<'CODE' | 'CHOICE' | 'MINTING'>('CODE');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

// VALIDATION DU CODE
  const handleCodeSubmit = () => {
    // Nettoyage de l'entrée (majuscules forcées, espaces retirés)
    const cleanCode = code.trim().toUpperCase();
    
    // Code Maître pour tes tests : "TRINITY" suffit maintenant
    if (cleanCode.startsWith('TRINITY')) {
        setStep('CHOICE');
        setError('');
    } else {
        setError('ACCESS DENIED: INVALID VECTOR.');
    }
  };

  // MINTING (Simulation pour l'UI - À connecter au contrat plus tard)
  const handleMint = (archetype: 'WIND' | 'CLOUD') => {
    setStep('MINTING');
    // Ici on appellerait le contrat "mint(archetype)"
    // Pour l'instant, on simule un chargement infini car on n'a pas la fonction mint
    console.log(`MINTING ARCHETYPE: ${archetype}`);
  };

  if (step === 'CODE') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono p-4">
        <div className="w-full max-w-md space-y-8">
            {/* LOGO / HEADER */}
            <div className="text-center space-y-2">
                <div className="text-6xl mb-4 animate-pulse">⛩️</div>
                <h1 className="text-zinc-500 text-xs tracking-[0.5em] uppercase">
                    Geminzi Protocol // The Gate
                </h1>
            </div>

            {/* TERMINAL INPUT */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-black border border-zinc-800 p-8 rounded-lg">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4 block">
                        Enter Trinity Vector Code
                    </label>
                    <input 
                        type="text" 
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        onKeyDown={(e) => e.key === 'Enter' && handleCodeSubmit()}
                        placeholder="TRINITY-XXXX-XXXX"
                        className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-amber-500 text-center text-2xl md:text-3xl font-bold text-white placeholder-zinc-800 focus:outline-none py-2 transition-colors uppercase"
                    />
                    
                    {error && (
                        <div className="mt-4 text-center text-red-500 text-xs font-bold animate-pulse">
                            &gt; {error}
                        </div>
                    )}

                    <button 
                        onClick={handleCodeSubmit}
                        className="w-full mt-8 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white py-4 text-xs font-bold tracking-widest uppercase transition-all border border-zinc-800 hover:border-zinc-600"
                    >
                        Authenticate
                    </button>
                </div>
            </div>
            
            <p className="text-center text-[9px] text-zinc-700">
                "Only those invited by the Dominator may enter."
            </p>
        </div>
      </div>
    );
  }

  if (step === 'CHOICE') {
    return (
      <div className="min-h-screen font-mono flex flex-col md:flex-row">
        
        {/* CÔTÉ GAUCHE : LE VENT (WIND) */}
        <div 
            onClick={() => handleMint('WIND')}
            className="w-full md:w-1/2 h-[50vh] md:h-screen bg-zinc-200 hover:bg-white text-zinc-900 flex flex-col items-center justify-center p-8 cursor-pointer transition-all duration-500 group relative overflow-hidden"
        >
            {/* Effet de Vent (Blur) */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute -right-20 top-0 w-96 h-96 bg-zinc-300 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 animate-pulse"></div>
            
            <div className="relative z-10 text-center space-y-4 group-hover:scale-105 transition-transform">
                <div className="text-6xl md:text-8xl mb-4 group-hover:rotate-12 transition-transform duration-700">🌪️</div>
                <h2 className="text-4xl font-black tracking-tighter uppercase">The Wind</h2>
                <div className="h-px w-20 bg-zinc-900 mx-auto"></div>
                <p className="text-xs font-bold tracking-widest uppercase max-w-xs mx-auto">
                    Speed • Expansion • Network
                </p>
                <p className="text-[10px] opacity-60 max-w-xs mx-auto italic">
                    "I am the invisible force. I spread the chaos to build the empire."
                </p>
                <div className="pt-8 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    <span className="border border-zinc-900 px-4 py-2 text-xs font-bold uppercase">Select Path</span>
                </div>
            </div>
        </div>

        {/* CÔTÉ DROIT : LE NUAGE (CLOUD) */}
        <div 
            onClick={() => handleMint('CLOUD')}
            className="w-full md:w-1/2 h-[50vh] md:h-screen bg-slate-900 hover:bg-slate-800 text-slate-100 flex flex-col items-center justify-center p-8 cursor-pointer transition-all duration-500 group relative overflow-hidden border-t md:border-t-0 md:border-l border-zinc-800"
        >
            {/* Effet de Nuage (Sombre) */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
            <div className="absolute -left-20 bottom-0 w-96 h-96 bg-slate-700 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>

            <div className="relative z-10 text-center space-y-4 group-hover:scale-105 transition-transform">
                <div className="text-6xl md:text-8xl mb-4 group-hover:-translate-y-2 transition-transform duration-1000">☁️</div>
                <h2 className="text-4xl font-black tracking-tighter uppercase text-slate-200">The Cloud</h2>
                <div className="h-px w-20 bg-slate-500 mx-auto"></div>
                <p className="text-xs font-bold tracking-widest uppercase max-w-xs mx-auto text-slate-400">
                    Power • Accumulation • Stability
                </p>
                <p className="text-[10px] opacity-60 max-w-xs mx-auto italic text-slate-500">
                    "I am the storm that waits. I hold the power to strike."
                </p>
                <div className="pt-8 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    <span className="border border-slate-500 px-4 py-2 text-xs font-bold uppercase">Select Path</span>
                </div>
            </div>
        </div>

      </div>
    );
  }

  // ÉTAT DE CHARGEMENT (MINTING)
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono">
        <div className="animate-spin text-4xl mb-4">💠</div>
        <h2 className="text-white text-xs tracking-[0.3em] uppercase animate-pulse">
            Forging Soul Identity...
        </h2>
    </div>
  );
}
