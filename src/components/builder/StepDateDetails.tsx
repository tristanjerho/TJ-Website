import React, { useState } from 'react';
import { Calendar, Clock, MapPin, StickyNote, Image as ImageIcon, Sparkles, X } from 'lucide-react';
import { DATE_IDEAS } from '../../utils/themes';
import { DateIdeaType } from '../../types/invitation';
import { soundService } from '../../services/audioService';

interface StepDateDetailsProps {
  dateIdea: string;
  date?: string;
  time?: string;
  location?: string;
  notes?: string;
  photoUrl?: string;
  onChange: (fields: {
    dateIdea?: string;
    date?: string;
    time?: string;
    location?: string;
    notes?: string;
    photoUrl?: string;
  }) => void;
}

export const StepDateDetails: React.FC<StepDateDetailsProps> = ({
  dateIdea,
  date,
  time,
  location,
  notes,
  photoUrl,
  onChange
}) => {
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(photoUrl);

  const handleIdeaSelect = (ideaId: string) => {
    soundService.playClick();
    onChange({ dateIdea: ideaId });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundService.playClick();
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        onChange({ photoUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    soundService.playClick();
    setPhotoPreview(undefined);
    onChange({ photoUrl: undefined });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading font-bold text-2xl text-rose-300">
          Outing Details ✨
        </h2>
        <p className="text-xs text-slate-400">
          Pick an activity idea and optional location or time details.
        </p>
      </div>

      {/* Activity Idea Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-300">
          Choose an Activity Idea 💡
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {DATE_IDEAS.map((idea) => {
            const isSelected = dateIdea === idea.id;
            return (
              <button
                key={idea.id}
                type="button"
                onClick={() => handleIdeaSelect(idea.id)}
                className={`p-3 rounded-2xl border text-left flex flex-col items-start gap-1 transition-all ${
                  isSelected
                    ? 'bg-rose-500/20 border-rose-500 text-rose-200 ring-2 ring-rose-500/30'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="text-2xl">{idea.emoji}</span>
                <span className="text-xs font-bold">{idea.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Date & Time Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Date */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">
            Date (Optional)
          </label>
          <div className="relative">
            <input
              type="date"
              value={date || ''}
              onChange={(e) => onChange({ date: e.target.value })}
              onFocus={() => soundService.playClick()}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 focus:border-rose-500 text-slate-100 text-xs focus:outline-none transition"
            />
            <Calendar className="w-4 h-4 text-rose-400 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Time */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">
            Time (Optional)
          </label>
          <div className="relative">
            <input
              type="time"
              value={time || ''}
              onChange={(e) => onChange({ time: e.target.value })}
              onFocus={() => soundService.playClick()}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 focus:border-rose-500 text-slate-100 text-xs focus:outline-none transition"
            />
            <Clock className="w-4 h-4 text-pink-400 absolute left-3.5 top-3.5" />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-300">
          Location or Venue (Optional)
        </label>
        <div className="relative">
          <input
            type="text"
            value={location || ''}
            onChange={(e) => onChange({ location: e.target.value })}
            onFocus={() => soundService.playClick()}
            placeholder="e.g. Baguio City Cafe & Bistro"
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 focus:border-rose-500 text-slate-100 text-sm focus:outline-none transition"
          />
          <MapPin className="w-4 h-4 text-rose-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-300">
          Extra Notes / Dress Code (Optional)
        </label>
        <div className="relative">
          <input
            type="text"
            value={notes || ''}
            onChange={(e) => onChange({ notes: e.target.value })}
            onFocus={() => soundService.playClick()}
            placeholder="e.g. Wear something comfortable!"
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 focus:border-rose-500 text-slate-100 text-sm focus:outline-none transition"
          />
          <StickyNote className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Photo Upload */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
          Add a Photo Together (Optional 📸)
        </label>

        {photoPreview ? (
          <div className="relative rounded-2xl overflow-hidden border border-rose-500/40 max-h-48">
            <img src={photoPreview} alt="Uploaded date preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={removePhoto}
              className="absolute top-2 right-2 p-1.5 bg-slate-950/80 hover:bg-red-600 text-white rounded-full transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-800 hover:border-rose-500/50 rounded-2xl bg-slate-900/50 cursor-pointer transition">
            <Sparkles className="w-6 h-6 text-rose-400 mb-1" />
            <span className="text-xs font-semibold text-slate-300">Click to upload a cute memory photo</span>
            <span className="text-[11px] text-slate-500">PNG, JPG, or WEBP</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        )}
      </div>
    </div>
  );
};
