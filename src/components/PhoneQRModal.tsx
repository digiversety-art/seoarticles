import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import {
  Smartphone,
  X,
  Copy,
  Check,
  Share2,
  ExternalLink,
  QrCode,
  Sparkles,
  Info,
} from 'lucide-react';
import { SEOBlueprint } from '../types/seo';

interface PhoneQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  blueprint?: SEOBlueprint | null;
}

export const PhoneQRModal: React.FC<PhoneQRModalProps> = ({
  isOpen,
  onClose,
  blueprint,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [shareSupported, setShareSupported] = useState(false);
  const [targetUrl, setTargetUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareSupported(!!navigator.share);
      const url = window.location.href;
      setTargetUrl(url);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && canvasRef.current && targetUrl) {
      QRCode.toCanvas(
        canvasRef.current,
        targetUrl,
        {
          width: 220,
          margin: 1.5,
          color: {
            dark: '#0F172A',
            light: '#FFFFFF',
          },
        },
        (error) => {
          if (error) console.error('Error generating QR code', error);
        }
      );
    }
  }, [isOpen, targetUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blueprint
            ? `${blueprint.suggestedH1} | SEO Structure Planner`
            : 'SEO Article Structure Planner',
          text: blueprint
            ? `Check out this SEO content blueprint for "${blueprint.inputs.primaryKeyword}"`
            : 'Plan your SEO article structures on mobile.',
          url: targetUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-7 space-y-6 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Smartphone className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Apne Phone Par Preview Dekhein
              </h3>
              <p className="text-xs text-slate-500">
                Live mobile preview on your smartphone
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code Display Canvas */}
        <div className="flex flex-col items-center justify-center space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="p-2.5 bg-white rounded-xl shadow-xs border border-slate-200">
            <canvas ref={canvasRef} className="rounded-lg max-w-full" />
          </div>
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-slate-700" />
              <span>Camera se QR Code Scan Karein</span>
            </span>
            <p className="text-[11px] text-slate-500 max-w-xs">
              Phone ka camera open karke QR code par point karein aur link tap karein.
            </p>
          </div>
        </div>

        {/* Current Active Blueprint Info */}
        {blueprint && (
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs space-y-1">
            <div className="flex items-center justify-between text-blue-900 font-bold">
              <span>Active Blueprint:</span>
              <span className="font-mono text-[11px] bg-blue-100 px-2 py-0.5 rounded">
                {blueprint.inputs.primaryKeyword}
              </span>
            </div>
            <p className="text-blue-800 text-[11px] truncate">
              {blueprint.suggestedH1}
            </p>
          </div>
        )}

        {/* Action Link & Share Buttons */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={targetUrl}
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-700 truncate focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors shrink-0 shadow-xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          {shareSupported && (
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-200 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share to Phone / WhatsApp / Messaging</span>
            </button>
          )}
        </div>

        {/* Tip / Notice */}
        <div className="text-[11px] text-slate-500 flex items-start gap-1.5 pt-1 border-t border-slate-100">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span>
            Mobile browser par open karne par outline auto-adjust ho jayegi touch screen ke liye.
          </span>
        </div>
      </div>
    </div>
  );
};
