import React, { useMemo } from 'react';

interface Particle {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

interface FloatingHeartsProps {
  emojis?: string[];
  count?: number;
}

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({
  emojis = ['💕', '✨', '💖', '💌', '🌸', '💘', '🌹'],
  count = 16
}) => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }).map((_, idx) => ({
      id: idx,
      emoji: emojis[idx % emojis.length],
      left: Math.random() * 100,
      size: 14 + Math.random() * 22,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * 10
    }));
  }, [emojis, count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float opacity-30 transition-opacity"
          style={{
            left: `${p.left}%`,
            bottom: `-50px`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationIterationCount: 'infinite'
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
};
