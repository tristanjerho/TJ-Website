import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Home } from 'lucide-react';
import { PlayfulNoButton } from '../components/invitation/PlayfulNoButton';
import { Celebration } from '../components/invitation/Celebration';
import { ChemistryQuiz } from '../components/invitation/ChemistryQuiz';
import { BribesChecklist } from '../components/invitation/BribesChecklist';
import { ReasonsFlipCards } from '../components/invitation/ReasonsFlipCards';
import { FloatingHearts } from '../components/layout/FloatingHearts';
import { Invitation } from '../types/invitation';
import { getInvitationById, updateInvitationResponse } from '../services/invitationService';
import { THEMES, DATE_IDEAS } from '../utils/themes';
import { soundService } from '../services/audioService';

export const InvitationView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const inviteId = id || 'demo';

  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [declined, setDeclined] = useState<boolean>(false);
  const [quizPassed, setQuizPassed] = useState<boolean>(false);

  useEffect(() => {
    async function loadInvite() {
      setLoading(true);
      setError(false);
      try {
        const inv = await getInvitationById(inviteId);
        if (inv) {
          setInvitation(inv);
          if (inv.status === 'accepted') {
            setAccepted(true);
            setQuizPassed(true);
          }
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadInvite();
  }, [inviteId]);

  const handleAccept = async () => {
    soundService.playClick();
    if (invitation) {
      await updateInvitationResponse(invitation.id, 'accepted');
    }
    setAccepted(true);
  };

  const handleDecline = async () => {
    soundService.playClick();
    if (invitation) {
      await updateInvitationResponse(invitation.id, 'declined');
    }
    setDeclined(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white space-y-4">
        <Heart className="w-12 h-12 text-rose-500 animate-pulse fill-rose-500" />
        <p className="text-xs text-rose-300 font-semibold tracking-wider uppercase animate-pulse">
          Opening Secret Invitation... 💕
        </p>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-4xl">
          🌌
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-extrabold text-rose-300 font-heading">
            Oops! Invitation Not Found
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            This invitation seems to have disappeared into the universe or might have expired.
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg"
        >
          <Home className="w-4 h-4" />
          <span>Go to Home Page</span>
        </button>
      </div>
    );
  }

  const theme = THEMES[invitation.theme] || THEMES['pink-dream'];
  const idea = DATE_IDEAS.find((i) => i.id === invitation.dateIdea);

  return (
    <div className={`min-h-screen relative flex flex-col justify-between py-12 px-4 select-none ${theme.backgroundClass}`}>
      
      {/* Background Floating Heart Particles */}
      <FloatingHearts emojis={theme.floatingEmojis} count={18} />

      {/* Main Interactive Invitation Container */}
      <main className="relative z-10 w-full max-w-lg mx-auto my-auto space-y-6">
        
        <AnimatePresence mode="wait">
          {!quizPassed && !accepted ? (
            /* Step 0: Compatibility Quiz Mini-Game */
            <ChemistryQuiz onComplete={() => setQuizPassed(true)} />
          ) : !accepted && !declined ? (
            /* Step 1: Main Interactive Invitation Card */
            <motion.div
              key="interactive-question"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className={`p-6 sm:p-8 rounded-[36px] text-center space-y-5 shadow-2xl relative border overflow-hidden ${theme.cardClass}`}
            >
              {/* Top Romantic Icon */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 4, -4, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-16 h-16 mx-auto rounded-3xl bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center text-3xl shadow-lg"
              >
                💌
              </motion.div>

              {/* Recipient Name Header */}
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-widest opacity-70">
                  Special Outing Invitation
                </span>
                <h1 className={`text-2xl sm:text-3xl font-black ${theme.textHeadingClass}`}>
                  Hey {invitation.recipientName}! 💕
                </h1>
              </div>

              {/* Custom Message Box */}
              <div className="p-4 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60 text-xs sm:text-sm leading-relaxed font-medium">
                "{invitation.message}"
              </div>

              {/* Optional Photo */}
              {invitation.photoUrl && (
                <div className="rounded-2xl overflow-hidden shadow-lg border border-white/50 max-h-48">
                  <img src={invitation.photoUrl} alt="Date memory" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Date Details Teaser Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 border border-white/80 text-xs font-bold shadow-sm">
                <span>{idea?.emoji || '☕'}</span>
                <span>{idea?.label || invitation.dateIdea}</span>
                {invitation.location && <span>• 📍 {invitation.location}</span>}
              </div>

              {/* Feature 2: Official Outing Bribes Checklist */}
              <BribesChecklist />

              {/* Feature 5: Top 4 Reasons to Say YES Flip Cards */}
              <ReasonsFlipCards />

              {/* Question Headline */}
              <div className="space-y-1 pt-2">
                <h2 className={`text-xl sm:text-2xl font-extrabold ${theme.textHeadingClass}`}>
                  Would you go out with me?
                </h2>
                <p className="text-[11px] opacity-70">From {invitation.creatorName}</p>
              </div>

              {/* YES & NO Interactive Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 min-h-[90px]">
                {/* YES Button */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAccept}
                  className={`w-full sm:w-auto px-10 py-4 rounded-2xl text-base font-extrabold shadow-xl tracking-wide cursor-pointer transition ${theme.accentButtonClass}`}
                >
                  YES 💖
                </motion.button>

                {/* NO Button (Playful Endless Dodging) */}
                <PlayfulNoButton onDecline={handleDecline} />
              </div>

            </motion.div>
          ) : accepted ? (
            /* Celebration Screen when YES is clicked */
            <Celebration invitation={invitation} themeId={invitation.theme} />
          ) : (
            /* Declined screen */
            <motion.div
              key="declined-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-8 rounded-3xl text-center space-y-4 shadow-xl border ${theme.cardClass}`}
            >
              <div className="text-5xl">🍦💔</div>
              <h2 className={`text-2xl font-bold ${theme.textHeadingClass}`}>
                That's okay! 💕
              </h2>
              <p className={`text-xs ${theme.textBodyClass} opacity-80 max-w-xs mx-auto leading-relaxed`}>
                {invitation.creatorName} will still appreciate you checking out their cute invitation! Hope you have a wonderful day! ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
};
