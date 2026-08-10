import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  PlusCircle, 
  Copy, 
  QrCode, 
  ExternalLink, 
  Trash2, 
  Star, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Clock3,
  Share2,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Invitation } from '../types/invitation';
import { getUserInvitations, deleteInvitation } from '../services/invitationService';
import { getInvitationUrl, copyToClipboard, shareInvitation } from '../utils/sharing';
import { QRCodeModal } from '../components/common/QRCodeModal';
import { DATE_IDEAS } from '../utils/themes';
import { soundService } from '../services/audioService';
import { CountdownTimer } from '../components/common/CountdownTimer';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeQR, setActiveQR] = useState<Invitation | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadDashboard = async () => {
    setLoading(true);
    const creatorId = user?.uid || 'guest';
    const items = await getUserInvitations(creatorId);
    setInvitations(items);
    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, [user]);

  const handleCopy = async (inv: Invitation) => {
    soundService.playClick();
    const url = getInvitationUrl(inv.id);
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedId(inv.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleDelete = async (id: string) => {
    soundService.playClick();
    if (confirm("Are you sure you want to delete this date invitation?")) {
      await deleteInvitation(id);
      loadDashboard();
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-heading flex items-center gap-2">
            <span>Creator Dashboard</span>
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse-slow" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track recipient responses, ratings, and secret links in real time 💕
          </p>
        </div>

        <Link
          to="/create"
          onClick={() => soundService.playClick()}
          className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-rose-500/30 transition active:scale-95 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Invitation 💌</span>
        </Link>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 space-y-3">
          <Heart className="w-8 h-8 text-rose-500 animate-pulse mx-auto fill-rose-500" />
          <p className="text-xs">Loading your invitations...</p>
        </div>
      ) : invitations.length === 0 ? (
        /* Empty State */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto text-3xl">
            💌
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white font-heading">No invitations yet!</h3>
            <p className="text-xs text-slate-400">
              Create your very first playful date invitation and send it to someone special.
            </p>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Invitation Now</span>
          </Link>
        </div>
      ) : (
        /* Invitations Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {invitations.map((inv) => {
            const idea = DATE_IDEAS.find((i) => i.id === inv.dateIdea);
            const isAccepted = inv.status === 'accepted';

            return (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 border border-slate-800 hover:border-rose-500/30 rounded-3xl p-6 shadow-xl space-y-4 relative flex flex-col justify-between transition"
              >
                {/* Header info & status badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400">
                      Invitation for
                    </span>
                    <h3 className="text-xl font-black text-white font-heading flex items-center gap-2">
                      <span>{inv.recipientName}</span>
                      <span className="text-base">{idea?.emoji || '☕'}</span>
                    </h3>
                  </div>

                  {isAccepted ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold shrink-0">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Accepted 💕</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold shrink-0">
                      <Clock3 className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                      <span>Waiting...</span>
                    </span>
                  )}
                </div>

                {/* Live Countdown Timer if Accepted */}
                {isAccepted && inv.date && (
                  <CountdownTimer targetDate={inv.date} targetTime={inv.time} />
                )}

                {/* Details snippet */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
                  <p className="text-slate-300 italic line-clamp-2">
                    "{inv.message}"
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                    {inv.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-rose-400" />
                        <span>{inv.date}</span>
                      </span>
                    )}
                    {inv.time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-pink-400" />
                        <span>{inv.time}</span>
                      </span>
                    )}
                    {inv.location && (
                      <span className="flex items-center gap-1 truncate max-w-[150px]">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span className="truncate">{inv.location}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Response Feedback (if accepted & submitted survey) */}
                {isAccepted && inv.response && (
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs space-y-2 text-rose-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-300">Recipient Response:</span>
                      {inv.response.rating && (
                        <div className="flex items-center gap-0.5">
                          {[...Array(inv.response.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      )}
                    </div>

                    {inv.response.excitedFor && (
                      <p className="text-[11px]">
                        <strong>Excited for:</strong> {inv.response.excitedFor}
                      </p>
                    )}

                    {inv.response.note && (
                      <p className="text-[11px] italic">
                        "{inv.response.note}"
                      </p>
                    )}
                  </div>
                )}

                {/* Action Toolbar */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 text-xs font-semibold">
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(inv)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                      title="Copy Secret Link"
                    >
                      {copiedId === inv.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => {
                        soundService.playClick();
                        setActiveQR(inv);
                      }}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 transition"
                      title="Show QR Code"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => shareInvitation(inv)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-pink-300 transition"
                      title="Share API"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/invite/${inv.id}`}
                      onClick={() => soundService.playClick()}
                      className="py-2 px-3 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 flex items-center gap-1 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Live</span>
                    </Link>

                    <button
                      onClick={() => handleDelete(inv.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-300 transition"
                      title="Delete Invitation"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* QR Modal */}
      {activeQR && (
        <QRCodeModal
          url={getInvitationUrl(activeQR.id)}
          recipientName={activeQR.recipientName}
          onClose={() => setActiveQR(null)}
        />
      )}
    </div>
  );
};
