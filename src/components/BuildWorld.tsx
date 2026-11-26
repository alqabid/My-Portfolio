import React, { useState, useEffect, useMemo, useCallback, useRef, memo } from 'react';
import {
  ExternalLink,
  Github,
  ArrowRight,
  Activity,
  RefreshCw,
  Gamepad2,
  Globe,
  Monitor,
  Play,
  SkipForward,
  ArrowUpDown,
  Search,
  UserCheck,
  CheckCircle2
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

// Interactive mini desktop UI preview for Java Student Record Management
const StudentRecordsMiniUI: React.FC = memo(() => {
  const [query, setQuery] = useState('');
  const records = [
    { id: 'CS-26-014', name: 'K. Mensah', gpa: '3.82', status: 'Active' },
    { id: 'CS-26-029', name: 'A. Osei', gpa: '3.65', status: 'Active' },
    { id: 'CS-26-041', name: 'E. Boateng', gpa: '3.91', status: 'Honors' }
  ];
  const filtered = records.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full rounded-xl bg-[#111111] overflow-hidden flex flex-col" style={{ contain: 'layout paint style' }}>
      <div className="bg-[#1C1C1C] px-2.5 py-1.5 flex items-center justify-between text-[10px] font-mono text-neutral-300">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
          <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
        </div>
        <span className="truncate text-neutral-400">StudentRecords.jar — Java SE</span>
        <span className="text-emerald-400">OOP</span>
      </div>
      <div className="h-48 bg-white p-3 flex flex-col justify-between text-neutral-900">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-neutral-100">
            <Search className="w-3 h-3 text-neutral-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search student ID or name..."
              className="w-full bg-transparent text-[10px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            {filtered.map((rec) => (
              <div
                key={rec.id}
                className="px-2 py-1.5 rounded-lg bg-neutral-50 flex items-center justify-between text-[10px]"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <UserCheck className="w-3 h-3 text-neutral-700 shrink-0" />
                  <span className="font-mono text-neutral-500">{rec.id}</span>
                  <span className="font-semibold text-neutral-900 truncate">{rec.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono font-semibold text-neutral-900">{rec.gpa}</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[9px] font-medium">
                    {rec.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 pt-1">
          <span>Validated Records: {filtered.length}</span>
          <span>Encapsulated Storage</span>
        </div>
      </div>
    </div>
  );
});

StudentRecordsMiniUI.displayName = 'StudentRecordsMiniUI';

// Interactive mini desktop UI preview for C# Queue ADT Music Player
const MusicPlayerMiniUI: React.FC = memo(() => {
  const [tracks, setTracks] = useState([
    { title: 'Accra Midnight', duration: '3:42' },
    { title: 'Focus Flow', duration: '2:58' },
    { title: 'Signal Wave', duration: '4:11' }
  ]);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleNext = () => {
    setTracks((prev) => [...prev.slice(1), prev[0]]);
  };

  const handleBubbleSort = () => {
    setTracks((prev) => [...prev].sort((a, b) => a.title.localeCompare(b.title)));
  };

  return (
    <div className="w-full rounded-xl bg-[#111111] overflow-hidden flex flex-col" style={{ contain: 'layout paint style' }}>
      <div className="bg-[#1C1C1C] px-2.5 py-1.5 flex items-center justify-between text-[10px] font-mono text-neutral-300">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
          <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
        </div>
        <span className="truncate text-neutral-400">QueuePlayer.exe — C# .NET</span>
        <span className="text-emerald-400">FIFO</span>
      </div>
      <div className="h-48 bg-neutral-950 p-3 flex flex-col justify-between text-white">
        <div className="space-y-2">
          <div className="p-2 rounded-lg bg-neutral-900 flex items-center justify-between">
            <div className="min-w-0">
              <span className="text-[9px] font-mono text-emerald-400 block">NOW PLAYING (HEAD)</span>
              <span className="text-xs font-semibold truncate block">{tracks[0].title}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="p-1.5 rounded-lg bg-white text-neutral-950 hover:bg-neutral-200 cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                <Play className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer"
                title="Dequeue & Next Track"
              >
                <SkipForward className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={handleBubbleSort}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer"
                title="Bubble Sort Queue"
              >
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {tracks.slice(1).map((t, idx) => (
              <div
                key={t.title}
                className="px-2 py-1 rounded bg-neutral-900/70 flex items-center justify-between text-[10px] text-neutral-300"
              >
                <span className="truncate">
                  <span className="font-mono text-neutral-500 mr-1.5">#{idx + 2}</span>
                  {t.title}
                </span>
                <span className="font-mono text-neutral-500">{t.duration}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500">
          <span>ADT: Queue ({tracks.length} items)</span>
          <span>{isPlaying ? 'PLAYING' : 'PAUSED'}</span>
        </div>
      </div>
    </div>
  );
});

MusicPlayerMiniUI.displayName = 'MusicPlayerMiniUI';

interface MiniCardPreviewProps {
  project: Project;
  health?: HealthCheckResult;
  staggerIndex: number;
  onSelectLive: (id: string) => void;
}

const MiniCardPreview: React.FC<MiniCardPreviewProps> = memo(({
  project,
  health,
  staggerIndex,
  onSelectLive
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);
  const [interactive, setInteractive] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [shouldMountIframe, setShouldMountIframe] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Viewport-gated + staggered iframe mount so multiple external SPAs never spike CPU/network together
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !project.liveUrl) return;

    let timerId: number | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          timerId = window.setTimeout(() => {
            setShouldMountIframe(true);
          }, Math.min(staggerIndex * 180, 720));
          observer.disconnect();
        }
      },
      { rootMargin: '140px' }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timerId) window.clearTimeout(timerId);
    };
  }, [project.liveUrl, staggerIndex]);

  // Measure card width for crisp 1280px -> card-width scaling
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !project.liveUrl) return;
    let rafId = 0;

    const updateScale = () => {
      if (el.clientWidth > 0) {
        setScale(el.clientWidth / 1280);
      }
    };
    updateScale();

    const observer = new ResizeObserver(() => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(() => {
          rafId = 0;
          updateScale();
        });
      }
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [project.liveUrl]);

  if (!project.liveUrl) {
    if (project.id === 'student-records') {
      return <StudentRecordsMiniUI />;
    }
    if (project.id === 'music-player-app') {
      return <MusicPlayerMiniUI />;
    }
    return null;
  }

  const cleanDomain = project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <div
      className="w-full rounded-xl bg-[#111111] overflow-hidden flex flex-col"
      style={{ contain: 'layout paint style' }}
    >
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
                : 'bg-neutral-500'
            }`}
          />
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIframeLoaded(false);
              setShouldMountIframe(true);
              setReloadKey((k) => k + 1);
            }}
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-[#2C2C2C] transition-colors cursor-pointer"
            title="Reload live preview"
          >
            <RefreshCw className="w-2.5 h-2.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShouldMountIframe(true);
              setInteractive((prev) => !prev);
            }}
            className={`px-1.5 py-0.5 rounded text-[9px] font-mono transition-colors cursor-pointer ${
              interactive
                ? 'bg-white text-neutral-900 font-semibold'
                : 'bg-[#2C2C2C] text-neutral-300 hover:text-white'
            }`}
            title="Toggle direct interaction inside this small card"
          >
            {interactive ? 'Lock' : 'Interact'}
          </button>
        </div>
      </div>

      {/* Live Scaled Website/App Interface Viewport */}
      <div
        ref={containerRef}
        className="relative w-full h-48 bg-neutral-950 overflow-hidden group"
      >
        {/* Lightweight loading placeholder until live iframe renders */}
        {!iframeLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-neutral-950 text-neutral-400 z-10 pointer-events-none">
            <div className="w-4 h-4 rounded-full border-2 border-neutral-700 border-t-white animate-spin" />
            <span className="text-[10px] font-mono">{cleanDomain}</span>
          </div>
        )}

        {shouldMountIframe && (
          <iframe
            key={reloadKey}
            src={project.liveUrl}
            title={`${project.title} live interface preview`}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            loading="lazy"
            onLoad={() => setIframeLoaded(true)}
            style={
              interactive
                ? { width: '100%', height: '100%', border: 0 }
                : {
                    width: '1280px',
                    height: '800px',
                    border: 0,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    pointerEvents: 'none'
                  }
            }
            className={`bg-white block transition-opacity duration-300 ${
              iframeLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Subtle bottom bar in scaled mode to expand full-size */}
        {!interactive && (
          <div
            onClick={() => onSelectLive(project.id)}
            className="absolute inset-0 z-20 cursor-pointer flex items-end justify-between p-2.5 bg-gradient-to-t from-black/70 via-transparent to-transparent"
          >
            <span className="text-[10px] font-mono text-emerald-300 bg-black/65 px-2 py-0.5 rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {health?.status === 'online' && health.latencyMs
                ? `Live · ${health.latencyMs}ms`
                : 'Live Interface'}
            </span>
            <span className="text-[10px] font-medium text-white bg-black/65 group-hover:bg-white group-hover:text-neutral-950 px-2 py-0.5 rounded transition-colors">
              Expand
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

MiniCardPreview.displayName = 'MiniCardPreview';

export const BuildWorld: React.FC<BuildWorldProps> = ({ onOpenCaseStudy }) => {
  const { buildProjects: BUILD_PROJECTS } = usePortfolio();

  // Ensure MedVision appears first, followed by Wonkyendi and the rest
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

    const start = performance.now();
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 6000);

    try {
      await fetch(project.liveUrl, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-store',
        signal: controller.signal
      });
      const elapsed = Math.max(1, Math.round(performance.now() - start));
      return { id: project.id, result: { status: 'online' as const, latencyMs: elapsed } };
    } catch {
      return { id: project.id, result: { status: 'unreachable' as const } };
    } finally {
      window.clearTimeout(timeoutId);
    }
  }, []);

  // Batch health-check state update into a single setState so cards don't re-render 5 separate times
  const checkAllDeployments = useCallback(async () => {
    setIsCheckingAll(true);
    const results = await Promise.all(liveProjects.map((proj) => probeProject(proj)));
    const nextMap: Record<string, HealthCheckResult> = {};
    for (const item of results) {
      if (item) nextMap[item.id] = item.result;
    }
    setHealthMap(nextMap);
    setIsCheckingAll(false);
  }, [liveProjects, probeProject]);

  // Defer background status probes slightly so initial paint & MedVision iframe get 100% bandwidth first
  useEffect(() => {
    if (liveProjects.length === 0) return;
    const timer = window.setTimeout(() => {
      checkAllDeployments();
    }, 900);
    return () => window.clearTimeout(timer);
  }, [checkAllDeployments, liveProjects.length]);

  const handleSelectLivePreview = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
    const previewEl = document.getElementById('live-preview-stage');
    if (previewEl) {
      previewEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, []);

  const activeHealth = activeProject ? healthMap[activeProject.id] : undefined;

  const otherProjectsBelow = useMemo(
    () => orderedProjects.filter((p) => p.id !== activeProject?.id),
    [orderedProjects, activeProject?.id]
  );

  return (
    <section id="build" className="py-6 space-y-10">
      {/* Main Featured Live App Preview Stage (MedVision First by Default) */}
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
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
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
                          : 'bg-neutral-400'
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
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
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
                    ? `Online (${activeHealth.latencyMs}ms)`
                    : activeHealth?.status === 'unreachable'
                    ? 'External host slow'
                    : 'Live Deployment'}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-950">
                {activeProject.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {activeProject.description}
              </p>

              {/* Key Highlights for Active Project */}
              {activeProject.features && activeProject.features.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  {activeProject.features.slice(0, 4).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-neutral-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
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
              {(activeProject.technologies || []).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-white text-[11px] font-medium text-neutral-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Live Interactive Website Preview Frame */}
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

      {/* Other Projects Below — Viewport-Gated Staggered Live Interfaces */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            More Projects & Live Interfaces ({otherProjectsBelow.length})
          </h3>
          <span className="text-xs text-neutral-400">
            Click Interact inside any card or Expand for full-size view
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {otherProjectsBelow.map((project, idx) => {
            const health = healthMap[project.id];

            return (
              <div
                key={project.id}
                className="rounded-2xl bg-neutral-50 hover:bg-neutral-100/70 p-4 sm:p-5 flex flex-col justify-between transition-colors gap-4"
              >
                <div className="space-y-3.5">
                  <MiniCardPreview
                    project={project}
                    health={health}
                    staggerIndex={idx}
                    onSelectLive={handleSelectLivePreview}
                  />

                  <div className="space-y-1.5 px-1">
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="font-semibold text-neutral-900 truncate">
                        {project.role.split('|')[0].trim()}
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

                    {project.metrics && project.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.metrics.slice(0, 2).map((m, mIdx) => (
                          <span
                            key={mIdx}
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
