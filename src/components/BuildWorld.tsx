import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ExternalLink,
  Github,
  ArrowRight,
  Activity,
  RefreshCw,
  Gamepad2,
  Globe,
  Monitor,
  Code2
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

interface MiniCardPreviewProps {
  project: Project;
  health?: HealthCheckResult;
  onSelectLive: (id: string) => void;
  onOpenCaseStudy: (project: Project) => void;
}

const MiniCardPreview: React.FC<MiniCardPreviewProps> = ({
  project,
  health,
  onSelectLive,
  onOpenCaseStudy
}) => {
  const [mode, setMode] = useState<'snapshot' | 'live'>('snapshot');
  const [imgFailed, setImgFailed] = useState(false);

  const cleanDomain = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : '';

  const snapshotUrl = project.liveUrl
    ? `https://api.microlink.io?url=${encodeURIComponent(project.liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`
    : project.previewUrl;

  if (!project.liveUrl) {
    return (
      <div
        onClick={() => onOpenCaseStudy(project)}
        className="relative w-full h-40 rounded-xl bg-neutral-900 overflow-hidden cursor-pointer group"
      >
        {!imgFailed && snapshotUrl ? (
          <img
            src={snapshotUrl}
            alt={`${project.title} preview`}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 gap-2">
            <Code2 className="w-6 h-6 text-neutral-300" />
            <span className="text-[11px] font-mono">{project.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end justify-between p-3">
          <span className="text-[10px] font-mono text-white/90 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
            Desktop / Core App
          </span>
          <span className="text-[10px] font-medium text-white bg-white/15 backdrop-blur-sm px-2 py-0.5 rounded">
            View Specs
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl bg-[#111111] overflow-hidden flex flex-col">
      {/* Mini Browser Chrome */}
      <div className="bg-[#1C1C1C] px-2.5 py-1.5 flex items-center justify-between gap-2 select-none">
        <div className="flex items-center gap-1 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
          <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
        </div>

        <div className="flex-1 min-w-0 px-2 py-0.5 rounded bg-[#0D0D0D] flex items-center justify-between gap-1.5">
          <span className="text-[10px] font-mono text-neutral-300 truncate">
            {cleanDomain}
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              health?.status === 'online'
                ? 'bg-emerald-500'
                : health?.status === 'unreachable'
                ? 'bg-amber-500'
                : 'bg-neutral-500 animate-pulse'
            }`}
          />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMode((prev) => (prev === 'snapshot' ? 'live' : 'snapshot'));
          }}
          className={`px-1.5 py-0.5 rounded text-[9px] font-mono transition-colors cursor-pointer shrink-0 ${
            mode === 'live'
              ? 'bg-white text-neutral-900 font-semibold'
              : 'bg-[#2C2C2C] text-neutral-300 hover:text-white'
          }`}
          title="Toggle live interactive preview inside card"
        >
          {mode === 'live' ? 'Snapshot' : 'Live'}
        </button>
      </div>

      {/* Mini Viewport */}
      <div className="relative w-full h-44 bg-[#0D0D0D] overflow-hidden group">
        {mode === 'live' ? (
          <iframe
            src={project.liveUrl}
            title={`${project.title} mini live preview`}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            loading="lazy"
          />
        ) : (
          <div
            onClick={() => onSelectLive(project.id)}
            className="relative w-full h-full cursor-pointer"
          >
            {!imgFailed ? (
              <img
                src={snapshotUrl}
                alt={`${project.title} live website snapshot`}
                onError={() => setImgFailed(true)}
                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-neutral-900">
                <Globe className="w-6 h-6 text-neutral-400 mb-1.5" />
                <span className="text-xs font-semibold text-white">{project.title}</span>
                <span className="text-[10px] font-mono text-neutral-400 mt-0.5 truncate max-w-full">
                  {cleanDomain}
                </span>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-2.5 flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {health?.status === 'online' && health.latencyMs
                  ? `Online · ${health.latencyMs}ms`
                  : 'Live Web App'}
              </span>
              <span className="text-[10px] font-medium text-white bg-white/15 backdrop-blur-sm px-2 py-0.5 rounded opacity-90 group-hover:bg-white group-hover:text-neutral-900 transition-colors">
                Expand
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const BuildWorld: React.FC<BuildWorldProps> = ({ onOpenCaseStudy }) => {
  const { buildProjects: BUILD_PROJECTS } = usePortfolio();

  // Ensure MedVision appears first, followed by remaining projects in order
  const orderedProjects = useMemo(() => {
    const medvision = BUILD_PROJECTS.find((p) => p.id === 'medvision');
    const others = BUILD_PROJECTS.filter((p) => p.id !== 'medvision');
    return medvision ? [medvision, ...others] : BUILD_PROJECTS;
  }, [BUILD_PROJECTS]);

  const liveProjects = useMemo(
    () => orderedProjects.filter((p) => Boolean(p.liveUrl)),
    [orderedProjects]
  );

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    liveProjects[0]?.id || 'medvision'
  );
  const [healthMap, setHealthMap] = useState<Record<string, HealthCheckResult>>({});
  const [isCheckingAll, setIsCheckingAll] = useState(false);

  useEffect(() => {
    if (liveProjects.length > 0 && !liveProjects.some((p) => p.id === selectedProjectId)) {
      setSelectedProjectId(liveProjects[0].id);
    }
  }, [liveProjects, selectedProjectId]);

  const activeProject =
    liveProjects.find((p) => p.id === selectedProjectId) ||
    liveProjects[0] ||
    orderedProjects[0];

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

  // Projects shown in the small-card preview grid below (excluding whichever is currently featured on the main stage? No, keep all others cleanly visible so MedVision is featured first and the rest continue below!)
  const otherProjectsBelow = useMemo(
    () => orderedProjects.filter((p) => p.id !== activeProject?.id),
    [orderedProjects, activeProject?.id]
  );

  return (
    <section id="build" className="py-6 space-y-10">
      {/* Main Featured Live App Preview & Performance Stage (MedVision First by Default) */}
      {activeProject && (
        <div id="live-preview-stage" className="rounded-2xl bg-neutral-50 p-5 sm:p-8 space-y-6">
          {/* Top Switcher Bar: MedVision first, then Wonkyendi and other live apps */}
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
                      <span className="text-[10px] font-mono text-neutral-400">
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
                    ? 'External host check slow'
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

      {/* Other Projects Below — Each with a Small Card Preview */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            More Projects & Live Previews ({otherProjectsBelow.length})
          </h3>
          <span className="text-xs text-neutral-400">
            Toggle Live inside any card or click Expand to inspect full size
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {otherProjectsBelow.map((project) => {
            const health = healthMap[project.id];

            return (
              <div
                key={project.id}
                className="rounded-2xl bg-neutral-50 hover:bg-neutral-100/70 p-4 sm:p-5 flex flex-col justify-between transition-colors gap-4"
              >
                <div className="space-y-3.5">
                  {/* Small Card Preview Window */}
                  <MiniCardPreview
                    project={project}
                    health={health}
                    onSelectLive={handleSelectLivePreview}
                    onOpenCaseStudy={onOpenCaseStudy}
                  />

                  {/* Project Info */}
                  <div className="space-y-1.5 px-1">
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="font-semibold text-neutral-900 truncate">
                        {project.role.split('&')[0].trim()}
                      </span>
                      {project.id === 'wonkyendi' && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-semibold shrink-0">
                          Ongoing Dev
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-base font-display font-bold text-neutral-950">
                        {project.title}
                      </h4>
                      <p className="text-[11px] font-medium text-neutral-500 line-clamp-1">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
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
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 px-1">
                  {project.liveUrl ? (
                    <button
                      type="button"
                      onClick={() => handleSelectLivePreview(project.id)}
                      className="flex-1 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Expand Preview</span>
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
                      className="px-3 py-2 rounded-xl bg-white hover:bg-neutral-200/70 text-neutral-900 font-medium text-xs transition-colors cursor-pointer"
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
