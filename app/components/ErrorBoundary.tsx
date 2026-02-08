'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
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
            Signal Interrupted
          </h2>
          <p className="text-zinc-500 text-xs mb-8 max-w-md">
            The Neural Link encountered a critical failure. This usually happens when the Wallet is locked or not responding.
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
