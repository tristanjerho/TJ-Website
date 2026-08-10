import React from 'react';
import { Sparkles, MessageSquareQuote } from 'lucide-react';
import { MESSAGE_PRESETS } from '../../utils/themes';
import { soundService } from '../../services/audioService';

interface StepMessageProps {
  message: string;
  recipientName: string;
  onChange: (message: string) => void;
}

export const StepMessage: React.FC<StepMessageProps> = ({ message, recipientName, onChange }) => {
  const applyPreset = (presetText: string) => {
    soundService.playClick();
    onChange(presetText);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading font-bold text-2xl text-rose-300">
          Craft your message 💌
        </h2>
        <p className="text-xs text-slate-400">
          Write a sweet, funny, or bold invitation note for {recipientName || 'them'}.
        </p>
      </div>

      {/* Message Presets */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Suggested Presets (Click to use)
        </span>
        <div className="flex flex-wrap gap-2">
          {MESSAGE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => applyPreset(preset.text)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-800 hover:bg-rose-500/20 text-rose-300 border border-slate-700 hover:border-rose-500/40 transition active:scale-95"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Message Textarea */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-300">
          Invitation Message
        </label>
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => soundService.playClick()}
            rows={4}
            placeholder="Hey! I've been meaning to ask you something special..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-slate-100 text-sm focus:outline-none transition leading-relaxed"
          />
          <MessageSquareQuote className="w-4 h-4 text-rose-400 absolute left-3.5 top-3.5" />
        </div>
      </div>
    </div>
  );
};
