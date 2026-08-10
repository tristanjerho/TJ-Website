import React, { useState } from 'react';
import { Gift, CheckSquare, Square, Sparkles } from 'lucide-react';
import { soundService } from '../../services/audioService';

export const BribesChecklist: React.FC = () => {
  const [bribes, setBribes] = useState([
    { id: 1, text: "Free Boba / Ice Cream of your choice 🍦", checked: true },
    { id: 2, text: "100% Good Vibes & Laughter Guarantee ✨", checked: true },
    { id: 3, text: "Unlimited funny jokes & warm smiles 😂", checked: true },
    { id: 4, text: "You get 100% control over music & food 🎵", checked: true },
    { id: 5, text: "Unlimited aesthetic photo snaps 📸", checked: true }
  ]);

  const toggleBribe = (id: number) => {
    soundService.playClick();
    setBribes((prev) =>
      prev.map((b) => (b.id === id ? { ...b, checked: !b.checked } : b))
    );
  };

  return (
    <div className="p-5 rounded-3xl bg-white/70 backdrop-blur-md border border-white/60 text-slate-800 text-left space-y-3 shadow-md">
      <div className="flex items-center gap-2 border-b border-black/10 pb-2">
        <Gift className="w-4 h-4 text-rose-500" />
        <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-rose-700">
          TJ's Official Outing Bribes 🍦
        </h4>
      </div>

      <div className="space-y-2 text-xs">
        {bribes.map((bribe) => (
          <button
            key={bribe.id}
            type="button"
            onClick={() => toggleBribe(bribe.id)}
            className="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-black/5 transition text-left"
          >
            {bribe.checked ? (
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            )}
            <span className={`font-semibold ${bribe.checked ? 'text-slate-800' : 'text-slate-400 line-through'}`}>
              {bribe.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
