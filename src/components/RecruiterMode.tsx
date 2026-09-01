import React from 'react';
import { motion } from 'motion/react';
import {
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
  Phone,
  Code2,
  Brain,
  Palette,
  Terminal,
  Layers,
  Award,
  Globe,
  Share2
} from 'lucide-react';
import { RECRUITER_DATA } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';

interface RecruiterModeProps {
  onExitRecruiterMode: () => void;
}

export const RecruiterMode: React.FC<RecruiterModeProps> = ({ onExitRecruiterMode }) => {
  const { personalInfo: PERSONAL_INFO } = usePortfolio();

  const handlePrint = () => {
    playSound('pop');
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] pt-24 pb-20 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white">
      <div className="max-w-4xl mx-auto space-y-8 print:space-y-6">
        {/* Top Control Strip (Hidden in Print) */}
        <div className="print:hidden flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-display font-extrabold text-sm text-[#111111]">
              RECRUITER & RESUME FAST-TRACK MODE
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
        <div className="rounded-3xl bg-white border-3 border-[#111111] p-6 sm:p-12 shadow-[8px_8px_0px_0px_#111111] print:shadow-none print:border-none print:p-0 space-y-10">
          
          {/* Header */}
          <div className="border-b-2 border-[#111111] pb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-display font-black text-[#111111] tracking-tight">
                {RECRUITER_DATA.name}
              </h1>
              <p className="text-sm sm:text-base font-display font-extrabold text-[#333333] max-w-2xl leading-snug">
                {RECRUITER_DATA.title}
              </p>
              
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-[#555555] pt-2">
                <span className="flex items-center gap-1 font-semibold text-[#111111]">
                  <MapPin className="w-3.5 h-3.5 text-[#111111]" /> {RECRUITER_DATA.location}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#111111]" /> {RECRUITER_DATA.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#111111]" /> {RECRUITER_DATA.email}
                </span>
                <a
                  href={RECRUITER_DATA.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#111111] font-bold hover:underline"
                >
                  <Globe className="w-3.5 h-3.5" /> aqsmyportfolio.vercel.app
                </a>
              </div>
            </div>

            {/* Quick Contact Buttons (Hidden in Print) */}
            <div className="flex flex-wrap sm:flex-col gap-2 print:hidden shrink-0">
              <a
                href={`mailto:${RECRUITER_DATA.email}?subject=Recruiter%20Inquiry%20for%20Abdul%20Qabid`}
                className="px-4 py-2 rounded-xl bg-[#FFF35C] hover:bg-[#ffee38] text-[#111111] font-display font-bold text-xs border border-[#111111] shadow-[2px_2px_0px_0px_#111111] text-center transition-all flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Direct Email</span>
              </a>
              <a
                href={`https://wa.me/233238318021`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#111111] font-display font-bold text-xs border border-[#111111] shadow-[2px_2px_0px_0px_#111111] text-center transition-all flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp: {RECRUITER_DATA.whatsappNumber}</span>
              </a>
              <a
                href={RECRUITER_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#FAFAF7] hover:bg-neutral-100 text-[#111111] font-display font-bold text-xs border border-[#111111] text-center transition-all flex items-center justify-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={RECRUITER_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#FAFAF7] hover:bg-neutral-100 text-[#111111] font-display font-bold text-xs border border-[#111111] text-center transition-all flex items-center justify-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repos</span>
              </a>
            </div>
          </div>

          {/* 01 // PROFESSIONAL SUMMARY */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-wider text-[#111111] uppercase bg-[#FAFAF7] px-3 py-1 rounded-md border border-[#E0E0D8] inline-block">
              01 // PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm sm:text-base text-[#333333] leading-relaxed">
              {RECRUITER_DATA.summary}
            </p>
          </div>

          {/* 02 // CORE TECHNICAL & CREATIVE COMPETENCIES */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-wider text-[#111111] uppercase bg-[#FAFAF7] px-3 py-1 rounded-md border border-[#E0E0D8] inline-block">
              02 // CORE TECHNICAL & CREATIVE COMPETENCIES
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-[#FAFAF7] border border-[#111111] space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#111111] flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" /> PROGRAMMING & DATABASES
                </span>
                <div className="flex flex-wrap gap-1">
                  {RECRUITER_DATA.skills.programming.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-[#D0D0C8] text-[11px] font-semibold text-[#111111]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFAF7] border border-[#111111] space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#111111] flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5" /> PROMPT ENGINEERING & GENAI
                </span>
                <div className="flex flex-wrap gap-1">
                  {RECRUITER_DATA.skills.genai.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-[#D0D0C8] text-[11px] font-semibold text-[#111111]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFAF7] border border-[#111111] space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#111111] flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> FRONTEND & WEB ARCHITECTURE
                </span>
                <div className="flex flex-wrap gap-1">
                  {RECRUITER_DATA.skills.frontend.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-[#D0D0C8] text-[11px] font-semibold text-[#111111]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFAF7] border border-[#111111] space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#111111] flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" /> GRAPHIC DESIGN & UI/UX
                </span>
                <div className="flex flex-wrap gap-1">
                  {RECRUITER_DATA.skills.design_uiux.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-[#D0D0C8] text-[11px] font-semibold text-[#111111]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFAF7] border border-[#111111] space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#111111] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> BACKEND & CLOUD INFRASTRUCTURE
                </span>
                <div className="flex flex-wrap gap-1">
                  {RECRUITER_DATA.skills.backend_cloud.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-[#D0D0C8] text-[11px] font-semibold text-[#111111]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFAF7] border border-[#111111] space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#111111] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> AR & CREATIVE TECHNOLOGY
                </span>
                <div className="flex flex-wrap gap-1">
                  {RECRUITER_DATA.skills.ar_creative.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-[#D0D0C8] text-[11px] font-semibold text-[#111111]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFAF7] border border-[#111111] space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#111111] flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5" /> AI & MACHINE LEARNING
                </span>
                <div className="flex flex-wrap gap-1">
                  {RECRUITER_DATA.skills.ai_ml.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-[#D0D0C8] text-[11px] font-semibold text-[#111111]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFAF7] border border-[#111111] space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#111111] flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> VERSION CONTROL & TOOLING
                </span>
                <div className="flex flex-wrap gap-1">
                  {RECRUITER_DATA.skills.tooling.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-[#D0D0C8] text-[11px] font-semibold text-[#111111]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 03 // SOFTWARE ENGINEERING & PRODUCT DEVELOPMENT PROJECTS */}
          <div className="space-y-6">
            <h2 className="text-xs font-mono font-bold tracking-wider text-[#111111] uppercase bg-[#FAFAF7] px-3 py-1 rounded-md border border-[#E0E0D8] inline-block">
              03 // SOFTWARE ENGINEERING & PRODUCT DEVELOPMENT PROJECTS
            </h2>

            <div className="space-y-5">
              {RECRUITER_DATA.softwareProjects.map((p, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#FAFAF7] border border-[#111111] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-display font-extrabold text-[#111111] flex items-center gap-2">
                        <span>{p.title}</span>
                        <span className="text-[#666666] font-normal text-xs sm:text-sm">| {p.role}</span>
                      </h3>
                      <p className="text-xs font-mono text-[#555555]">{p.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-2 self-start print:hidden">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-white border border-[#111111] text-[11px] font-mono font-bold text-[#111111] hover:bg-[#F0F0EA] flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" /> Live
                        </a>
                      )}
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-white border border-[#111111] text-[11px] font-mono font-bold text-[#111111] hover:bg-[#F0F0EA] flex items-center gap-1"
                        >
                          <Github className="w-3 h-3" /> Code
                        </a>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#444444]">
                    {p.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-1.5 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 flex flex-wrap gap-1">
                    {p.technologies.map((t, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-white text-[10px] font-mono border border-[#E0E0D8]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 04 // DESIGN, AI & CREATIVE TECHNOLOGY EXPERIENCE */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-wider text-[#111111] uppercase bg-[#FAFAF7] px-3 py-1 rounded-md border border-[#E0E0D8] inline-block">
              04 // DESIGN, AI & CREATIVE TECHNOLOGY EXPERIENCE
            </h2>

            <div className="space-y-4">
              {RECRUITER_DATA.creativeAiExperience.map((c, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#111111] space-y-2">
                  <h4 className="font-display font-extrabold text-sm text-[#111111]">
                    {c.area}
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#444444]">
                    {c.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-1.5 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 05 // PROFESSIONAL & ENTREPRENEURIAL EXPERIENCE */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-wider text-[#111111] uppercase bg-[#FAFAF7] px-3 py-1 rounded-md border border-[#E0E0D8] inline-block">
              05 // PROFESSIONAL & ENTREPRENEURIAL EXPERIENCE
            </h2>

            <div className="space-y-4">
              {RECRUITER_DATA.entrepreneurialAndCorporate.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#111111] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h4 className="font-display font-extrabold text-sm text-[#111111]">
                        {item.company}
                      </h4>
                      <p className="text-xs text-[#555555]">
                        {item.role} · {item.location}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#111111]">
                      {item.period}
                    </span>
                  </div>
                  <ul className="space-y-1 text-xs sm:text-sm text-[#444444]">
                    {item.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-1.5 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 06 // LEADERSHIP & INSTITUTIONAL INVOLVEMENT */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-wider text-[#111111] uppercase bg-[#FAFAF7] px-3 py-1 rounded-md border border-[#E0E0D8] inline-block">
              06 // LEADERSHIP & INSTITUTIONAL INVOLVEMENT
            </h2>

            <div className="space-y-4">
              {RECRUITER_DATA.leadership.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#111111] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h4 className="font-display font-extrabold text-sm text-[#111111]">
                        {item.role}
                      </h4>
                      <p className="text-xs text-[#555555]">
                        {item.institution} · {item.location}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#111111]">
                      {item.period}
                    </span>
                  </div>
                  <ul className="space-y-1 text-xs sm:text-sm text-[#444444]">
                    {item.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-1.5 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 07 // EDUCATION */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-wider text-[#111111] uppercase bg-[#FAFAF7] px-3 py-1 rounded-md border border-[#E0E0D8] inline-block">
              07 // EDUCATION
            </h2>

            {RECRUITER_DATA.education.map((edu, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#FAFAF7] border border-[#111111] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-display font-extrabold text-base text-[#111111]">
                      {edu.degree}
                    </h4>
                    <p className="text-xs font-medium text-[#444444]">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-[#666666]">
                      {edu.school} · {edu.location}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white border border-[#111111] text-xs font-mono font-bold text-[#111111] self-start">
                    {edu.period}
                  </span>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-mono font-bold text-[#111111] block mb-1.5">
                    CORE COURSEWORK:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course, cIdx) => (
                      <span key={cIdx} className="px-2 py-0.5 rounded-md bg-white border border-[#D0D0C8] text-[11px] font-medium text-[#333333]">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="space-y-1 text-xs text-[#555555] pt-1">
                  {edu.highlights.map((hl, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-1.5 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 08 // PROFESSIONAL EXPERTISE OVERVIEW */}
          <div className="space-y-3 pt-2 border-t-2 border-[#111111]">
            <h2 className="text-xs font-mono font-bold tracking-wider text-[#111111] uppercase bg-[#FAFAF7] px-3 py-1 rounded-md border border-[#E0E0D8] inline-block">
              08 // PROFESSIONAL EXPERTISE OVERVIEW
            </h2>
            <div className="flex flex-wrap gap-2 pt-1">
              {RECRUITER_DATA.expertiseOverview.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-[#FFF35C] border border-[#111111] text-xs font-display font-extrabold text-[#111111] shadow-[2px_2px_0px_0px_#111111]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

