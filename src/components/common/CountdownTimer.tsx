import React, { useEffect, useState } from 'react';
import { Timer, Sparkles } from 'lucide-react';

interface CountdownTimerProps {
  targetDate?: string;
  targetTime?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, targetTime }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    if (!targetDate) return;

    const timeStr = targetTime || '18:00';
    const [h, m] = timeStr.split(':');
    const target = new Date(targetDate);
    target.setHours(parseInt(h || '18', 10), parseInt(m || '0', 10), 0, 0);

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = target.getTime() - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate, targetTime]);

  if (!timeLeft) return null;

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-amber-500/10 border border-rose-500/30 text-center space-y-2 my-3">
      <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold text-rose-300 uppercase tracking-wider">
        <Timer className="w-4 h-4 text-rose-400 animate-spin" style={{ animationDuration: '8s' }} />
        <span>Countdown to Our Outing ⏳</span>
      </div>

      <div className="flex items-center justify-center gap-3 text-white font-mono font-bold">
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl text-rose-300">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="text-[10px] font-sans text-slate-400 uppercase">Days</span>
        </div>
        <span className="text-rose-400 font-sans text-lg">:</span>
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl text-rose-300">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-[10px] font-sans text-slate-400 uppercase">Hours</span>
        </div>
        <span className="text-rose-400 font-sans text-lg">:</span>
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl text-rose-300">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-[10px] font-sans text-slate-400 uppercase">Mins</span>
        </div>
        <span className="text-rose-400 font-sans text-lg">:</span>
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl text-rose-300">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="text-[10px] font-sans text-slate-400 uppercase">Secs</span>
        </div>
      </div>
    </div>
  );
};
