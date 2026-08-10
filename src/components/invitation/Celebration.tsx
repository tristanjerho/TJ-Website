import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Sparkles, 
  Star, 
  CheckCircle, 
  Download, 
  ExternalLink, 
  Send,
  Heart,
  Compass,
  Award
} from 'lucide-react';
import { Invitation } from '../../types/invitation';
import { THEMES, DATE_IDEAS } from '../../utils/themes';
import { getGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendar';
import { updateInvitationResponse } from '../../services/invitationService';
import { soundService } from '../../services/audioService';
import { CountdownTimer } from '../common/CountdownTimer';
import { PinkyPromiseCertificate } from './PinkyPromiseCertificate';

interface CelebrationProps {
  invitation: Invitation;
  themeId: string;
}

export const Celebration: React.FC<CelebrationProps> = ({ invitation: initialInvitation, themeId }) => {
  const theme = THEMES[themeId as keyof typeof THEMES] || THEMES['pink-dream'];
  
  // Current invitation state (updated live when recipient picks date & location)
  const [currentInv, setCurrentInv] = useState<Invitation>(initialInvitation);

  // Recipient Choice State
  const [chosenIdea, setChosenIdea] = useState<string>(initialInvitation.dateIdea || 'coffee');
  const [chosenDate, setChosenDate] = useState<string>(initialInvitation.date || '');
  const [chosenTime, setChosenTime] = useState<string>(initialInvitation.time || '18:00');
  const [chosenLocation, setChosenLocation] = useState<string>(initialInvitation.location || '');
  
  // Survey State
  const [rating, setRating] = useState<number>(initialInvitation.response?.rating || 5);
  const [excitedFor, setExcitedFor] = useState<string>(initialInvitation.response?.excitedFor || '');
  const [note, setNote] = useState<string>(initialInvitation.response?.note || '');
  
  const [dateConfirmed, setDateConfirmed] = useState<boolean>(Boolean(initialInvitation.date && initialInvitation.response));
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  useEffect(() => {
    // 1. Play audio celebration fanfare
    soundService.playCelebration();

    // 2. Trigger confetti burst
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#ff4b72', '#ff85a1', '#ffc2d1'] });
    fire(0.2, { spread: 60, colors: ['#ffd166', '#06d6a0', '#118ab2'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#ffffff', '#ff4b72'] });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  const handleConfirmChoices = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    soundService.playClick();

    // Update invitation object with recipient's chosen date, time, activity, and location
    const updated = {
      ...currentInv,
      dateIdea: chosenIdea,
      date: chosenDate || currentInv.date,
      time: chosenTime || currentInv.time,
      location: chosenLocation || currentInv.location
    };

    const saved = await updateInvitationResponse(currentInv.id, 'accepted', {
      rating,
      excitedFor: excitedFor || `Excited to go out for ${chosenIdea}!`,
      note
    });

    if (saved) {
      setCurrentInv(saved);
    } else {
      setCurrentInv(updated);
    }

    setSubmitting(false);
    setDateConfirmed(true);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="w-full max-w-lg mx-auto text-center space-y-6 select-none"
    >
      {/* Celebration Header Banner */}
      <div className="space-y-3">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-300 flex items-center justify-center shadow-xl shadow-rose-500/40 text-4xl"
        >
          🎉
        </motion.div>

        <h1 className={`text-3xl sm:text-4xl font-extrabold ${theme.textHeadingClass}`}>
          IT'S OFFICIAL! SHE SAID YES! 💕🎉
        </h1>

        <p className={`text-sm ${theme.textBodyClass} opacity-90`}>
          YAY! <strong className="font-semibold">{currentInv.creatorName}</strong> is so happy! Now, pick where & when you'd like to go! ✨
        </p>
      </div>

      {/* Feature 4: Live Outing Countdown Timer */}
      {dateConfirmed && currentInv.date && (
        <CountdownTimer targetDate={currentInv.date} targetTime={currentInv.time} />
      )}

      {/* Recipient Date & Destination Choice Form */}
      <div className={`p-6 rounded-3xl text-left space-y-5 shadow-xl border ${theme.cardClass}`}>
        
        <div className="flex items-center justify-between border-b border-black/10 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-rose-500" />
            <div>
              <h3 className="font-heading font-bold text-base">
                Choose Where & When You Want to Go 💕
              </h3>
              <p className="text-xs opacity-75">You get to choose the activity, place, date & time!</p>
            </div>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${theme.accentBadgeClass}`}>
            Your Choice 🌟
          </span>
        </div>

        {/* 1. Activity Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold opacity-90 flex items-center gap-1.5">
            <span>1. What would you like to do? 💖</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {DATE_IDEAS.map((idea) => {
              const isSelected = chosenIdea === idea.id;
              return (
                <button
                  key={idea.id}
                  type="button"
                  onClick={() => {
                    soundService.playClick();
                    setChosenIdea(idea.id);
                  }}
                  className={`p-2.5 rounded-2xl border text-left flex items-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-rose-500 text-white border-rose-600 font-bold shadow-md ring-2 ring-rose-300'
                      : 'bg-black/5 hover:bg-black/10 border-black/10 text-slate-800'
                  }`}
                >
                  <span className="text-xl">{idea.emoji}</span>
                  <span className="text-xs font-semibold">{idea.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Date & Time Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <label className="block font-bold opacity-80 flex items-center gap-1">
              <CalendarIcon className="w-3.5 h-3.5 text-rose-500" />
              <span>2. Pick a Date</span>
            </label>
            <input
              type="date"
              value={chosenDate}
              onChange={(e) => setChosenDate(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-black/5 border border-black/10 focus:outline-none focus:ring-2 focus:ring-rose-400 font-semibold"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold opacity-80 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-pink-500" />
              <span>3. Pick a Time</span>
            </label>
            <input
              type="time"
              value={chosenTime}
              onChange={(e) => setChosenTime(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-black/5 border border-black/10 focus:outline-none focus:ring-2 focus:ring-rose-400 font-semibold"
              required
            />
          </div>
        </div>

        {/* 3. Specific Location / Restaurant / Spot */}
        <div className="space-y-1 text-xs">
          <label className="block font-bold opacity-80 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span>4. Where specifically do you want to go? (Optional)</span>
          </label>
          <input
            type="text"
            value={chosenLocation}
            onChange={(e) => setChosenLocation(e.target.value)}
            placeholder="e.g. Your favorite cafe, SM Cinema, Baguio Park..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 border border-black/10 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>

        {/* 4. Rating & Extra Notes */}
        <div className="space-y-3 pt-2 border-t border-black/10 text-xs">
          <div>
            <label className="block font-bold mb-1 opacity-80">
              Rate this invitation 💕
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    soundService.playClick();
                    setRating(star);
                  }}
                  className="p-1 focus:outline-none transition transform hover:scale-125"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1 opacity-80">
              Send a note to {currentInv.creatorName} 💬
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="e.g. I can't wait! See you then 💕"
              className="w-full px-3.5 py-2 rounded-xl bg-black/5 border border-black/10 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>
        </div>

        {/* Submit Confirmation Button */}
        {dateConfirmed ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs flex items-center gap-3">
            <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600" />
            <div>
              <strong className="block font-bold text-sm">Date & Destination Saved! 💕</strong>
              <span>{currentInv.creatorName} has received an email notification at <strong>tristanjerhobelingon4@gmail.com</strong> with your chosen date & place! ✨</span>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleConfirmChoices}
            disabled={submitting}
            className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-extrabold text-sm transition shadow-lg ${theme.accentButtonClass}`}
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? `Notifying ${currentInv.creatorName}...` : `Confirm Choices & Notify ${currentInv.creatorName} 💌`}</span>
          </button>
        )}

        {/* Feature 1: Pinky Promise Certificate Button */}
        <button
          type="button"
          onClick={() => {
            soundService.playClick();
            setShowCertificate(true);
          }}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-105 transition"
        >
          <Award className="w-4 h-4" />
          <span>View Pinky Promise Certificate 📜</span>
        </button>

        {/* Calendar Buttons (Updated with recipient's choices) */}
        <div className="pt-3 border-t border-black/10 flex flex-col sm:flex-row gap-2">
          <a
            href={getGoogleCalendarUrl(currentInv)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundService.playClick()}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition shadow-sm ${theme.accentButtonClass}`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Google Calendar 📅</span>
          </a>

          <button
            type="button"
            onClick={() => {
              soundService.playClick();
              downloadIcsFile(currentInv);
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold bg-black/10 hover:bg-black/20 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.ICS File</span>
          </button>
        </div>

      </div>

      {/* Pinky Promise Certificate Modal */}
      {showCertificate && (
        <PinkyPromiseCertificate
          invitation={currentInv}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </motion.div>
  );
};
