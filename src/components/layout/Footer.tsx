import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-rose-500/20 py-10 px-4 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-script text-2xl font-bold text-rose-400">DateInvite</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse-slow" />
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            Create cute, playful, interactive date invitations and send secret links to people who light up your world. 💕
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <Link to="/demo" className="hover:text-rose-300 transition">Try Demo 🚀</Link>
          <span className="text-slate-700">•</span>
          <Link to="/create" className="hover:text-rose-300 transition">Build Invitation 💌</Link>
          <span className="text-slate-700">•</span>
          <Link to="/dashboard" className="hover:text-rose-300 transition">Dashboard 📊</Link>
        </div>

      </div>

      <div className="max-w-5xl mx-auto border-t border-slate-900 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} DateInvite — Crafted with love for romantic dreamers ✨</p>
        <div className="flex items-center gap-1 text-slate-400">
          <span>Made to bring smiles</span>
          <Sparkles className="w-3 h-3 text-amber-400" />
        </div>
      </div>
    </footer>
  );
};
