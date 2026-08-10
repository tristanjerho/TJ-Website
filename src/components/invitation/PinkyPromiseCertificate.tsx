import React, { useRef } from 'react';
import { Award, Download, X, Heart, Sparkles } from 'lucide-react';
import { Invitation } from '../../types/invitation';
import { soundService } from '../../services/audioService';

interface PinkyPromiseCertificateProps {
  invitation: Invitation;
  onClose: () => void;
}

export const PinkyPromiseCertificate: React.FC<PinkyPromiseCertificateProps> = ({ invitation, onClose }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = () => {
    soundService.playClick();
    alert("Pinky Promise Certificate saved to your memory memories! 💕");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-rose-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-6 text-center">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Certificate Card Printable Body */}
        <div 
          ref={certificateRef}
          className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 via-rose-50 to-pink-100 text-rose-950 border-4 border-amber-300 shadow-xl space-y-4 relative overflow-hidden"
        >
          <div className="flex items-center justify-center gap-2">
            <Award className="w-6 h-6 text-amber-600" />
            <span className="font-script text-2xl font-bold text-rose-800">
              Pinky Promise Certificate 📜
            </span>
          </div>

          <p className="text-xs uppercase font-extrabold tracking-widest text-amber-800">
            Official Outing Agreement
          </p>

          <div className="space-y-2 py-2 border-y border-rose-200 text-xs leading-relaxed font-medium">
            <p>
              This certifies that <strong className="text-rose-700 font-bold text-sm">{invitation.recipientName || 'Angel rose (Yahoo)'}</strong> and <strong className="text-rose-700 font-bold text-sm">{invitation.creatorName || 'TJ'}</strong> are officially going out! 💕
            </p>
            <div className="text-[11px] text-rose-900/80 space-y-1 pt-1 font-semibold">
              <p>• Clause 1: No take-backs allowed under romantic law.</p>
              <p>• Clause 2: TJ promises to bring unlimited smiles, good vibes & great food.</p>
              <p>• Clause 3: Angel rose (Yahoo) gets 100% decision power.</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-bold text-rose-800 pt-2">
            <span>Date: {invitation.date || 'Soon'}</span>
            <span className="font-script text-sm text-rose-600">Signed in Heart Ink 💕</span>
          </div>
        </div>

        <button
          onClick={downloadCertificate}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:brightness-110 text-white font-extrabold text-xs rounded-xl shadow-lg transition"
        >
          <Download className="w-4 h-4" />
          <span>Save Pinky Promise Certificate 📸</span>
        </button>

      </div>
    </div>
  );
};
