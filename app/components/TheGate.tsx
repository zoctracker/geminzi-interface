'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { SOUL_ADDRESS, SOUL_ABI, DOMINATOR_ADDRESS } from '../constants';

export function TheGate() {
  const { address } = useAccount();
  const [step, setStep] = useState<'CODE' | 'CHOICE' | 'MINTING' | 'SUCCESS'>('CODE');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  // WAGMI HOOKS POUR ÉCRIRE SUR LA BLOCKCHAIN
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // GESTION DES ERREURS BLOCKCHAIN
  useEffect(() => {
    if (writeError) {
        console.error("Mint Error:", writeError);
        setStep('CHOICE'); // Retour au choix si échec
        setError('TRANSACTION FAILED. RETRY.');
    }
  }, [writeError]);

  // GESTION DU SUCCÈS
  useEffect(() => {
    if (isSuccess) {
        setStep('SUCCESS');
        // Recharger la page après 3 secondes pour entrer dans le Dashboard
        setTimeout(() => window.location.reload(), 3000);
    }
  }, [isSuccess]);


  // 1. VALIDATION DU CODE
  const handleCodeSubmit = () => {
    const cleanCode = code.trim().toUpperCase();
    // On accepte le code maître
    if (cleanCode.startsWith('TRINITY')) {
        setStep('CHOICE');
        setError('');
    } else {
        setError('ACCESS DENIED: INVALID VECTOR.');
    }
  };

  // 2. MINT SUR LA BLOCKCHAIN
  const handleMint = (archetypeStr: 'WIND' | 'CLOUD') => {
    setStep('MINTING');
    
    // 1 = WIND, 2 = CLOUD
    const archetypeId = archetypeStr === 'WIND' ? 1 : 2;

    writeContract({
        address: SOUL_ADDRESS,
        abi: SOUL_ABI,
        functionName: 'manifestSoul',
        // On hardcode le mentor pour ce test : C'est TOI (Dominator)
        args: [DOMINATOR_ADDRESS, archetypeId], 
    });
  };

  // --- ECRAN 1: LE CODE ---
  if (step === 'CODE') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono p-4">
        <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
                <div className="text-6xl mb-4 animate-pulse">⛩️</div>
                <h1 className="text-zinc-500 text-xs tracking-[0.5em] uppercase">
                    Geminzi Protocol // The Gate
                </h1>
            </div>

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
                        placeholder="TRINITY-XXXX"
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
        </div>
      </div>
    );
  }

  // --- ECRAN 2: LE CHOIX (VENT OU NUAGE) ---
  if (step === 'CHOICE') {
    return (
      <div className="min-h-screen font-mono flex flex-col md:flex-row">
        
        {/* WIND */}
        <div 
            onClick={() => handleMint('WIND')}
            className="w-full md:w-1/2 h-[50vh] md:h-screen bg-zinc-200 hover:bg-white text-zinc-900 flex flex-col items-center justify-center p-8 cursor-pointer transition-all duration-500 group relative overflow-hidden"
        >
            <div className="relative z-10 text-center space-y-4 group-hover:scale-105 transition-transform">
                <div className="text-8xl mb-4">🌪️</div>
                <h2 className="text-4xl font-black tracking-tighter uppercase">The Wind</h2>
                <p className="text-xs font-bold tracking-widest uppercase">Speed • Network</p>
                <div className="pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="border border-zinc-900 px-4 py-2 text-xs font-bold uppercase">Initialize Path</span>
                </div>
            </div>
        </div>

        {/* CLOUD */}
        <div 
            onClick={() => handleMint('CLOUD')}
            className="w-full md:w-1/2 h-[50vh] md:h-screen bg-slate-900 hover:bg-slate-800 text-slate-100 flex flex-col items-center justify-center p-8 cursor-pointer transition-all duration-500 group relative overflow-hidden border-t md:border-t-0 md:border-l border-zinc-800"
        >
            <div className="relative z-10 text-center space-y-4 group-hover:scale-105 transition-transform">
                <div className="text-8xl mb-4">☁️</div>
                <h2 className="text-4xl font-black tracking-tighter uppercase text-slate-200">The Cloud</h2>
                <p className="text-xs font-bold tracking-widest uppercase text-slate-400">Power • Accumulation</p>
                <div className="pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="border border-slate-500 px-4 py-2 text-xs font-bold uppercase">Initialize Path</span>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // --- ECRAN 3: CHARGEMENT / SUCCÈS ---
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono p-4 text-center">
        {step === 'SUCCESS' ? (
            <>
                <div className="text-6xl mb-6 animate-bounce">🧬</div>
                <h2 className="text-green-500 text-sm tracking-[0.3em] uppercase font-bold mb-2">
                    SOUL INTEGRATED
                </h2>
                <p className="text-zinc-500 text-xs">Redirecting to Dashboard...</p>
            </>
        ) : (
            <>
                <div className="animate-spin text-4xl mb-6">💠</div>
                <h2 className="text-white text-xs tracking-[0.3em] uppercase animate-pulse mb-2">
                    {isPending ? 'Check Wallet...' : 'Forging Soul on Chain...'}
                </h2>
                <p className="text-zinc-600 text-[10px] max-w-xs">
                   Immutable transaction in progress.<br/>Do not close.
                </p>
            </>
        )}
    </div>
  );
}
