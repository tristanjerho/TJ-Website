import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Sparkles, Heart } from 'lucide-react';
import { soundService } from '../../services/audioService';

const REASONS = [
  { id: 1, front: "Reason #1 📊", back: "Science proves going out with TJ increases happiness by 400%!" },
  { id: 2, front: "Reason #2 🍝", back: "You get 100% full decision power on food, drinks & activities!" },
  { id: 3, front: "Reason #3 😜", back: "The NO button is completely broken & dodges anyway!" },
  { id: 4, front: "Reason #4 💕", back: "Because TJ & Angel rose (Yahoo) always make the absolute best memories!" }
];

export const ReasonsFlipCards: React.FC = () => {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const handleFlip = (id: number) => {
    soundService.playClick();
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-2 text-left">
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 opacity-90">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Top 4 Reasons to Say YES (Tap to Reveal) 💕</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {REASONS.map((r) => {
          const isFlipped = Boolean(flipped[r.id]);
          return (
            <motion.button
              key={r.id}
              type="button"
              onClick={() => handleFlip(r.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center min-h-[72px] transition-all cursor-pointer select-none ${
                isFlipped
                  ? 'bg-rose-500 text-white border-rose-400 font-bold shadow-md'
                  : 'bg-white/60 hover:bg-white/80 border-white/80 text-slate-800 font-semibold'
              }`}
            >
              <span>{isFlipped ? r.back : r.front}</span>
              {!isFlipped && <span className="text-[10px] opacity-60 mt-1">Tap to flip 🔄</span>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
