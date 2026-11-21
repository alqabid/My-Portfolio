import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ExternalLink,
  Github,
  ArrowRight,
  Activity,
  RefreshCw,
  Gamepad2,
  Globe,
  Monitor
} from 'lucide-react';
import { Project, CursorType } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { WebsitePreview } from './WebsitePreview';

interface BuildWorldProps {
  onOpenCaseStudy: (project: Project) => void;
  onSetCursor?: (type: CursorType, text?: string) => void;
}

interface HealthCheckResult {
  status: 'checking' | 'online' | 'unreachable';
  latencyMs?: number;
}

export const BuildWorld: React.FC<BuildWorldProps> = ({ onOpenCaseStudy }) => {
  const { buildProjects: BUILD_PROJECTS } = usePortfolio();

  // Separate live web deployments from desktop/local software projects
  const liveProjects = useMemo(
    () => BUILD_PROJECTS.filter((p) => Boolean(p.liveUrl)),
    [BUILD_PROJECTS]
  );

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    liveProjects[0]?.id || BUILD_PROJECTS[0]?.id || 'wonkyendi'
  );
  const [healthMap, setHealthMap] = useState<Record<string, HealthCheckResult>>({});
  const [isCheckingAll, setIsCheckingAll] = useState(false);

  // Keep selected project valid if list changes
  useEffect(() => {
    if (liveProjects.length > 0 && !liveProjects.some((p) => p.id === selectedProjectId)) {
      setSelectedProjectId(liveProjects[0].id);
    }
  }, [liveProjects, selectedProjectId]);

  const activeProject =
    liveProjects.find((p) => p.id === selectedProjectId) ||
    liveProjects[0] ||
    BUILD_PROJECTS[0];

  const probeProject = useCallback(async (project: Project) => {
    if (!project.liveUrl) return;

    setHealthMap((prev) => ({
      ...prev,
      [project.id]: { status: 'checking' }
    }));

    const start = performance.now();
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 7000);

    try {
      await fetch(project.liveUrl, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-store',
        signal: controller.signal
      });
      const elapsed = Math.max(1, Math.round(performance.now() - start));
      setHealthMap((prev) => ({
        ...prev,
        [project.id]: { status: 'online', latencyMs: elapsed }
      }));
    } catch {
      setHealthMap((prev) => ({
        ...prev,
        [project.id]: { status: 'unreachable' }
      }));
    } finally {
      window.clearTimeout(timeoutId);
    }
  }, []);

  const checkAllDeployments = useCallback(async () => {
    setIsCheckingAll(true);
    await Promise.all(liveProjects.map((proj) => probeProject(proj)));
    setIsCheckingAll(false);
  }, [liveProjects, probeProject]);

  // Run initial live check for deployed projects on mount
  useEffect(() => {
    if (liveProjects.length > 0) {
      checkAllDeployments();
    }
  }, [checkAllDeployments, liveProjects.length]);

  const handleSelectLivePreview = (projectId: string) => {
    setSelectedProjectId(projectId);
    const previewEl = document.getElementById('live-preview-stage');
    if (previewEl) {
      previewEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const activeHealth = activeProject ? healthMap[activeProject.id] : undefined;

  return (
    <section id="build" className="py-6 space-y-10">
      {/* Live App Preview & Performance Stage */}
      {activeProject && (
        <div id="live-preview-stage" className="rounded-2xl bg-neutral-50 p-5 sm:p-8 space-y-6">
          {/* Top Switcher Bar: Select any live app to preview & inspect performance */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {liveProjects.map((proj) => {
                const isSelected = proj.id === activeProject.id;
                const health = healthMap[proj.id];
                const isOngoing = proj.id === 'wonkyendi';

                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => setSelectedProjectId(proj.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-neutral-900 text-white'
                        : 'bg-white hover:bg-neutral-200/70 text-neutral-700'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        health?.status === 'online'
                          ? 'bg-emerald-500'
                          : health?.status === 'unreachable'
                          ? 'bg-amber-500'
                          : 'bg-neutral-400 animate-pulse'
                      }`}
                    />
                    <span className="font-semibold">{proj.title}</span>
                    {isOngoing && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                          isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        NEW
                      </span>
                    )}
                    {health?.status === 'online' && health.latencyMs && (
                      <span
                        className={`text-[10px] font-mono ${
                          isSelected ? 'text-neutral-400' : 'text-neutral-400'
                        }`}
                      >
                        {health.latencyMs}ms
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={checkAllDeployments}
              disabled={isCheckingAll}
              className="px-3 py-2 rounded-xl bg-white hover:bg-neutral-200/70 text-neutral-700 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0 disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCheckingAll ? 'animate-spin' : ''}`} />
              <span>{isCheckingAll ? 'Checking...' : 'Check Live Status'}</span>
            </button>
          </div>

          {/* Active Project Header & Quick Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                <span className="font-semibold text-neutral-900 inline-flex items-center gap-1.5">
                  {activeProject.id === 'wonkyendi' ? (
                    <Gamepad2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Globe className="w-3.5 h-3.5 text-neutral-600" />
                  )}
                  {activeProject.subtitle}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                  <Activity className="w-3 h-3 text-emerald-600" />
                  {activeHealth?.status === 'online'
                    ? `Online (${activeHealth.latencyMs}ms response)`
                    : activeHealth?.status === 'unreachable'
                    ? 'External host check blocked / slow'
                    : 'Checking deployment...'}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-950">
                {activeProject.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
                {activeProject.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onOpenCaseStudy(activeProject)}
                className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200/70 text-neutral-900 font-medium text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Open Live App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-neutral-200/70 flex items-center justify-center text-neutral-700 transition-colors"
                  title="View on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Metrics & Stack Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {(activeProject.metrics || []).map((metric, idx) => (
                <div key={idx} className="px-3 py-1.5 rounded-lg bg-white text-xs">
                  <span className="text-neutral-400 mr-1.5">{metric.label}:</span>
                  <span className="font-semibold text-neutral-900">{metric.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {(activeProject.technologies || []).slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-white text-[11px] font-medium text-neutral-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Website Preview Frame */}
          {activeProject.liveUrl && (
            <WebsitePreview
              key={activeProject.id}
              url={activeProject.liveUrl}
              title={activeProject.title}
              tagline={activeProject.tagline}
              heightClass="h-96 sm:h-[480px]"
              allowLiveIframe={true}
            />
          )}
        </div>
      )}

      {/* All Projects & Performance Overview Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            All Software Builds ({BUILD_PROJECTS.length})
          </h3>
          <span className="text-xs text-neutral-400">
            Click Preview Live to inspect any deployed app above
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BUILD_PROJECTS.map((project) => {
            const health = healthMap[project.id];
            const isSelected = activeProject?.id === project.id;

            return (
              <div
                key={project.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-colors ${
                  isSelected ? 'bg-neutral-100' : 'bg-neutral-50 hover:bg-neutral-100/70'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-neutral-900 truncate">
                      {project.role.split('&')[0].trim()}
                    </span>
                    {project.liveUrl ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-600 shrink-0">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            health?.status === 'online'
                              ? 'bg-emerald-500'
                              : health?.status === 'unreachable'
                              ? 'bg-amber-500'
                              : 'bg-neutral-400 animate-pulse'
                          }`}
                        />
                        {health?.status === 'online'
                          ? `${health.latencyMs}ms`
                          : health?.status === 'unreachable'
                          ? 'Check'
                          : '...'}
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-neutral-400 shrink-0">
                        Desktop / Core
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-lg font-display font-bold text-neutral-950">
                      {project.title}
                    </h4>
                    <p className="text-[11px] font-medium text-neutral-500 mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Key metric pills */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white text-[10px] font-medium text-neutral-700"
                        >
                          {m.label}: <strong className="text-neutral-950">{m.value}</strong>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-2 flex items-center gap-2">
                  {project.liveUrl ? (
                    <button
                      type="button"
                      onClick={() => handleSelectLivePreview(project.id)}
                      className={`flex-1 py-2 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>{isSelected ? 'Previewing Above' : 'Preview Live'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenCaseStudy(project)}
                      className="flex-1 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {project.liveUrl && (
                    <button
                      type="button"
                      onClick={() => onOpenCaseStudy(project)}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-200/70 text-neutral-900 font-medium text-xs transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white hover:bg-neutral-200/70 text-neutral-700 transition-colors"
                      title={`Open ${project.title}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
