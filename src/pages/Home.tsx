import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Send, Link as LinkIcon, Gift, ArrowRight, ShieldCheck, Play } from 'lucide-react';
import { FloatingHearts } from '../components/layout/FloatingHearts';
import { soundService } from '../services/audioService';

export const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      <FloatingHearts count={20} />

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-20 px-4 max-w-5xl mx-auto text-center space-y-8">
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-amber-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold shadow-lg backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>The Cutest Way to Ask Someone Out 💕</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight font-heading"
        >
          Got someone <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent font-script text-5xl sm:text-7xl lg:text-8xl">
            special in mind? 💕
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Create a cute little interactive invitation to ask her out, generate a secret link, and send her an experience she'll never forget. ✨
        </motion.p>

        {/* CTA Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link
            to="/create"
            onClick={() => soundService.playClick()}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:brightness-110 text-white font-bold text-base shadow-xl shadow-rose-500/30 flex items-center justify-center gap-2.5 active:scale-95 transition-all"
          >
            <Heart className="w-5 h-5 fill-white animate-pulse-slow" />
            <span>Create an Invitation 💌</span>
          </Link>

          <Link
            to="/demo"
            onClick={() => soundService.playClick()}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-base flex items-center justify-center gap-2 transition backdrop-blur-md"
          >
            <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Try Interactive Demo 🚀</span>
          </Link>
        </motion.div>

        {/* Decorative Feature Tags */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>No Account Needed for Recipients</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Playful Dodging "NO" Button</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gift className="w-4 h-4 text-rose-400" />
            <span>Confetti & Sound Effects</span>
          </div>
        </div>

      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-20 px-4 bg-slate-900/50 border-t border-b border-rose-500/10">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-rose-400 bg-rose-500/10 px-3.5 py-1.5 rounded-full border border-rose-500/20">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              How It Works 💌
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              In less than two minutes, turn your invitation into a romantic interactive website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold text-lg font-heading">
                01
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                Create your invitation
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Choose her name, custom message, outing activity details (coffee, dinner, movie, picnic), and pick a stunning visual theme.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 font-bold text-lg font-heading">
                02
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                Get your secret link
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Generate a unique invitation URL like <code className="text-pink-300">yourdomain.com/invite/8Kx92Lm</code> or download a custom QR code.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg font-heading">
                03
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                Send it & celebrate!
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Send it via Messenger, WhatsApp, Instagram, SMS, or Email. When they tap YES, enjoy celebration confetti & calendar sync!
              </p>
            </motion.div>

          </div>

          {/* Bottom Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-rose-900/40 via-pink-900/30 to-purple-900/40 border border-rose-500/30 text-center space-y-4">
            <h3 className="text-2xl font-bold text-rose-200 font-heading">
              Ready to make someone smile today? 💕
            </h3>
            <Link
              to="/create"
              onClick={() => soundService.playClick()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/30 transition"
            >
              <span>Start Building Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};
