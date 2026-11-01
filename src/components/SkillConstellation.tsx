import React, { useState } from 'react';
import { Code2, Server, Palette, Sparkles, Check } from 'lucide-react';

export const SkillConstellation: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend Engineering',
      icon: Code2,
      description: 'Modern component-driven web interfaces, state management, and responsive layouts.',
      skills: [
        { name: 'React', level: 'Advanced' },
        { name: 'TypeScript', level: 'Proficient' },
        { name: 'JavaScript (ES6+)', level: 'Advanced' },
        { name: 'Tailwind CSS', level: 'Advanced' },
        { name: 'Vite', level: 'Proficient' },
        { name: 'HTML5 & CSS3', level: 'Advanced' }
      ]
    },
    {
      title: 'Backend & APIs',
      icon: Server,
      description: 'REST API design, backend integration, and microservices.',
      skills: [
        { name: 'Python', level: 'Proficient' },
        { name: 'FastAPI', level: 'Proficient' },
        { name: 'REST APIs & Integration', level: 'Proficient' },
        { name: 'SQL & Databases', level: 'Working' },
        { name: 'Node.js', level: 'Working' },
        { name: 'Java, C++, C#, PHP', level: 'Academic/Working' }
      ]
    },
    {
      title: 'UI/UX & Graphic Design',
      icon: Palette,
      description: 'High-converting promotional marketing materials, flyers, and interface design.',
      skills: [
        { name: 'Canva (Advanced)', level: 'Expert' },
        { name: 'Figma', level: 'Proficient' },
        { name: 'Adobe Photoshop', level: 'Proficient' },
        { name: 'Visual Brand Identity', level: 'Advanced' },
        { name: 'Event Flyer Design', level: 'Expert' },
        { name: 'High-CTR Asset Creation', level: 'Advanced' }
      ]
    },
    {
      title: 'AI & Extended Reality',
      icon: Sparkles,
      description: 'Computer vision classification, augmented reality lenses, and rapid AI tooling.',
      skills: [
        { name: 'Snapchat Lens Studio', level: 'Advanced' },
        { name: 'Computer Vision (CNNs)', level: 'Applied' },
        { name: 'Prompt Engineering', level: 'Advanced' },
        { name: 'Model Evaluation', level: 'Applied' },
        { name: '3D AR Assets', level: 'Proficient' },
        { name: 'Rapid Prototyping', level: 'Advanced' }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-14">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
          Competencies & Tools
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-neutral-950 tracking-tight mb-4">
          Technical Expertise & Stack
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
          Combining computer science fundamentals with modern production frameworks, visual artistry, and augmented reality development.
        </p>
      </div>

      {/* Categories Grid (Soft neutral cards, zero borders) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.title}
              className="rounded-2xl bg-neutral-50 p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-neutral-950">
                      {category.title}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-white flex items-center justify-between"
                    >
                      <span className="text-xs font-medium text-neutral-900">
                        {skill.name}
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
