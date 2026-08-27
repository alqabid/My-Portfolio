import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Lock,
  Mail,
  KeyRound,
  ShieldCheck,
  X,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Terminal
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { playSound } from '../../utils/sound';

export const AdminLoginModal: React.FC = () => {
  const {
    isAdminLoginModalOpen,
    setIsAdminLoginModalOpen,
    setIsAdminPortalOpen,
    loginAdmin
  } = usePortfolio();

  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAdminLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !pin.trim()) {
      setErrorMsg('Please provide both administrator email and security PIN.');
      playSound('pop');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const success = loginAdmin(email, pin);
      if (success) {
        playSound('unlock');
        setIsAdminLoginModalOpen(false);
        setIsAdminPortalOpen(true);
        setEmail('');
        setPin('');
      } else {
        playSound('pop');
        setErrorMsg('Invalid administrator credentials. Verify your email and security PIN.');
      }
      setIsSubmitting(false);
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        className="relative w-full max-w-md bg-[#0F0F11] text-[#EDEDED] border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-7 space-y-5 overflow-hidden font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
              <Terminal className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-sm text-white tracking-wide uppercase">
                ADMIN CONSOLE
              </h3>
              <span className="text-[11px] font-mono text-neutral-400 block">
                Portfolio Content Management System
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              playSound('click');
              setIsAdminLoginModalOpen(false);
            }}
            className="w-7 h-7 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Security Notice */}
        <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80 flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <p className="text-xs text-neutral-300 font-mono">
            Authenticated access required to modify portfolio data.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@domain.com"
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* PIN Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                Security PIN Code
              </label>
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="text-[10px] font-mono text-neutral-400 hover:text-neutral-200 flex items-center gap-1 cursor-pointer transition-colors"
              >
                {showPin ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>{showPin ? 'Hide' : 'Show'}</span>
              </button>
            </div>
            <div className="relative">
              <KeyRound className="w-3.5 h-3.5 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPin ? 'text' : 'password'}
                required
                maxLength={10}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••••"
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs font-mono tracking-widest text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-mono font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Console'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
