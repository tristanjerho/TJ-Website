import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { soundService } from '../../services/audioService';

interface PlayfulNoButtonProps {
  onDecline?: () => void;
  accentClass?: string;
}

const NO_MESSAGES = [
  "NO 😢",
  "Are you sure? 🥺",
  "Think again! 😭",
  "That button seems broken... 🛠️",
  "Nice try 😂",
  "I think you meant YES ❤️",
  "You're breaking my heart 💔",
  "Fine. I'll be over here eating ice cream 🍦",
  "Why are you running? 🏃‍♂️",
  "Still trying? 😜",
  "Catch me if you can! 💨",
  "Error 404: NO not found 🚫",
  "Just click YES already! 💖",
  "You know you want to say YES 💕"
];

export const PlayfulNoButton: React.FC<PlayfulNoButtonProps> = ({ accentClass }) => {
  const [attemptCount, setAttemptCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const dodge = () => {
    soundService.playDodge();
    setAttemptCount((prev) => prev + 1);

    // Calculate dynamic dodge offset (range +- 160px X, +- 100px Y)
    const maxX = 150;
    const maxY = 90;
    let randomX = (Math.random() - 0.5) * 2 * maxX;
    let randomY = (Math.random() - 0.5) * 2 * maxY;

    // Ensure it actually jumps away noticeably
    if (Math.abs(randomX) < 40) randomX = randomX >= 0 ? 80 : -80;
    if (Math.abs(randomY) < 30) randomY = randomY >= 0 ? 60 : -60;

    setPosition({ x: randomX, y: randomY });
  };

  const handlePointerEnter = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dodge();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dodge();
  };

  const currentText = NO_MESSAGES[attemptCount % NO_MESSAGES.length];

  return (
    <div ref={containerRef} className="relative inline-block">
      <motion.button
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 350, damping: 18 }}
        onMouseEnter={handlePointerEnter}
        onTouchStart={handlePointerEnter}
        onClick={handleClick}
        className={`px-6 py-3 rounded-2xl text-sm font-semibold text-slate-700 bg-slate-200/90 hover:bg-slate-300 border border-slate-300 shadow-md transition-colors cursor-pointer select-none ${
          accentClass || ''
        }`}
      >
        {currentText}
      </motion.button>
    </div>
  );
};
