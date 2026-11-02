import React from 'react';
import {
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const AboutSection: React.FC = () => {
  const { personalInfo: PERSONAL_INFO, experience } = usePortfolio();

  // Active current experience item (Juni Ghana Limited)
  const currentExp = experience.find((e) =>
    e.company.toUpperCase().includes('JUNI GHANA')
  ) || experience[0];

  return (
    <section id="about" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      {/* Section Header */}
      <div>
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
          Career & Credentials
        </span>
        <h2 className="text-2xl sm:text-4xl font-display font-bold text-neutral-950 tracking-tight">
          Professional Experience & Education
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Current Experience: Juni Ghana Limited */}
        <div className="lg:col-span-7 rounded-2xl bg-neutral-50 p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                <span className="font-semibold text-neutral-900">Current Role</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-semibold">National Service</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-neutral-950">
                {currentExp?.company || 'Juni Ghana Limited'}
              </h3>
              <p className="text-sm font-semibold text-neutral-700 mt-0.5">
                {currentExp?.role || 'National Service Personnel | Software Engineer'}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                Accra, Ghana
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-neutral-900">
                Oct 2026 – Present
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Contributing to software development activities in a fast-paced FinTech environment, developing responsive web application interfaces and collaborating on REST API integrations.
          </p>

          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Key Contributions
            </h4>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-white flex items-start gap-2.5 text-xs text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <span>Develop modern web interfaces using <strong className="text-neutral-900">React, JavaScript, and TypeScript</strong>.</span>
              </div>
              <div className="p-3 rounded-xl bg-white flex items-start gap-2.5 text-xs text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <span>Collaborate with senior engineers on client-facing features and backend API consumption.</span>
              </div>
              <div className="p-3 rounded-xl bg-white flex items-start gap-2.5 text-xs text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <span>Participate in code reviews, testing, and debugging to maintain system quality.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Education & Technical Foundations */}
        <div className="lg:col-span-5 rounded-2xl bg-neutral-50 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <GraduationCap className="w-4 h-4 text-neutral-900" />
              <span className="font-semibold text-neutral-900">Academic Foundation</span>
            </div>

            <div>
              <h3 className="text-xl font-display font-bold text-neutral-950">
                BSc in Computer Science & Engineering
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                University of Mines and Technology (UMaT)
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">
                Class of 2026 · Tarkwa, Western Region, Ghana
              </p>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
                Core Competencies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['Algorithms & Data Structures', 'Software Engineering', 'Computer Vision & AI', 'Web Architecture', 'Database Systems', 'Object-Oriented Design'].map((course, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-white text-xs font-medium text-neutral-800">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200/50 flex items-center justify-between text-xs text-neutral-600">
            <span>Engineering Discipline</span>
            <span className="font-semibold text-neutral-900">Full-Stack & Applied AI</span>
          </div>
        </div>
      </div>
    </section>
  );
};

