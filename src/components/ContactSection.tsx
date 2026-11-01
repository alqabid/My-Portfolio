import React, { useState } from 'react';
import {
  Mail,
  Send,
  MessageSquare,
  Linkedin,
  Github,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Glasses
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

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

    setIsSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="rounded-2xl bg-neutral-900 text-white p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Links & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
                Let's discuss your next project.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-md">
              Have an engineering opportunity, digital product, or creative campaign in mind? Reach out directly via WhatsApp, email, or through the inquiry form.
            </p>

            {/* Direct Email Box (No borders) */}
            <div className="p-4 rounded-xl bg-neutral-800 flex items-center justify-between gap-3 max-w-md">
              <div className="flex items-center gap-3 truncate">
                <div className="w-9 h-9 rounded-lg bg-neutral-700 flex items-center justify-center text-white shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] text-neutral-400 block uppercase font-medium">
                    Direct Email
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white truncate block">
                    {PERSONAL_INFO.email}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Contact Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Direct</span>
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Project%20Inquiry`}
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Email Client</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-6 bg-neutral-800/60 p-6 sm:p-8 rounded-2xl">
            {isSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">
                  Message Transmitted
                </h3>
                <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                  Thank you, {formData.name}. Your note has been dispatched directly. I will follow up promptly via {formData.email}.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', projectType: 'Full-Stack Web App', message: '' });
                  }}
                  className="px-4 py-2 rounded-xl bg-white text-neutral-900 font-medium text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Mensah"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 text-white placeholder:text-neutral-500 text-xs focus:outline-none focus:ring-1 focus:ring-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. samuel@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 text-white placeholder:text-neutral-500 text-xs focus:outline-none focus:ring-1 focus:ring-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">
                    Focus / Discipline
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 text-white text-xs focus:outline-none focus:ring-1 focus:ring-white transition-all"
                  >
                    <option value="Full-Stack Web App">Software Engineering (React, TS, Python)</option>
                    <option value="Event Flyer / Branding">Graphic Design & Marketing Collateral</option>
                    <option value="Snapchat Lens / AR">Snapchat Lens Studio AR</option>
                    <option value="Consulting / General">General Inquiry / Full-Time Role</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">
                    Project Overview or Note
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe what you are looking to build or achieve..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 text-white placeholder:text-neutral-500 text-xs focus:outline-none focus:ring-1 focus:ring-white transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
