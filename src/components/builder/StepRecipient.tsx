import React from 'react';
import { User, Heart } from 'lucide-react';
import { soundService } from '../../services/audioService';

interface StepRecipientProps {
  recipientName: string;
  creatorName: string;
  onChange: (fields: { recipientName?: string; creatorName?: string }) => void;
}

export const StepRecipient: React.FC<StepRecipientProps> = ({ recipientName, creatorName, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading font-bold text-2xl text-rose-300">
          Who are you asking out? 💕
        </h2>
        <p className="text-xs text-slate-400">
          Enter their name and your name so they know who this special invitation is from!
        </p>
      </div>

      <div className="space-y-4">
        {/* Recipient Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">
            Their Name <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={recipientName}
              onChange={(e) => onChange({ recipientName: e.target.value })}
              onFocus={() => soundService.playClick()}
              placeholder="e.g. Alex"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-slate-100 text-sm focus:outline-none transition"
              required
            />
            <Heart className="w-4 h-4 text-rose-400 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Creator Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">
            Your Name <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={creatorName}
              onChange={(e) => onChange({ creatorName: e.target.value })}
              onFocus={() => soundService.playClick()}
              placeholder="e.g. Taylor"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-slate-100 text-sm focus:outline-none transition"
              required
            />
            <User className="w-4 h-4 text-pink-400 absolute left-3.5 top-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
