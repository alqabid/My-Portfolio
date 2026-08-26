import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Send,
  Sparkles,
  MessageSquare,
  Linkedin,
  Github,
  CheckCircle2,
  FileText,
  Copy,
  Check,
  ExternalLink,
  Glasses
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';

interface ContactSectionProps {
  initialServiceInterest?: string;
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialServiceInterest = '',
  onOpenResume
}) => {
  const { personalInfo: PERSONAL_INFO, addContactMessage } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: initialServiceInterest || 'Full-Stack Web App',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    addContactMessage({
      name: formData.name,
      email: formData.email,
      projectType: formData.projectType,
      message: formData.message
    });

    playSound('pop');
    setIsSubmitted(true);
  };

  const handleCopyEmail = () => {
    playSound('click');
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-[#111111] text-white border-3 border-[#111111] p-6 sm:p-12 shadow-[8px_8px_0px_0px_#FFF35C] relative overflow-hidden">
        {/* Ambient subtle pastel glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFF35C]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C9B8FF]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Links & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold tracking-wider uppercase text-[#FFF35C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LET'S COLLABORATE</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight leading-none">
              LET'S BUILD SOMETHING.
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-md">
              Have an idea, project, campaign, web application, or AR lens experience in mind? Let's turn it into something people can actually interact with.
            </p>

            {/* Quick Email Pill */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-between gap-3 max-w-md">
              <div className="flex items-center gap-3 truncate">
                <div className="w-10 h-10 rounded-xl bg-[#FFF35C] flex items-center justify-center text-[#111111] shrink-0 font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] font-mono text-neutral-400 block uppercase">
                    PRIMARY INBOX
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-white truncate block">
                    {PERSONAL_INFO.email}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shrink-0"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Channel Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Project%20Inquiry%20from%20Portfolio`}
                className="px-4 py-2.5 rounded-xl bg-[#FFF35C] text-[#111111] font-display font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#ffee38] transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>EMAIL DIRECTLY</span>
              </a>

              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#111111] font-display font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WHATSAPP</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs border border-white/20 flex items-center gap-1.5 transition-all"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
                <span>LINKEDIN</span>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs border border-white/20 flex items-center gap-1.5 transition-all"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB</span>
              </a>

              <a
                href={PERSONAL_INFO.snapchatCreator}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#FFF35C]/20 hover:bg-[#FFF35C]/30 text-[#FFF35C] font-display font-bold text-xs border border-[#FFF35C]/40 flex items-center gap-1.5 transition-all"
                title="Snapchat Lens Creator Hub"
              >
                <Glasses className="w-4 h-4" />
                <span>AR CREATOR</span>
              </a>

              <a
                href={PERSONAL_INFO.snapchatAccount}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#C9B8FF]/20 hover:bg-[#C9B8FF]/30 text-[#C9B8FF] font-display font-bold text-xs border border-[#C9B8FF]/40 flex items-center gap-1.5 transition-all"
                title="Add on Snapchat (@big_qabid)"
              >
                <span>👻 @BIG_QABID</span>
              </a>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-6 bg-white text-[#111111] p-6 sm:p-8 rounded-3xl border-2 border-white/20 shadow-xl">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#B9F5D0] border-2 border-[#111111] flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#111111]">
                  <CheckCircle2 className="w-8 h-8 text-[#111111]" />
                </div>
                <h3 className="text-2xl font-display font-black text-[#111111]">
                  MESSAGE DISPATCHED!
                </h3>
                <p className="text-sm text-[#555555] max-w-xs mx-auto">
                  Thank you for reaching out, {formData.name}. Abdul will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', projectType: 'Full-Stack Web App', message: '' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#111111] text-[#FFF35C] font-display font-bold text-xs cursor-pointer"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#ECECE4]">
                  <span className="font-display font-extrabold text-base text-[#111111]">
                    PROJECT INQUIRY FORM
                  </span>
                  <span className="text-[11px] font-mono text-[#777777]">
                    Typically replies in &lt; 24h
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#555555] uppercase block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAF7] border-2 border-[#111111] text-xs sm:text-sm font-medium text-[#111111] focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#555555] uppercase block">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAF7] border-2 border-[#111111] text-xs sm:text-sm font-medium text-[#111111] focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#555555] uppercase block">
                    Project Focus / Category
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAF7] border-2 border-[#111111] text-xs sm:text-sm font-medium text-[#111111] focus:outline-none focus:bg-white cursor-pointer"
                  >
                    <option value="Full-Stack Web App">Full-Stack Web App (React / FastAPI / Node)</option>
                    <option value="AI & Computer Vision Model">AI & Computer Vision Model</option>
                    <option value="YouTube Thumbnails & Visuals">YouTube Thumbnails & Visuals</option>
                    <option value="Snapchat AR Lens Studio Project">Snapchat AR Lens Studio Project</option>
                    <option value="Brand Identity & Marketing Suite">Brand Identity & Marketing Suite</option>
                    <option value="Engineering Job Opportunity">Engineering Job Opportunity</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#555555] uppercase block">
                    Project Scope / Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your timeline, goals, or idea..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAF7] border-2 border-[#111111] text-xs sm:text-sm font-medium text-[#111111] focus:outline-none focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#111111] hover:bg-[#222222] text-[#FFF35C] font-display font-bold text-xs tracking-wider uppercase border-2 border-[#111111] shadow-[3px_3px_0px_0px_#FFF35C] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>TRANSMIT INQUIRY</span>
                  <Send className="w-4 h-4 text-[#FFF35C]" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
