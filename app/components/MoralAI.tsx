'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { SOUL_ADDRESS, SOUL_ABI } from '../constants';

export function MoralAI() {
  const { address } = useAccount();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Lecture de l'âme pour adapter le discours
  const { data: soulData } = useReadContract({
    address: SOUL_ADDRESS,
    abi: SOUL_ABI,
    functionName: 'getMySoul',
    args: [address],
  });

  const vitality = soulData ? Number(soulData[0]) : 0;

  useEffect(() => {
    // LA LOGIQUE DU CERVEAU
    let targetMessage = "Initialising Neural Link...";

    if (vitality === 0) {
        targetMessage = "⚠️ ALERT: No Soul detected. You are a Ghost. Mint your identity immediately.";
    } else if (vitality < 10) {
        targetMessage = "OBSERVATION: Weak signal. Your contribution is negligible. The Forge requires fuel.";
    } else if (vitality > 30) {
        targetMessage = `ACCESS GRANTED: Welcome back, Patient Zero. Vitality at ${vitality}. Systems are stable. Ready for expansion.`;
    } else {
        targetMessage = "STATUS: Initiate level. Keep sacrificing to unlock higher cognitive functions.";
    }

    // Effet de machine à écrire (Typing Effect)
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < targetMessage.length) {
            setMessage(targetMessage.substring(0, i + 1));
            i++;
        } else {
            setIsTyping(false);
            clearInterval(typingInterval);
        }
    }, 30); // Vitesse de frappe

    return () => clearInterval(typingInterval);
  }, [vitality]);

  return (
    <div className="w-full mt-4 mb-4 font-mono">
      {/* BARRE DE CHARGEMENT NEURONALE */}
      <div className="flex items-center gap-2 mb-2">
          <div className="h-1 w-2 bg-purple-500 animate-pulse"></div>
          <div className="h-1 w-2 bg-purple-500 animate-pulse delay-75"></div>
          <div className="h-1 w-2 bg-purple-500 animate-pulse delay-150"></div>
          <span className="text-[9px] text-purple-400 uppercase tracking-widest">
            Moral Rectifier // AI Core
          </span>
      </div>

      {/* BOITE DE DIALOGUE */}
      <div className="relative bg-zinc-900/80 border-l-2 border-purple-500 p-4 rounded-r-lg shadow-[0_0_20px_rgba(168,85,247,0.1)]">
        
        {/* Scanline visuelle */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none"></div>

        <div className="flex gap-4 items-start">
            {/* AVATAR DE L'IA (Abstract) */}
            <div className="mt-1 w-8 h-8 rounded bg-black border border-purple-500/30 flex items-center justify-center shrink-0">
                <div className="w-4 h-4 bg-purple-500 rounded-full animate-ping opacity-20 absolute"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            </div>

            {/* LE TEXTE */}
            <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-medium">
                <span className="text-purple-400 font-bold mr-2">&gt;</span>
                {message}
                <span className="animate-blink inline-block w-2 h-4 align-middle bg-purple-500 ml-1"></span>
            </div>
        </div>
      </div>
    </div>
  );
}
