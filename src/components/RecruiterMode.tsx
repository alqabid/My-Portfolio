import React from 'react';
import {
  Printer,
  Mail,
  Linkedin,
  Github,
  MapPin,
  ExternalLink,
  Compass,
  Phone,
  Code2,
  Brain,
  Palette,
  Terminal,
  Layers,
  Glasses,
  Globe
} from 'lucide-react';
import { RECRUITER_DATA } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface RecruiterModeProps {
  onExitRecruiterMode: () => void;
}

export const RecruiterMode: React.FC<RecruiterModeProps> = ({ onExitRecruiterMode }) => {
  const { personalInfo: PERSONAL_INFO, experience } = usePortfolio();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-4 sm:px-8 print:p-0 print:bg-white">
      <div className="max-w-4xl mx-auto space-y-8 print:space-y-6">
        {/* Top Control Strip (Hidden in Print) */}
        <div className="print:hidden flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-50">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900">
            <span>Recruiter & Printable Resume View</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-200/60 text-neutral-900 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onExitRecruiterMode}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Return to Portfolio</span>
            </button>
          </div>
        </div>

        {/* The Printable Resume Container (Zero borders) */}
        <div className="rounded-2xl bg-white p-6 sm:p-12 print:p-0 space-y-10">
          
          {/* Header */}
          <div className="border-b border-neutral-100 pb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-950 tracking-tight">
                {PERSONAL_INFO.name || RECRUITER_DATA.name}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-neutral-700 max-w-2xl leading-snug">
                {PERSONAL_INFO.titles || RECRUITER_DATA.title}
              </p>
              
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-neutral-600 pt-2">
                <span className="flex items-center gap-1 font-medium text-neutral-900">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" /> {(PERSONAL_INFO.location || RECRUITER_DATA.location).replace('🇬🇭', '').trim()}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-neutral-500" /> {RECRUITER_DATA.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-neutral-500" /> {RECRUITER_DATA.email}
                </span>
                <a
                  href={RECRUITER_DATA.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-neutral-900 font-medium hover:underline"
                >
                  <Globe className="w-3.5 h-3.5" /> aqsmyportfolio.vercel.app
                </a>
              </div>
            </div>

            {/* Quick Contact Buttons (Hidden in Print) */}
            <div className="flex flex-wrap sm:flex-col gap-2 print:hidden shrink-0">
              <a
                href={`mailto:${RECRUITER_DATA.email}?subject=Recruiter%20Inquiry%20for%20Abdul%20Qabid`}
                className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Direct Email</span>
              </a>
              <a
                href={PERSONAL_INFO.whatsapp || `https://wa.me/233257030060`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={RECRUITER_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-medium text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={RECRUITER_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-medium text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* 01. Professional Summary */}
          <div className="space-y-3">
            <h2 className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
              01. Professional Summary
            </h2>
            <div className="space-y-2.5 text-sm text-neutral-700 leading-relaxed">
              {(PERSONAL_INFO.bio || RECRUITER_DATA.summary).split('\n\n').map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>
          </div>

          {/* 02. Core Technical & Creative Competencies */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
              02. Core Technical & Creative Competencies
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-xl bg-neutral-50 space-y-2">
                <span className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" /> Programming & Languages
                </span>
                <div className="flex flex-wrap gap-1">
                  {RECRUITER_DATA.skills.programming.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white text-[11px] font-medium text-neutral-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 space-y-2">
                <span className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5" /> AI & Machine Learning
                </span>
                <div className="flex flex-wrap gap-1">
                  {RECRUITER_DATA.skills.genai.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white text-[11px] font-medium text-neutral-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 space-y-2">
                <span className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> Frontend Architecture
                </span>
                <div className="flex flex-wrap gap-1">
                  {RECRUITER_DATA.skills.frontend.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white text-[11px] font-medium text-neutral-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 space-y-2">
                <span className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" /> Graphic Design & UI/UX
                </span>
                <div className="flex flex-wrap gap-1">
                  {RECRUITER_DATA.skills.design_uiux.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white text-[11px] font-medium text-neutral-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 space-y-2">
                <span className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Backend & APIs
                </span>
                <div className="flex flex-wrap gap-1">
                  {RECRUITER_DATA.skills.backend_cloud.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white text-[11px] font-medium text-neutral-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 space-y-2">
                <span className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Glasses className="w-3.5 h-3.5" /> Augmented Reality
                </span>
                <div className="flex flex-wrap gap-1">
                  {RECRUITER_DATA.skills.ar_creative.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white text-[11px] font-medium text-neutral-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 03. Software Engineering & Product Development */}
          <div className="space-y-6">
            <h2 className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
              03. Software Engineering & Product Development Projects
            </h2>

            <div className="space-y-4">
              {RECRUITER_DATA.softwareProjects.map((p, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-neutral-50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-display font-bold text-neutral-950 flex items-center gap-2">
                        <span>{p.title}</span>
                        <span className="text-neutral-500 font-normal text-xs sm:text-sm">| {p.role}</span>
                      </h3>
                      <p className="text-xs text-neutral-500">{p.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-2 self-start print:hidden">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-white text-[11px] font-medium text-neutral-900 hover:bg-neutral-100 flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" /> Live
                        </a>
                      )}
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-white text-[11px] font-medium text-neutral-900 hover:bg-neutral-100 flex items-center gap-1"
                        >
                          <Github className="w-3 h-3" /> Code
                        </a>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-600">
                    {p.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 flex flex-wrap gap-1">
                    {p.technologies.map((t, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-white text-[10px] font-medium text-neutral-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 04. Professional & Career Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
              04. Professional & Career Experience
            </h2>

            <div className="space-y-4">
              {(experience && experience.length > 0 ? experience : RECRUITER_DATA.entrepreneurialAndCorporate).map((item, idx) => {
                const isJuni = item.company.toUpperCase().includes('JUNI GHANA');

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-neutral-50 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-display font-bold text-base text-neutral-950">
                            {item.company}
                          </h4>
                          {isJuni && (
                            <span className="text-xs font-semibold text-emerald-700">
                              (National Service · Current)
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-neutral-800 pt-0.5">
                          {item.role}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {item.location}
                        </p>
                      </div>
                      <span className="text-xs text-neutral-500 font-medium self-start">
                        {item.period}
                      </span>
                    </div>

                    <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-600">
                      {item.highlights.map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-neutral-400" />
                          <span>
                            {hl.includes('React, JavaScript and TypeScript') ? (
                              <>
                                Work with <strong className="text-neutral-900">React, JavaScript and TypeScript</strong> to develop and improve web application interfaces.
                              </>
                            ) : (
                              hl
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 05. Education */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
              05. Education
            </h2>

            {RECRUITER_DATA.education.map((edu, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-neutral-50 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-display font-bold text-base text-neutral-950">
                      {edu.degree}
                    </h4>
                    <p className="text-xs font-medium text-neutral-700">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {edu.school} · {edu.location}
                    </p>
                  </div>
                  <span className="text-xs text-neutral-500 font-medium self-start">
                    {edu.period}
                  </span>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5">
                    Core Coursework:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course, cIdx) => (
                      <span key={cIdx} className="px-2 py-0.5 rounded bg-white text-[11px] font-medium text-neutral-700">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 06. Professional Expertise Overview */}
          <div className="space-y-3 pt-4 border-t border-neutral-100">
            <h2 className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
              06. Professional Expertise Overview
            </h2>
            <div className="flex flex-wrap gap-2 pt-1">
              {RECRUITER_DATA.expertiseOverview.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-neutral-100 text-xs font-medium text-neutral-900"
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
