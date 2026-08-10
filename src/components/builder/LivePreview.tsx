import React from 'react';
import { THEMES, DATE_IDEAS } from '../../utils/themes';
import { Invitation } from '../../types/invitation';
import { FloatingHearts } from '../layout/FloatingHearts';

interface LivePreviewProps {
  invitation: Partial<Invitation>;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ invitation }) => {
  const themeId = invitation.theme || 'love-letter';
  const theme = THEMES[themeId] || THEMES['love-letter'];
  const idea = DATE_IDEAS.find((i) => i.id === invitation.dateIdea);

  const recipient = invitation.recipientName || 'Angel rose (Yahoo)';
  const creator = invitation.creatorName || 'TJ';
  const msg = invitation.message || "Hey Angel rose (Yahoo)! I've been meaning to ask you something special... Would you go out with me? 💕";

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-2">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-rose-300/80 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
          📱 Live Recipient Preview
        </span>
      </div>

      {/* Mock Phone Frame */}
      <div className="w-full max-w-[340px] h-[580px] rounded-[40px] p-3 bg-slate-900 border-4 border-slate-700 shadow-2xl relative flex flex-col overflow-hidden">
        {/* Phone Notch / Dynamic Island */}
        <div className="w-24 h-4 bg-slate-950 rounded-full mx-auto mb-2 z-20 shrink-0" />

        {/* Screen Content Area */}
        <div className={`w-full flex-1 rounded-[30px] p-5 overflow-y-auto no-scrollbar relative flex flex-col justify-between ${theme.backgroundClass}`}>
          
          <FloatingHearts emojis={theme.floatingEmojis} count={8} />

          {/* Invitation Card */}
          <div className="relative z-10 space-y-4 my-auto text-center">
            
            <div className="inline-block p-3 rounded-2xl bg-white/40 backdrop-blur-sm shadow-md">
              <span className="text-3xl animate-bounce inline-block">💕</span>
            </div>

            <h2 className={`text-2xl font-extrabold ${theme.textHeadingClass}`}>
              Hey {recipient}! 💕
            </h2>

            <p className={`text-xs ${theme.textBodyClass} leading-relaxed font-medium bg-white/20 p-3 rounded-2xl backdrop-blur-xs`}>
              "{msg}"
            </p>

            {/* Date Details Tag */}
            <div className="p-3 rounded-2xl bg-white/70 text-slate-800 text-left text-xs space-y-1 shadow-sm border border-white/50">
              <div className="flex items-center gap-1.5 font-bold">
                <span>{idea?.emoji || '☕'}</span>
                <span>{idea?.label || 'Coffee & Chat'}</span>
              </div>
              {invitation.date && (
                <div className="text-[11px] text-slate-600">
                  📅 {invitation.date} {invitation.time && `at ${invitation.time}`}
                </div>
              )}
              {invitation.location && (
                <div className="text-[11px] text-slate-600 truncate">
                  📍 {invitation.location}
                </div>
              )}
            </div>

            <p className={`text-xs ${theme.textHeadingClass} font-bold pt-1`}>
              Would you go out with me?
            </p>

            {/* Interactive Mock Buttons */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                className={`py-2 px-5 rounded-2xl text-xs font-bold shadow-md ${theme.accentButtonClass}`}
              >
                YES 💖
              </button>

              <button
                type="button"
                className="py-2 px-4 rounded-2xl text-xs font-medium text-slate-600 bg-slate-200/80 border border-slate-300"
              >
                NO 😢
              </button>
            </div>

            <div className="text-[10px] opacity-60 pt-2 font-medium">
              From: {creator}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
