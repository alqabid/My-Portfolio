import React from 'react';
import { motion } from 'motion/react';
import {
  Download,
  Printer,
  Mail,
  Linkedin,
  Github,
  MapPin,
  ExternalLink,
  Compass,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Sparkles,
  Phone
} from 'lucide-react';
import { RECRUITER_DATA } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';

interface RecruiterModeProps {
  onExitRecruiterMode: () => void;
}

export const RecruiterMode: React.FC<RecruiterModeProps> = ({ onExitRecruiterMode }) => {
  const { personalInfo: PERSONAL_INFO, buildProjects: BUILD_PROJECTS, experience: DYNAMIC_EXP } = usePortfolio();
  const handlePrint = () => {
    playSound('pop');
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Control Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-display font-extrabold text-sm text-[#111111]">
              RECRUITER FAST-TRACK MODE (30-SEC SUMMARY)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-100 text-[#111111] font-display font-bold text-xs border border-[#111111] shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={() => {
                playSound('switch');
                onExitRecruiterMode();
              }}
              className="px-4 py-2 rounded-xl bg-[#111111] text-[#FFF35C] font-display font-bold text-xs border border-[#111111] shadow-[2px_2px_0px_0px_#FFF35C] flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Return to Explore Mode</span>
            </button>
          </div>
        </div>

        {/* The Printable Resume Container */}
        <div className="rounded-3xl bg-white border-3 border-[#111111] p-6 sm:p-12 shadow-[8px_8px_0px_0px_#111111] space-y-10">
          {/* Header */}
          <div className="border-b-2 border-[#111111] pb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-display font-black text-[#111111] tracking-tight">
                {RECRUITER_DATA.name}
              </h1>
              <p className="text-base font-display font-bold text-[#444444]">
                {RECRUITER_DATA.title}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#666666] pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#111111]" /> {RECRUITER_DATA.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#111111]" /> {RECRUITER_DATA.email}
                </span>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-wrap sm:flex-col gap-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Recruiter%20Inquiry%20for%20Abdul%20Qabid`}
                className="px-4 py-2 rounded-xl bg-[#FFF35C] text-[#111111] font-display font-bold text-xs border border-[#111111] shadow-[2px_2px_0px_0px_#111111] text-center hover:bg-[#ffee38] transition-all"
              >
                Direct Email
              </a>
              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#111111] font-display font-bold text-xs border border-[#111111] shadow-[2px_2px_0px_0px_#111111] text-center transition-all"
              >
                WhatsApp Direct
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#FAFAF7] hover:bg-neutral-100 text-[#111111] font-display font-bold text-xs border border-[#111111] text-center transition-all"
              >
                LinkedIn Profile
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#FAFAF7] hover:bg-neutral-100 text-[#111111] font-display font-bold text-xs border border-[#111111] text-center transition-all"
              >
                GitHub Repos
              </a>
              <a
                href={PERSONAL_INFO.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#FAFAF7] hover:bg-neutral-100 text-[#111111] font-display font-bold text-xs border border-[#111111] text-center transition-all"
              >
                Snapchat AR Creator
              </a>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-wider text-[#111111] uppercase bg-[#FAFAF7] px-3 py-1 rounded-md border border-[#E0E0D8] inline-block">
              01 // EXECUTIVE SUMMARY
            </h2>
            <p className="text-sm sm:text-base text-[#333333] leading-relaxed">
              {RECRUITER_DATA.summary}
            </p>
          </div>

          {/* Core Technical Stack */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-wider text-[#111111] uppercase bg-[#FAFAF7] px-3 py-1 rounded-md border border-[#E0E0D8] inline-block">
              02 // SKILLS & COMPETENCIES
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#111111]">
                <span className="text-xs font-mono font-bold text-[#111111] block mb-2">
                  LANGUAGES & FRAMEWORKS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[...RECRUITER_DATA.skills.languages, ...RECRUITER_DATA.skills.frameworks].map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-[#D0D0C8] text-xs font-semibold text-[#111111]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#111111]">
                <span className="text-xs font-mono font-bold text-[#111111] block mb-2">
                  CREATIVE & AR TOOLS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {RECRUITER_DATA.skills.tools.map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-[#D0D0C8] text-xs font-semibold text-[#111111]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-6">
            <h2 className="text-xs font-mono font-bold tracking-wider text-[#111111] uppercase bg-[#FAFAF7] px-3 py-1 rounded-md border border-[#E0E0D8] inline-block">
              03 // EXPERIENCE TIMELINE
            </h2>

            <div className="space-y-6">
              {DYNAMIC_EXP.map((exp, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#FAFAF7] border border-[#111111] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-base font-display font-extrabold text-[#111111]">
                        {exp.role} · <span className="text-[#555555] font-bold">{exp.company}</span>
                      </h3>
                      <span className="text-xs font-mono text-[#777777]">{exp.location}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white border border-[#111111] text-xs font-mono font-bold text-[#111111] self-start">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#444444]">
                    {exp.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-1.5 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 flex flex-wrap gap-1">
                    {exp.technologies.map((t, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-white text-[10px] font-mono border border-[#E0E0D8]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-wider text-[#111111] uppercase bg-[#FAFAF7] px-3 py-1 rounded-md border border-[#E0E0D8] inline-block">
              04 // EDUCATION
            </h2>

            {RECRUITER_DATA.education.map((edu, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#111111] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-display font-extrabold text-sm text-[#111111]">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-[#555555]">
                    {edu.institution} · {edu.location}
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#111111]">
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
