// Trinity Activation - V1.1
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Dashboard } from './components/Dashboard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-12 px-2 md:px-24 bg-black text-white selection:bg-purple-500/30">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-white/10 bg-zinc-900/50 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4">
          <code className="font-mono font-bold text-green-400">GEMINZI PROTOCOL // v0.1</code>
        </div>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-black via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <ConnectButton />
        </div>
      </div>

      <div className="relative flex flex-col place-items-center mt-20 gap-8 w-full">
        <h1 className="text-5xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 tracking-tighter mb-2 text-center break-words">
        TRINITY ONLINE
        </h1>
        
        {/* LE TABLEAU DE BORD S'AFFICHERA ICI SI CONNECTÉ */}
        <Dashboard />
        
      </div>
    </main>
  );
}
