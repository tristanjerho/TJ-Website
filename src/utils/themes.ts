import { ThemeConfig, ThemeId } from '../types/invitation';

export const THEMES: Record<ThemeId, ThemeConfig> = {
  'love-letter': {
    id: 'love-letter',
    name: 'Love Letter 💌',
    subtitle: 'Classic parchment romance with elegant script',
    backgroundClass: 'bg-gradient-to-br from-rose-100 via-amber-50 to-pink-100 text-rose-950',
    cardClass: 'bg-white/90 backdrop-blur-md border border-rose-200 shadow-xl shadow-rose-900/10 text-rose-900',
    textHeadingClass: 'font-script text-rose-800',
    textBodyClass: 'font-body text-rose-900',
    accentButtonClass: 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/30 ring-2 ring-rose-300',
    accentBadgeClass: 'bg-rose-100 text-rose-700 border border-rose-300',
    fontClass: 'font-script',
    floatingEmojis: ['💌', '💕', '🌹', '✨', '✉️', '💖']
  },
  'pink-dream': {
    id: 'pink-dream',
    name: 'Pink Dream 🌸',
    subtitle: 'Soft pastel glow, sweet candy vibes',
    backgroundClass: 'bg-gradient-to-tr from-pink-300 via-purple-200 to-rose-200 text-pink-950',
    cardClass: 'bg-white/80 backdrop-blur-lg border border-pink-300 shadow-2xl shadow-pink-500/20 text-pink-900',
    textHeadingClass: 'font-heading font-extrabold text-pink-700 drop-shadow-sm',
    textBodyClass: 'font-body text-pink-800',
    accentButtonClass: 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg shadow-pink-500/40',
    accentBadgeClass: 'bg-pink-200 text-pink-800 border border-pink-400',
    fontClass: 'font-heading',
    floatingEmojis: ['🌸', '💖', '✨', '🍬', '🌷', '🎀']
  },
  'midnight-romance': {
    id: 'midnight-romance',
    name: 'Midnight Romance 🌙',
    subtitle: 'Deep starry dark theme with gold accents',
    backgroundClass: 'bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-amber-50',
    cardClass: 'bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 shadow-2xl shadow-purple-900/50 text-slate-100',
    textHeadingClass: 'font-heading font-bold text-amber-300 drop-shadow-md',
    textBodyClass: 'font-body text-slate-200',
    accentButtonClass: 'bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 hover:opacity-95 text-white shadow-lg shadow-amber-500/25',
    accentBadgeClass: 'bg-amber-900/50 text-amber-300 border border-amber-500/40',
    fontClass: 'font-heading',
    floatingEmojis: ['✨', '🌙', '💫', '💍', '⭐', '🎆']
  },
  'sunset': {
    id: 'sunset',
    name: 'Sunset Glow 🌅',
    subtitle: 'Warm golden hour dusk with vibrant gradient',
    backgroundClass: 'bg-gradient-to-br from-orange-400 via-rose-500 to-purple-700 text-amber-950',
    cardClass: 'bg-white/85 backdrop-blur-md border border-orange-200 shadow-2xl shadow-orange-950/20 text-slate-900',
    textHeadingClass: 'font-heading font-black text-rose-600',
    textBodyClass: 'font-body text-slate-800',
    accentButtonClass: 'bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white shadow-lg shadow-amber-500/30',
    accentBadgeClass: 'bg-orange-100 text-orange-800 border border-orange-300',
    fontClass: 'font-heading',
    floatingEmojis: ['🌅', '🍹', '🌇', '💖', '🌴', '🔥']
  },
  'minimal-hearts': {
    id: 'minimal-hearts',
    name: 'Minimal Hearts 🤍',
    subtitle: 'Sleek, modern glassmorphism with crimson punch',
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-zinc-100',
    cardClass: 'bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/80 shadow-2xl text-zinc-100',
    textHeadingClass: 'font-heading font-extrabold text-red-500 tracking-tight',
    textBodyClass: 'font-body text-zinc-300',
    accentButtonClass: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 ring-1 ring-red-400',
    accentBadgeClass: 'bg-red-950/60 text-red-300 border border-red-800',
    fontClass: 'font-heading',
    floatingEmojis: ['❤️', '🖤', '🤍', '💌', '🥀', '⚡']
  },
  'cute-funny': {
    id: 'cute-funny',
    name: 'Cute & Funny 🧸',
    subtitle: 'Playful vibrant colors and cheery handwritten style',
    backgroundClass: 'bg-gradient-to-br from-yellow-100 via-pink-200 to-sky-200 text-slate-900',
    cardClass: 'bg-white/95 backdrop-blur-md border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] text-slate-900',
    textHeadingClass: 'font-handwriting text-indigo-600 text-3xl',
    textBodyClass: 'font-body text-slate-800 font-medium',
    accentButtonClass: 'bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-900 active:translate-x-0.5 active:translate-y-0.5',
    accentBadgeClass: 'bg-yellow-300 text-slate-900 border-2 border-slate-900 font-bold',
    fontClass: 'font-handwriting',
    floatingEmojis: ['🧸', '🍦', '🐥', '🎈', '🍕', '🎉']
  }
};

export const DATE_IDEAS = [
  { id: 'coffee', label: 'Coffee & Chat', emoji: '☕', description: 'Cozy cafe vibes and great conversation' },
  { id: 'dinner', label: 'Dinner', emoji: '🍝', description: 'Delicious food and great atmosphere' },
  { id: 'movie', label: 'Movie Night', emoji: '🎬', description: 'Popcorn, snacks, and a fun cinema experience' },
  { id: 'picnic', label: 'Park Picnic', emoji: '🧺', description: 'Blanket, snacks, sun, and laughter' },
  { id: 'arcade', label: 'Arcade & Games', emoji: '🎮', description: 'Friendly competition and retro fun' },
  { id: 'surprise', label: 'Surprise Adventure', emoji: '✨', description: 'Secret plan tailored just for you' }
];

export const MESSAGE_PRESETS = [
  { label: 'Cute 💕', text: "Hey Angel rose! I've been meaning to ask you something special... Would you go out with me? 😊" },
  { label: 'Romantic 🌹', text: "Spending time with you always makes my day brighter. I'd love to take you out!" },
  { label: 'Playful 😜', text: "Important question: Are you free to go out with me, or do I have to challenge you to a duel first? ⚔️" },
  { label: 'Simple ✨', text: "Hey! I would love to hang out and go out with you this week." },
  { label: 'Bold 🚀', text: "No more beating around the bush: let's go out together and create some awesome memories!" }
];
