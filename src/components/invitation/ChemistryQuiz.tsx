import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, CheckCircle2, Trophy } from 'lucide-react';
import { soundService } from '../../services/audioService';

interface ChemistryQuizProps {
  onComplete: () => void;
  themeClass?: string;
}

export const ChemistryQuiz: React.FC<ChemistryQuizProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [q1Answer, setQ1Answer] = useState<number | null>(null);
  const [q2Answer, setQ2Answer] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const handleQ1 = (idx: number) => {
    soundService.playClick();
    setQ1Answer(idx);
    setTimeout(() => setStep(1), 400);
  };

  const handleQ2 = (idx: number) => {
    soundService.playClick();
    setQ2Answer(idx);
    setTimeout(() => {
      soundService.playCelebration();
      setIsFinished(true);
    }, 400);
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="p-6 sm:p-8 rounded-[36px] bg-slate-900/90 backdrop-blur-xl border border-rose-500/30 text-center space-y-6 shadow-2xl relative max-w-md mx-auto"
    >
      <div className="flex items-center justify-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20 w-fit mx-auto">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Compatibility Check 🧪</span>
      </div>

      {!isFinished ? (
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="q1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-extrabold text-rose-200 font-heading">
                Question 1 of 2 💖
              </h3>
              <p className="text-sm font-semibold text-slate-200">
                Who has the cutest smile?
              </p>

              <div className="space-y-2.5 pt-2">
                {["Angel rose 🌸", "Yahoo 🐣", "Both of us together 💕"].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQ1(idx)}
                    className={`w-full py-3 px-4 rounded-2xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                      q1Answer === idx
                        ? 'bg-rose-500 text-white border-rose-400 shadow-md'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    {q1Answer === idx && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="q2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-extrabold text-rose-200 font-heading">
                Question 2 of 2 🚀
              </h3>
              <p className="text-sm font-semibold text-slate-200">
                How excited are you to go out together?
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  "Super excited! ✨",
                  "Extremely excited! 💕",
                  "1000% Excited! 🎉"
                ].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQ2(idx)}
                    className={`w-full py-3 px-4 rounded-2xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                      q2Answer === idx
                        ? 'bg-rose-500 text-white border-rose-400 shadow-md'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    {q2Answer === idx && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        /* Quiz Complete Screen */
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-5"
        >
          <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 flex items-center justify-center mx-auto text-3xl">
            🏆
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-rose-300 font-heading">
              100% Match Verified! 💕
            </h3>
            <p className="text-xs text-slate-300">
              According to science, TJ & Angel rose (Yahoo) are a perfect 10/10 pair!
            </p>
          </div>

          <button
            onClick={() => {
              soundService.playClick();
              onComplete();
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:brightness-110 text-white font-extrabold text-sm shadow-xl shadow-rose-500/30 flex items-center justify-center gap-2 transition"
          >
            <Heart className="w-4 h-4 fill-white animate-pulse-slow" />
            <span>Open Secret Invitation 💌</span>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};
