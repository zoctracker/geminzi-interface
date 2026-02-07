'use client';

export function CryoVault() {
  // Simulation des données (À connecter au contrat plus tard)
  const lockedAmount = 20202020;
  const releaseDate = "2027.01.01";
  
  return (
    <div className="w-full mt-4 relative group font-mono">
      
      {/* EFFET DE GIVRE (Overlay) */}
      <div className="absolute -inset-0.5 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-xl opacity-20 blur-sm group-hover:opacity-40 transition duration-1000"></div>
      
      <div className="relative bg-black border border-cyan-500/30 rounded-xl p-6 overflow-hidden">
        
        {/* PARTICULES DE GLACE (Décoration SVG) */}
        <svg className="absolute top-0 right-0 w-24 h-24 opacity-20 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2L12,2 M5,5L5,5 M19,5L19,5 M2,12L2,12 M22,12L22,12 M5,19L5,19 M19,19L19,19 M12,22L12,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
                <h3 className="text-cyan-400 font-bold text-lg tracking-widest uppercase flex items-center gap-2">
                    ❄️ CRYO-VAULT
                </h3>
                <p className="text-[10px] text-cyan-600 uppercase mt-1">
                    Status: <span className="animate-pulse text-cyan-200">DEEP FREEZE ACTIVE</span>
                </p>
            </div>
            <div className="border border-cyan-500/30 rounded px-2 py-1 bg-cyan-900/10">
                <div className="text-[9px] text-cyan-500 uppercase">Thaw Date</div>
                <div className="text-xs text-white font-bold">{releaseDate}</div>
            </div>
        </div>

        {/* MONTANT GELÉ */}
        <div className="flex flex-col items-center justify-center py-4 border-y border-cyan-500/10 bg-cyan-900/5 backdrop-blur-sm">
             <div className="text-4xl md:text-5xl font-thin text-white tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                {lockedAmount.toLocaleString('fr-FR')}
             </div>
             <div className="text-xs text-cyan-500 font-bold uppercase tracking-[0.3em] mt-2">
                GMNZ Preserved
             </div>
        </div>

        {/* BARRE DE DÉGEL (PROGRESSION) */}
        <div className="mt-6">
            <div className="flex justify-between text-[10px] text-cyan-600 uppercase mb-2">
                <span>Cryostasis Integrity</span>
                <span>98.5%</span>
            </div>
            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-cyan-600 via-blue-500 to-cyan-400 w-[98.5%] relative">
                    {/* Effet brillant sur la barre */}
                    <div className="absolute top-0 bottom-0 right-0 w-1 bg-white shadow-[0_0_10px_white]"></div>
                </div>
            </div>
            <p className="text-[9px] text-center text-cyan-700 mt-2 italic">
                "Assets preserved for the post-quantum era."
            </p>
        </div>

      </div>
    </div>
  );
}
