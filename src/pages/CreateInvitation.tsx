import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Copy, 
  QrCode, 
  Share2, 
  Sparkles, 
  Heart, 
  ExternalLink,
  MessageCircle,
  Phone
} from 'lucide-react';
import { StepRecipient } from '../components/builder/StepRecipient';
import { StepMessage } from '../components/builder/StepMessage';
import { StepDateDetails } from '../components/builder/StepDateDetails';
import { StepTheme } from '../components/builder/StepTheme';
import { LivePreview } from '../components/builder/LivePreview';
import { QRCodeModal } from '../components/common/QRCodeModal';
import { Invitation, ThemeId } from '../types/invitation';
import { generateInviteId } from '../utils/generateInviteId';
import { createInvitation } from '../services/invitationService';
import { copyToClipboard, getInvitationUrl, getShareLinks, shareInvitation } from '../utils/sharing';
import { useAuth } from '../context/AuthContext';
import { soundService } from '../services/audioService';

export const CreateInvitation: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [createdInvite, setCreatedInvite] = useState<Invitation | null>(null);

  // Form State
  const [recipientName, setRecipientName] = useState<string>('Angel rose (Yahoo)');
  const [creatorName, setCreatorName] = useState<string>(user?.displayName || 'TJ');
  const [message, setMessage] = useState<string>("Hey Angel rose (Yahoo)! I've been meaning to ask you something special... Would you go out with me? 💕");
  const [dateIdea, setDateIdea] = useState<string>('coffee');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [theme, setTheme] = useState<ThemeId>('pink-dream');

  // UI state for share modal
  const [showQRModal, setShowQRModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const draftInvitation: Partial<Invitation> = {
    recipientName,
    creatorName,
    message,
    dateIdea,
    date,
    time,
    location,
    notes,
    photoUrl,
    theme
  };

  const handleNextStep = () => {
    soundService.playClick();
    if (step === 1 && (!recipientName.trim() || !creatorName.trim())) {
      alert("Please fill in both your name and recipient's name! 💕");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    soundService.playClick();
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleGenerateLink = async () => {
    soundService.playClick();
    if (!recipientName.trim() || !creatorName.trim()) {
      alert("Please enter names first!");
      setStep(1);
      return;
    }

    setLoading(true);

    const inviteId = generateInviteId(8);
    const newInv = await createInvitation({
      id: inviteId,
      creatorId: user?.uid || 'guest',
      creatorName: creatorName.trim(),
      recipientName: recipientName.trim(),
      message: message.trim(),
      dateIdea,
      date: date || undefined,
      time: time || undefined,
      location: location.trim() || undefined,
      notes: notes.trim() || undefined,
      photoUrl,
      theme,
      status: 'pending'
    });

    setCreatedInvite(newInv);
    setLoading(false);
    setStep(5); // Final Share Step
  };

  const handleCopyLink = async () => {
    soundService.playClick();
    if (!createdInvite) return;
    const url = getInvitationUrl(createdInvite.id);
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <span className="text-xs font-bold text-rose-300/80 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
          Invitation Builder 💌
        </span>
      </div>

      {/* Step Indicator */}
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-0" />
          {[1, 2, 3, 4].map((s) => (
            <button
              key={s}
              onClick={() => {
                if (createdInvite) return;
                soundService.playClick();
                if (s <= step || recipientName) setStep(s);
              }}
              className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center relative z-10 transition-all ${
                step === s
                  ? 'bg-rose-500 text-white ring-4 ring-rose-500/30 scale-110'
                  : step > s
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {step > s ? <Check className="w-4 h-4" /> : s}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-2 px-1">
          <span>Names</span>
          <span>Message</span>
          <span>Outing Details</span>
          <span>Theme</span>
        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Wizard Controls */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                <StepRecipient
                  recipientName={recipientName}
                  creatorName={creatorName}
                  onChange={({ recipientName: r, creatorName: c }) => {
                    if (r !== undefined) setRecipientName(r);
                    if (c !== undefined) setCreatorName(c);
                  }}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                <StepMessage
                  message={message}
                  recipientName={recipientName}
                  onChange={setMessage}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                <StepDateDetails
                  dateIdea={dateIdea}
                  date={date}
                  time={time}
                  location={location}
                  notes={notes}
                  photoUrl={photoUrl}
                  onChange={(fields) => {
                    if (fields.dateIdea !== undefined) setDateIdea(fields.dateIdea);
                    if (fields.date !== undefined) setDate(fields.date);
                    if (fields.time !== undefined) setTime(fields.time);
                    if (fields.location !== undefined) setLocation(fields.location);
                    if (fields.notes !== undefined) setNotes(fields.notes);
                    if (fields.photoUrl !== undefined) setPhotoUrl(fields.photoUrl);
                  }}
                />
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                <StepTheme
                  selectedTheme={theme}
                  onChange={setTheme}
                />
              </motion.div>
            )}

            {step === 5 && createdInvite && (
              <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
                  🎉
                </div>

                <div className="space-y-1">
                  <h2 className="font-heading font-extrabold text-2xl text-rose-300">
                    Your Invitation is Ready! 💕
                  </h2>
                  <p className="text-xs text-slate-400">
                    Send this secret link to <strong className="text-slate-200">{createdInvite.recipientName}</strong> and wait for their response!
                  </p>
                </div>

                {/* Unique URL Box */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-rose-500/30 flex items-center justify-between gap-3 text-left">
                  <div className="truncate">
                    <span className="block text-[10px] uppercase font-bold text-rose-400">Unique Secret Link</span>
                    <span className="font-mono text-sm font-semibold text-rose-200 truncate">
                      {getInvitationUrl(createdInvite.id)}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                {/* Social Share Buttons */}
                <div className="space-y-2">
                  <span className="block text-xs font-semibold text-slate-400">Send directly via:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold">
                    <a
                      href={getShareLinks(createdInvite).whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={getShareLinks(createdInvite).sms}
                      className="p-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center gap-1.5 transition"
                    >
                      <Phone className="w-4 h-4" />
                      <span>SMS</span>
                    </a>

                    <button
                      onClick={() => shareInvitation(createdInvite)}
                      className="p-3 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white flex items-center justify-center gap-1.5 transition"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share API</span>
                    </button>

                    <button
                      onClick={() => setShowQRModal(true)}
                      className="p-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-1.5 transition"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>QR Code</span>
                    </button>
                  </div>
                </div>

                {/* Dashboard Action */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate(`/invite/${createdInvite.id}`)}
                    className="flex-1 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Live Invitation</span>
                  </button>

                  <button
                    onClick={() => navigate('/dashboard')}
                    className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-lg"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Go to Dashboard</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls for Builder (Steps 1-4) */}
          {step < 5 && (
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={step === 1}
                className={`px-5 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  step === 1 ? 'opacity-30 cursor-not-allowed text-slate-500' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-600/30 transition active:scale-95"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleGenerateLink}
                  disabled={loading}
                  className="px-7 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:brightness-110 text-white text-xs font-extrabold flex items-center gap-2 shadow-xl shadow-rose-500/40 transition active:scale-95"
                >
                  <Heart className="w-4 h-4 fill-white animate-pulse-slow" />
                  <span>{loading ? 'Creating...' : 'Generate Secret Link 💌'}</span>
                </button>
              )}
            </div>
          )}

        </div>

        {/* Right Side: Live Phone Preview */}
        <div className="lg:col-span-5 flex justify-center sticky top-24">
          <LivePreview invitation={draftInvitation} />
        </div>

      </div>

      {/* QR Code Modal */}
      {showQRModal && createdInvite && (
        <QRCodeModal
          url={getInvitationUrl(createdInvite.id)}
          recipientName={createdInvite.recipientName}
          onClose={() => setShowQRModal(false)}
        />
      )}
    </div>
  );
};
