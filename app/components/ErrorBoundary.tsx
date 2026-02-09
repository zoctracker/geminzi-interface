'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null; // On ajoute l'erreur ici pour pouvoir l'afficher
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-4 font-mono">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-red-500 text-sm tracking-widest uppercase font-bold mb-2">
            CRITICAL SYSTEM FAILURE
          </h2>
          
          {/* C'EST ICI QU'ON AFFICHE LA PREUVE DU CRIME */}
          <div className="bg-zinc-900 border border-red-900/50 p-4 rounded text-xs text-red-300 font-mono mb-6 max-w-xl break-all">
             {this.state.error?.toString() || "Unknown Error"}
          </div>

          <p className="text-zinc-500 text-xs mb-8">
            Please report this error code to the developer.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded text-xs uppercase tracking-widest border border-zinc-600 transition-all"
          >
            Re-Initialize System
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
