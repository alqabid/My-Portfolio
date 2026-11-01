import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const AboutSection: React.FC = () => {
  const { personalInfo: PERSONAL_INFO, experience } = usePortfolio();
  const [showAllExperience, setShowAllExperience] = useState(false);

  // Parse bio paragraphs
  const bioParagraphs = (PERSONAL_INFO.bio || '').split('\n\n').filter(Boolean);

  // Active current experience item (Juni Ghana Limited)
  const currentExp = experience.find((e) =>
    e.company.toUpperCase().includes('JUNI GHANA')
  ) || experience[0];

  const previousExps = experience.filter((e) => e !== currentExp);

  return (
    <section id="about" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      {/* Narrative Container: Soft Neutral Surface, Zero Borders */}
      <div className="rounded-2xl bg-neutral-50 p-8 sm:p-12">
        <div className="max-w-4xl space-y-6">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
            Background & Perspective
          </span>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-neutral-950 tracking-tight leading-tight">
            Bridging Software Engineering & Creative Design
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed pt-2">
            {bioParagraphs.length > 0 ? (
              bioParagraphs.map((para, idx) => (
                <p key={idx} className={idx === 0 ? 'text-base sm:text-lg font-medium text-neutral-900 leading-relaxed' : 'leading-relaxed'}>
                  {para}
                </p>
              ))
            ) : (
              <p className="text-base sm:text-lg text-neutral-900 leading-relaxed">
                Computer Science & Engineering graduate and Software Developer currently undertaking National Service at Juni Ghana Limited, with practical exposure to software development in a FinTech environment.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* CURRENT EXPERIENCE SPOTLIGHT: JUNI GHANA LIMITED (Zero borders, clean layout) */}
      {currentExp && (
        <div className="rounded-2xl bg-neutral-50 p-8 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                <span className="font-semibold text-neutral-900">Current Role</span>
                <span aria-hidden="true">·</span>
                <span>National Service</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-950">
                {currentExp.company}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-neutral-700 mt-0.5">
                {currentExp.role}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                {currentExp.location}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 font-medium text-neutral-900">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                {currentExp.period}
              </span>
            </div>
          </div>

          {/* Highlights & Contributions */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Key Responsibilities & Contributions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(currentExp.highlights || []).map((point, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PREVIOUS EXPERIENCE (Collapsible or clean secondary card) */}
      {previousExps.length > 0 && (
        <div className="rounded-2xl bg-neutral-50 p-6 sm:p-8 space-y-4">
          <button
            onClick={() => setShowAllExperience(!showAllExperience)}
            className="w-full flex items-center justify-between text-left cursor-pointer group"
          >
            <div>
              <h4 className="font-display font-bold text-base text-neutral-950">
                Previous Roles & Early Engineering Experience
              </h4>
              <p className="text-xs text-neutral-500">
                View earlier engineering internships and co-founder initiatives
              </p>
            </div>
            <div className={`p-2 rounded-xl bg-white transition-transform ${showAllExperience ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-4 h-4 text-neutral-600" />
            </div>
          </button>

          {showAllExperience && (
            <div className="pt-4 border-t border-neutral-200/50 space-y-4">
              {previousExps.map((exp, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-white space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <span className="font-bold text-neutral-900 text-sm">
                      {exp.company} — {exp.role}
                    </span>
                    <span className="text-neutral-500 font-mono text-[11px]">
                      {exp.period} · {exp.location}
                    </span>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    {(exp.highlights || []).map((h, i) => (
                      <li key={i} className="text-xs text-neutral-600 flex items-start gap-2">
                        <span className="text-neutral-400 mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
