'use client';

import { useState, useEffect } from 'react';

export function Prophecy() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
    <div className="w-full mt-8 mb-8 font-mono border border-red-900/50 bg-black rounded-xl overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.1)]">
      
      {/* HEADER ROUGE */}
      <div className="bg-red-950/30 border-b border-red-900/30 p-2 flex justify-between items-center">
        <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_red]"></div>
            <div className="w-3 h-3 rounded-full bg-red-900/50"></div>
            <div className="w-3 h-3 rounded-full bg-red-900/30"></div>
        </div>
        <div className="text-[10px] text-red-500 tracking-widest uppercase font-bold">
            ⚠️ SYS.CRITICAL // DEFCON 1
        </div>
      </div>

      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* PANEL 1: QUANTUM THREAT */}
        <div className="space-y-2">
            <h4 className="text-xs text-red-600 uppercase tracking-widest mb-4 border-b border-red-900/50 pb-1">
                Threat Detection: Q-Day
            </h4>
            <div className="text-4xl md:text-5xl font-black text-red-500 tracking-tighter tabular-nums drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]">
                {timeLeft.days}D <span className="text-lg text-red-800">:{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</span>
            </div>
            
            <div className="text-[10px] text-red-700 leading-relaxed space-y-1 font-bold">
                <div>{ARROW} TARGET: 2029 (QUANTUM SUPREMACY)</div>
                <div>{ARROW} STATUS: <span className="text-red-500 animate-pulse">CRITICAL VULNERABILITY</span></div>
                <div>{ARROW} PROTOCOL: MIGRATE TO SOULBOUND</div>
            </div>
        </div>

        {/* PANEL 2: SIGNAL RECTIFIER */}
        <div className="relative h-32 border border-red-900/30 bg-red-950/10 rounded p-2 flex items-center justify-center overflow-hidden">
            {/* Grille Rouge */}
            <div className="absolute inset-0 opacity-20" 
                 style={{backgroundImage: 'linear-gradient(0deg, transparent 24%, #ef4444 25%, #ef4444 26%, transparent 27%, transparent 74%, #ef4444 75%, #ef4444 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #ef4444 25%, #ef4444 26%, transparent 27%, transparent 74%, #ef4444 75%, #ef4444 76%, transparent 77%, transparent)', backgroundSize: '30px 30px'}}>
            </div>

            {/* Signal Chaos */}
            <svg className="absolute w-full h-full opacity-50" preserveAspectRatio="none">
                <path d="M0,50 Q25,0 50,50 T100,50 T150,50 T200,50" fill="none" stroke="red" strokeWidth="2" className="animate-pulse" />
            </svg>

            <div className="z-10 bg-black/90 px-4 py-2 border border-red-500 text-red-500 text-xs font-bold shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                RECTIFIER REQUIRED
            </div>
        </div>

      </div>
    </div>
  );
}
