import React from 'react';
import { Palette, Check } from 'lucide-react';
import { THEMES } from '../../utils/themes';
import { ThemeId } from '../../types/invitation';
import { soundService } from '../../services/audioService';

interface StepThemeProps {
  selectedTheme: ThemeId;
  onChange: (themeId: ThemeId) => void;
}

export const StepTheme: React.FC<StepThemeProps> = ({ selectedTheme, onChange }) => {
  const themesList = Object.values(THEMES);

  const handleSelect = (id: ThemeId) => {
    soundService.playClick();
    onChange(id);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading font-bold text-2xl text-rose-300">
          Choose a Theme 🎨
        </h2>
        <p className="text-xs text-slate-400">
          Select a visual aesthetic for your date invitation. Each theme changes colors, cards, and floating elements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {themesList.map((t) => {
          const isSelected = selectedTheme === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => handleSelect(t.id)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all relative overflow-hidden ${
                isSelected
                  ? 'border-rose-500 ring-2 ring-rose-500/40 bg-slate-900 shadow-xl'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-rose-400" />
                  {t.name}
                </span>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-400 leading-normal">
                {t.subtitle}
              </p>

              {/* Theme color swatch preview */}
              <div className="flex items-center gap-1.5 pt-1">
                {t.floatingEmojis.slice(0, 4).map((emoji, i) => (
                  <span key={i} className="text-sm">{emoji}</span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
