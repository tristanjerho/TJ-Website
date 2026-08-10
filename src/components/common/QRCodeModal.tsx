import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { X, Download, Share2, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../../utils/sharing';
import { soundService } from '../../services/audioService';

interface QRCodeModalProps {
  url: string;
  recipientName: string;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ url, recipientName, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 240,
        margin: 2,
        color: {
          dark: '#e11d48',
          light: '#ffffff'
        }
      }, (err) => {
        if (err) console.error('QR code generation error:', err);
      });
    }
  }, [url]);

  const downloadQR = () => {
    soundService.playClick();
    if (!canvasRef.current) return;
    const pngUrl = canvasRef.current.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `date_invitation_qr_${recipientName.toLowerCase().replace(/\s+/g, '_')}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleCopy = async () => {
    soundService.playClick();
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-rose-500/30 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center relative space-y-4">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <span className="text-2xl">👀</span>
          <h3 className="font-heading font-bold text-lg text-rose-300">
            Let {recipientName} Scan This!
          </h3>
          <p className="text-xs text-slate-400">
            Show this QR code in person or send as an image
          </p>
        </div>

        {/* QR Code Canvas */}
        <div className="bg-white p-3 rounded-2xl inline-block shadow-lg mx-auto">
          <canvas ref={canvasRef} className="rounded-lg max-w-full" />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-semibold">
          <button
            onClick={downloadQR}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PNG</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
