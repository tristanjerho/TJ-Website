import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Sparkles } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-center space-y-6">
      <div className="w-24 h-24 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-5xl animate-bounce">
        🌌
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-extrabold text-white font-heading">
          Oops! 404
        </h1>
        <p className="text-rose-300 font-medium text-sm">
          This invitation seems to have disappeared into the universe. 🌌
        </p>
        <p className="text-slate-400 text-xs">
          The link might be incomplete or the creator may have removed it.
        </p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="px-7 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:brightness-110 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-500/30 transition"
      >
        <Home className="w-4 h-4" />
        <span>Return to Safety</span>
      </button>
    </div>
  );
};
