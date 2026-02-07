'use client';

import { useState, useEffect } from 'react';

export function Prophecy() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // SÉCURITÉ ABSOLUE : On met le symbole dans une variable
  const ARROW = ">"; 

  useEffect(() => {
    const targetDate = new Date('2029-01-01T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mt-8 mb-8 font-mono border border-green-900/50 bg-black rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,255,0,0.05)]">
      
      {/* HEADER */}
      <div className="bg-green-900/10 border-b border-green-900/30 p-2 flex justify-between items-center">
        <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
        </div>
        <div className="text-[10px] text-green-600 tracking-widest uppercase">
            SYS.DIAGNOSTIC // V.3.3.1
        </div>
      </div>

      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* PANEL 1: QUANTUM THREAT */}
        <div className="space-y-2">
            <h4 className="text-xs text-green-500 uppercase tracking-widest mb-4 border-b border-green-900/50 pb-1">
                ⚠️ Threat Detection: Q-Day
            </h4>
            <div className="text-4xl md:text-5xl font-black text-green-500/90 tracking-tighter tabular-nums">
                {timeLeft.days}D <span className="text-lg text-green-800">:{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</span>
            </div>
            
            {/* ICI : On utilise la variable {ARROW} au lieu du symbole direct */}
            <div className="text-[10px] text-green-700 leading-relaxed space-y-1">
                <div>{ARROW} TARGET: 2029 (IBM/GOOGLE QUANTUM SUPREMACY)</div>
                <div>{ARROW} STATUS: ELLIPTIC CURVE VULNERABLE</div>
                <div>{ARROW} PROTOCOL: <span className="text-green-400 font-bold underline">MIGRATE TO SOULBOUND</span></div>
            </div>
        </div>

        {/* PANEL 2: SIGNAL RECTIFIER */}
        <div className="relative h-32 border border-green-900/30 bg-green-900/5 rounded p-2 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10" 
                 style={{backgroundImage: 'linear-gradient(0deg, transparent 24%, #00ff00 25%, #00ff00 26%, transparent 27%, transparent 74%, #00ff00 75%, #00ff00 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #00ff00 25%, #00ff00 26%, transparent 27%, transparent 74%, #00ff00 75%, #00ff00 76%, transparent 77%, transparent)', backgroundSize: '30px 30px'}}>
            </div>

            <svg className="absolute w-full h-full opacity-30" preserveAspectRatio="none">
                <path d="M0,50 Q25,0 50,50 T100,50 T150,50 T200,50" fill="none" stroke="red" strokeWidth="2" className="animate-pulse" />
                <path d="M0,50 C20,10 40,90 60,50 S100,10 120,50 S160,90 180,50" fill="none" stroke="red" strokeWidth="1" />
            </svg>

            <div className="z-10 bg-black/80 px-4 py-2 border border-green-500/50 text-green-400 text-xs font-bold shadow-[0_0_10px_rgba(0,255,0,0.2)]">
                MORAL RECTIFIER ACTIVE
            </div>
            
            <svg className="absolute w-full h-full" preserveAspectRatio="none">
                 <line x1="0" y1="50" x2="300" y2="50" stroke="#4ade80" strokeWidth="2" strokeDasharray="4 2" />
            </svg>
        </div>

      </div>

      {/* FOOTER */}
      <div className="p-4 bg-green-900/5 border-t border-green-900/30 text-center">
        <p className="text-[10px] md:text-xs text-green-600 uppercase tracking-widest">
            &quot;Chaos is raw material. Order is the product.&quot;
        </p>
      </div>
    </div>
  );
}
