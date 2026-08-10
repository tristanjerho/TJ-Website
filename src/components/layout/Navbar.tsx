import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, PlusCircle, LayoutDashboard, Sparkles, Volume2, VolumeX, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { soundService } from '../../services/audioService';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, loginGoogle, logout } = useAuth();
  const [isMuted, setIsMuted] = useState(soundService.getMuted());
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleSound = () => {
    const muted = soundService.toggleMute();
    setIsMuted(muted);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-rose-500/20 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 group focus:outline-none"
          onClick={() => soundService.playClick()}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/30 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 text-white fill-white animate-pulse-slow" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-script text-2xl font-bold bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200 bg-clip-text text-transparent">
              DateInvite
            </span>
            <span className="text-[10px] text-rose-300/70 font-medium tracking-wider uppercase -mt-1">
              Ask Them Out 💕
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/demo"
            onClick={() => soundService.playClick()}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isActive('/demo')
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Try Demo</span>
          </Link>

          <Link
            to="/create"
            onClick={() => soundService.playClick()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/30 hover:brightness-110 active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Link 💌</span>
          </Link>

          <Link
            to="/dashboard"
            onClick={() => soundService.playClick()}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isActive('/dashboard')
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleSound}
            title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            className="p-2 rounded-full text-slate-400 hover:text-rose-300 hover:bg-slate-800/60 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-rose-400" />}
          </button>

          {/* User Profile / Auth */}
          {user && !user.isGuest ? (
            <button
              onClick={() => logout()}
              title={`Logged in as ${user.displayName}. Click to logout.`}
              className="hidden md:flex items-center gap-2 text-xs text-slate-300 hover:text-rose-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full transition"
            >
              <User className="w-3.5 h-3.5 text-rose-400" />
              <span className="max-w-[80px] truncate">{user.displayName}</span>
              <LogOut className="w-3 h-3 text-slate-400 hover:text-red-400" />
            </button>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-rose-300 border border-slate-800 hover:border-rose-500/40 px-3 py-1.5 rounded-full transition"
            >
              <LogIn className="w-3.5 h-3.5 text-rose-400" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-rose-500/30 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center relative">
            <h3 className="font-heading font-bold text-xl text-rose-300 mb-2">Creator Account 💕</h3>
            <p className="text-xs text-slate-400 mb-6">
              Sign in with Google to sync your date invitations across devices, or continue in Guest mode instantly!
            </p>

            <button
              onClick={async () => {
                await loginGoogle();
                setShowAuthModal(false);
              }}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm rounded-2xl shadow-md transition mb-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Sign in with Google
            </button>

            <button
              onClick={() => setShowAuthModal(false)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl transition"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
