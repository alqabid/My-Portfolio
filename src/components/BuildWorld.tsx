import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Play,
  CheckCircle2,
  AlertCircle,
  Activity,
  Layers,
  ArrowRight,
  Sparkles,
  MapPin,
  Ticket,
  QrCode,
  Globe,
  Monitor,
  Layout
} from 'lucide-react';
import { BUILD_PROJECTS } from '../data/portfolioData';
import { Project, CursorType } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';
import { WebsitePreview } from './WebsitePreview';

interface BuildWorldProps {
  onOpenCaseStudy: (project: Project) => void;
  onSetCursor: (type: CursorType, text?: string) => void;
}

export const BuildWorld: React.FC<BuildWorldProps> = ({ onOpenCaseStudy, onSetCursor }) => {
  const { buildProjects: BUILD_PROJECTS } = usePortfolio();
  // MedVision View Mode
  const [medvisionTab, setMedvisionTab] = useState<'preview' | 'simulator'>('preview');

  // Interactive MedVision Simulator state
  const [selectedScan, setSelectedScan] = useState<'normal' | 'bacterial' | 'viral'>('bacterial');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    diagnosis: string;
    confidence: number;
    latency: number;
    severity: 'low' | 'high' | 'moderate';
    findings: string;
  }>({
    diagnosis: 'Bacterial Pneumonia Detected',
    confidence: 96.4,
    latency: 218,
    severity: 'high',
    findings: 'Dense focal consolidation observed in right lower pulmonary lobe with air bronchograms.'
  });

  // Yugogoo View Mode
  const [yugogooTab, setYugogooTab] = useState<'preview' | 'simulator'>('preview');

  // Interactive Yugogoo Radius state
  const [eventRadius, setEventRadius] = useState<number>(15);
  const [selectedEvent, setSelectedEvent] = useState<number>(0);
  const [ticketReserved, setTicketReserved] = useState(false);

  const sampleScans = [
    {
      id: 'bacterial',
      label: 'Sample A: Bacterial Case',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
      diagnosis: 'Bacterial Pneumonia Detected',
      confidence: 96.4,
      latency: 218,
      severity: 'high' as const,
      findings: 'Focal lobar consolidation with prominent air bronchograms in right lower lung field.'
    },
    {
      id: 'viral',
      label: 'Sample B: Viral Case',
      img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
      diagnosis: 'Viral Pneumonia Pattern',
      confidence: 91.8,
      latency: 242,
      severity: 'moderate' as const,
      findings: 'Diffuse interstitial bilateral infiltrates and ground-glass opacities.'
    },
    {
      id: 'normal',
      label: 'Sample C: Clear Radiograph',
      img: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=600&q=80',
      diagnosis: 'Normal Pulmonary Anatomy',
      confidence: 98.7,
      latency: 184,
      severity: 'low' as const,
      findings: 'Clear costophrenic angles, normal cardiac silhouette, no acute focal consolidation.'
    }
  ];

  const handleRunInference = (scanId: 'normal' | 'bacterial' | 'viral') => {
    setSelectedScan(scanId);
    setIsScanning(true);
    playSound('scan');

    const found = sampleScans.find((s) => s.id === scanId)!;

    setTimeout(() => {
      setScanResult({
        diagnosis: found.diagnosis,
        confidence: found.confidence,
        latency: found.latency,
        severity: found.severity,
        findings: found.findings
      });
      setIsScanning(false);
      playSound('pop');
    }, 450);
  };

  const yugogooEvents = [
    {
      title: 'Accra DevFest 2026',
      category: 'Tech Conference',
      distance: '3.2 km away',
      venue: 'National Theatre, Accra',
      attendees: '480+ attending',
      time: 'Sat · 10:00 AM'
    },
    {
      title: 'Afrobeats & Visuals Jam',
      category: 'Creative Meetup',
      distance: '7.8 km away',
      venue: 'Alliance Française',
      attendees: '190+ attending',
      time: 'Sun · 4:00 PM'
    },
    {
      title: 'AI Builders Hack Night',
      category: 'Hackathon',
      distance: '14.1 km away',
      venue: 'Tech Hub Osu',
      attendees: '85+ RSVPed',
      time: 'Next Fri · 6:00 PM'
    }
  ];

  return (
    <section id="build" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF35C] border-2 border-[#111111] text-xs font-mono font-bold text-[#111111] shadow-[2px_2px_0px_0px_#111111] uppercase tracking-wider mb-4">
          <Terminal className="w-3.5 h-3.5" />
          <span>BUILD MODE // SOFTWARE & AI SYSTEMS</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-[#111111] tracking-tight mb-4">
          ENGINEERED FOR SPEED & PRECISION.
        </h2>
        <p className="text-base sm:text-xl text-[#555555] max-w-3xl leading-relaxed">
          From deploying deep computer vision models with sub-second inference to orchestrating geospatial platforms and high-throughput web applications.
        </p>
      </div>

      {/* FEATURED PROJECT 1: MEDVISION with Real Live Link Preview & Simulator */}
      <div className="mb-16 rounded-3xl bg-white border-3 border-[#111111] shadow-[8px_8px_0px_0px_#111111] overflow-hidden">
        <div className="p-6 sm:p-10 border-b-2 border-[#111111] bg-[#FAFAF7] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#FFF35C] border border-[#111111] text-xs font-bold font-mono text-[#111111]">
                FEATURED AI CASE STUDY
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#111111] text-[11px] font-mono text-[#555555]">
                MobileNetV2 · FastAPI · Vercel
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-[#111111]">
              MedVision — Clinical AI Pneumonia Diagnostic System
            </h3>
            <p className="text-sm sm:text-base text-[#555555] mt-1 max-w-2xl">
              Deep transfer learning classifier assisting physicians with rapid triaging of pediatric chest radiographs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#ECECE4] p-1 rounded-2xl border-2 border-[#111111]">
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  setMedvisionTab('preview');
                }}
                className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                  medvisionTab === 'preview'
                    ? 'bg-[#111111] text-[#FFF35C] shadow-sm'
                    : 'text-[#555555] hover:text-[#111111]'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Live Preview</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  setMedvisionTab('simulator');
                }}
                className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                  medvisionTab === 'simulator'
                    ? 'bg-[#111111] text-[#FFF35C] shadow-sm'
                    : 'text-[#555555] hover:text-[#111111]'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>AI Simulator</span>
              </button>
            </div>

            <button
              id="medvision-case-study-btn"
              onClick={() => {
                playSound('pop');
                onOpenCaseStudy(BUILD_PROJECTS[0]);
              }}
              className="px-5 py-2.5 rounded-2xl bg-[#111111] hover:bg-[#222222] text-[#FFF35C] font-display font-bold text-xs border-2 border-[#111111] shadow-[3px_3px_0px_0px_#FFF35C] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center gap-2"
            >
              <span>FULL CASE STUDY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://medvision1.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-2xl bg-[#FFF35C] hover:bg-[#ffe338] text-[#111111] font-display font-bold text-xs border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
              title="Visit MedVision Live Web App"
            >
              <span>VISIT LIVE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/alqabid"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-2xl bg-white border-2 border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_0px_#111111] hover:bg-[#F0F0EA] transition-all"
              title="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Content Area */}
        {medvisionTab === 'preview' ? (
          <div className="p-6 sm:p-10">
            <WebsitePreview
              url="https://medvision1.vercel.app/"
              title="MedVision — AI Pneumonia Diagnostic System"
              tagline="Clinical diagnostic support tool for rapid pediatric chest radiograph classification."
              accentColor="#FFF35C"
              heightClass="h-96 sm:h-[480px]"
              allowLiveIframe={true}
            />
          </div>
        ) : (
          /* Live Simulator Workspace */
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Sample Selector & X-Ray Viewport */}
            <div className="lg:col-span-6 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#666666] uppercase">
                  TEST DATASET SELECTOR
                </span>
                <span className="text-[11px] font-mono text-[#888888]">
                  Select radiograph to trigger MobileNetV2
                </span>
              </div>

              {/* Selector Pills */}
              <div className="grid grid-cols-3 gap-2">
                {sampleScans.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleRunInference(s.id as 'normal' | 'bacterial' | 'viral')}
                    className={`px-3 py-2.5 rounded-xl border-2 text-xs font-display font-bold transition-all text-center cursor-pointer ${
                      selectedScan === s.id
                        ? 'bg-[#111111] text-[#FFF35C] border-[#111111] shadow-[2px_2px_0px_0px_#FFF35C]'
                        : 'bg-white text-[#333333] border-[#E0E0D8] hover:border-[#111111]'
                    }`}
                  >
                    {s.id.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* X-Ray Visualizer Frame */}
              <div className="relative rounded-2xl bg-black border-2 border-[#111111] h-64 sm:h-72 overflow-hidden flex items-center justify-center">
                <img
                  src={sampleScans.find((s) => s.id === selectedScan)?.img}
                  alt="Chest Radiograph"
                  className="w-full h-full object-cover opacity-80"
                />

                {/* Scanning HUD Overlay Line */}
                {isScanning && (
                  <motion.div
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 0.45, ease: 'linear' }}
                    className="absolute left-0 right-0 h-1 bg-[#FFF35C] shadow-[0_0_15px_#FFF35C] z-10"
                  />
                )}

                {/* Grad-CAM styled attention heatmap for positive cases */}
                {selectedScan !== 'normal' && !isScanning && (
                  <div
                    className="absolute inset-0 bg-radial from-red-500/30 via-yellow-500/15 to-transparent mix-blend-screen pointer-events-none"
                    style={{
                      transform: selectedScan === 'bacterial' ? 'translate(20px, 15px)' : 'translate(-10px, -10px)'
                    }}
                  />
                )}

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-sm border border-white/20 text-[10px] font-mono text-white">
                  DICOM / 512x512 TENSOR
                </div>

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-[#FFF35C] text-[#111111] font-mono text-[10px] font-bold border border-[#111111]">
                  {isScanning ? 'INFERENCING...' : 'PREPROCESSED'}
                </div>
              </div>
            </div>

            {/* Right Column: Model Telemetry & Diagnostic Breakdown */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#ECECE4]">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#10B981]" />
                    <span className="font-mono text-xs font-bold text-[#111111] uppercase">
                      INFERENCE TELEMETRY
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#666666]">
                    Latency: <strong className="text-[#111111]">{scanResult.latency}ms</strong>
                  </span>
                </div>

                {/* Diagnosis Output Card */}
                <div
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    scanResult.severity === 'high'
                      ? 'bg-[#FFF35C]/20 border-[#111111]'
                      : scanResult.severity === 'moderate'
                      ? 'bg-[#C9B8FF]/20 border-[#111111]'
                      : 'bg-[#B9F5D0]/30 border-[#111111]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-[#666666]">
                        PREDICTED CLASSIFICATION
                      </span>
                      <h4 className="text-xl font-display font-extrabold text-[#111111]">
                        {scanResult.diagnosis}
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#111111] text-white font-mono text-xs font-bold">
                      {scanResult.confidence}% CONFIDENCE
                    </span>
                  </div>

                  {/* Confidence Bar */}
                  <div className="w-full h-2 rounded-full bg-white border border-[#111111] overflow-hidden my-3">
                    <div
                      className="h-full bg-[#111111] transition-all duration-500"
                      style={{ width: `${scanResult.confidence}%` }}
                    />
                  </div>

                  <p className="text-xs text-[#444444] font-medium leading-relaxed">
                    <strong>Radiologist Notes:</strong> {scanResult.findings}
                  </p>
                </div>

                {/* Architecture Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-[#FAFAF7] border border-[#E5E5DC]">
                    <span className="text-[10px] font-mono text-[#777777] block">Validation</span>
                    <span className="font-display font-bold text-sm text-[#111111]">94.2% Acc</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAFAF7] border border-[#E5E5DC]">
                    <span className="text-[10px] font-mono text-[#777777] block">Params</span>
                    <span className="font-display font-bold text-sm text-[#111111]">3.4M (Quant)</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAFAF7] border border-[#E5E5DC]">
                    <span className="text-[10px] font-mono text-[#777777] block">Deployment</span>
                    <span className="font-display font-bold text-sm text-[#111111]">Vercel Edge</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#ECECE4] flex items-center justify-between text-xs text-[#666666]">
                <span>Trained on labeled pediatric chest X-ray datasets</span>
                <button
                  onClick={() => onOpenCaseStudy(BUILD_PROJECTS[0])}
                  className="font-display font-bold text-[#111111] underline hover:text-[#444444] cursor-pointer"
                >
                  Inspect Architecture →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FEATURED PROJECT 2: YUGOGOO with Live Link Preview & Discovery Engine */}
      <div className="mb-16 rounded-3xl bg-white border-3 border-[#111111] shadow-[8px_8px_0px_0px_#111111] overflow-hidden">
        <div className="p-6 sm:p-10 border-b-2 border-[#111111] bg-[#FAFAF7] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#A9DDFF] border border-[#111111] text-xs font-bold font-mono text-[#111111]">
                LOCATION PRODUCT & TICKETING
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#111111] text-[11px] font-mono text-[#555555]">
                React · Node.js · Vercel · QR Engine
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-[#111111]">
              Yugogoo — Real-time Event Discovery & Social Ticketing
            </h3>
            <p className="text-sm sm:text-base text-[#555555] mt-1 max-w-2xl">
              Led product architecture from zero to 120+ active community events with cryptographically verified digital passes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#ECECE4] p-1 rounded-2xl border-2 border-[#111111]">
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  setYugogooTab('preview');
                }}
                className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                  yugogooTab === 'preview'
                    ? 'bg-[#111111] text-[#A9DDFF] shadow-sm'
                    : 'text-[#555555] hover:text-[#111111]'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Live Preview</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  setYugogooTab('simulator');
                }}
                className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                  yugogooTab === 'simulator'
                    ? 'bg-[#111111] text-[#A9DDFF] shadow-sm'
                    : 'text-[#555555] hover:text-[#111111]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Discovery Feed</span>
              </button>
            </div>

            <button
              id="yugogoo-case-study-btn"
              onClick={() => {
                playSound('pop');
                onOpenCaseStudy(BUILD_PROJECTS[1]);
              }}
              className="px-5 py-2.5 rounded-2xl bg-[#111111] hover:bg-[#222222] text-[#A9DDFF] font-display font-bold text-xs border-2 border-[#111111] shadow-[3px_3px_0px_0px_#A9DDFF] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center gap-2"
            >
              <span>FULL CASE STUDY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="http://yugogoo-website.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-2xl bg-[#A9DDFF] hover:bg-[#8ecefa] text-[#111111] font-display font-bold text-xs border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
              title="Visit Yugogoo Live Web Platform"
            >
              <span>VISIT LIVE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/alqabid"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-2xl bg-white border-2 border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_0px_#111111] hover:bg-[#F0F0EA] transition-all"
              title="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Content Area */}
        {yugogooTab === 'preview' ? (
          <div className="p-6 sm:p-10">
            <WebsitePreview
              url="http://yugogoo-website.vercel.app/"
              title="Yugogoo — Real-time Event Discovery & Ticketing"
              tagline="Location-based platform for discovering local happenings with dynamic QR passes."
              accentColor="#A9DDFF"
              heightClass="h-96 sm:h-[480px]"
              allowLiveIframe={true}
            />
          </div>
        ) : (
          /* Interactive Discovery Grid */
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Interactive Radius Controller & Live Events Feed */}
            <div className="lg:col-span-7 space-y-4">
              {/* Radius Slider Bar */}
              <div className="p-4 rounded-2xl bg-[#FAFAF7] border-2 border-[#111111] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#111111] uppercase block">
                    GEOSPATIAL DISCOVERY RADIUS
                  </span>
                  <span className="text-[11px] text-[#666666]">
                    Simulating PostGIS proximity clustering
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {[5, 15, 50].map((km) => (
                    <button
                      key={km}
                      onClick={() => {
                        playSound('click');
                        setEventRadius(km);
                      }}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-display font-bold cursor-pointer transition-all ${
                        eventRadius === km
                          ? 'bg-[#111111] text-[#A9DDFF] border-[#111111]'
                          : 'bg-white text-[#333333] border-[#CCCCCC] hover:border-[#111111]'
                      }`}
                    >
                      {km} km
                    </button>
                  ))}
                </div>
              </div>

              {/* Event List with interactive selector */}
              <div className="space-y-3">
                {yugogooEvents.map((evt, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      playSound('click');
                      setSelectedEvent(idx);
                      setTicketReserved(false);
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      selectedEvent === idx
                        ? 'bg-[#A9DDFF]/20 border-[#111111] shadow-[3px_3px_0px_0px_#111111]'
                        : 'bg-white border-[#E0E0D8] hover:border-[#111111]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#111111] text-white font-mono text-[10px] font-bold">
                          {evt.category}
                        </span>
                        <span className="text-xs font-mono text-[#666666] flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#111111]" /> {evt.distance}
                        </span>
                      </div>
                      <h4 className="text-base font-display font-extrabold text-[#111111]">
                        {evt.title}
                      </h4>
                      <p className="text-xs text-[#555555]">
                        {evt.venue} · {evt.time}
                      </p>
                    </div>

                    <div className="text-right hidden sm:block">
                      <span className="text-xs font-display font-bold text-[#111111] block">
                        {evt.attendees}
                      </span>
                      <span className="text-[10px] font-mono text-[#10B981] font-bold">
                        ● Live Feed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Real-time Ticket Pass Generator Simulation */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="rounded-2xl bg-[#111111] text-white p-6 border-2 border-[#111111] shadow-[4px_4px_0px_0px_#A9DDFF] relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 border-b border-white/15 pb-3">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-[#A9DDFF]" />
                    <span className="font-mono text-xs font-bold tracking-wider text-[#A9DDFF]">
                      YUGOGOO PASS ENGINE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-white/80">
                    SIGNED SHA-256
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-[10px] font-mono text-white/60 uppercase">EVENT SELECTION</span>
                  <h5 className="text-lg font-display font-bold text-white">
                    {yugogooEvents[selectedEvent].title}
                  </h5>
                  <p className="text-xs text-white/70">
                    {yugogooEvents[selectedEvent].venue}
                  </p>
                </div>

                {/* Dynamic QR Mock Card */}
                <div className="p-4 rounded-xl bg-white text-[#111111] flex items-center justify-between gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#FAFAF7] border-2 border-[#111111] rounded-lg flex items-center justify-center p-1">
                    <QrCode className="w-full h-full text-[#111111]" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[9px] font-mono text-[#777777] uppercase block">
                      FAST VENUE CHECK-IN
                    </span>
                    <span className="font-mono font-bold text-xs text-[#111111] block">
                      YG-PASS #8921-GH
                    </span>
                    <span className="text-[10px] text-[#10B981] font-bold">
                      ✓ Offline Verification Ready
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playSound('pop');
                    setTicketReserved(true);
                  }}
                  className="w-full py-3 rounded-xl bg-[#A9DDFF] hover:bg-[#8ecefa] text-[#111111] font-display font-bold text-xs tracking-wider uppercase border border-[#111111] transition-all cursor-pointer"
                >
                  {ticketReserved ? '✓ DIGITAL PASS GENERATED' : 'GENERATE TEST ACCESS PASS'}
                </button>
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-[#FAFAF7] border border-[#ECECE4] flex items-center justify-between text-xs text-[#666666]">
                <span>Role: Product Lead & Lead Architect</span>
                <span className="font-mono font-bold text-[#111111]">120+ Events Tested</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ADDITIONAL PRODUCTION PROJECTS GRID (UGOGO, GRANDIOSE GLAM, AUTORESUME AI) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* UGOGO */}
        <div className="rounded-3xl bg-[#FAFAF7] border-2 border-[#111111] p-5 flex flex-col justify-between shadow-[4px_4px_0px_0px_#111111] transition-all hover:-translate-y-1">
          <div className="space-y-3">
            {/* Live Link Preview Browser Header */}
            <div className="rounded-xl overflow-hidden border border-[#111111] bg-[#111111]">
              <div className="px-3 py-1.5 bg-[#1C1C1C] border-b border-[#333333] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[140px]">
                  ugogo.vercel.app
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              </div>
              <div className="h-32 bg-[#151515] relative overflow-hidden flex items-center justify-center">
                <img
                  src="https://api.microlink.io?url=http%3A%2F%2Fugogo.vercel.app&screenshot=true&meta=false&embed=screenshot.url"
                  alt="UGOGO Live Preview"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[10px] font-mono text-[#B9F5D0] font-bold">
                    ● Production Live on Vercel
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-[#B9F5D0] border border-[#111111] text-[10px] font-mono font-bold text-[#111111]">
                  MOBILITY & LOCAL
                </span>
                <span className="text-[10px] font-mono text-[#777777]">React · Vite</span>
              </div>
              <h4 className="text-lg font-display font-extrabold text-[#111111]">
                UGOGO — Urban Discovery & Mobility
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed line-clamp-2">
                Location-first urban exploration platform combining dynamic venue indexing and commuter insights.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#ECECE4] flex items-center justify-between gap-2">
            <a
              href="http://ugogo.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-xl bg-[#111111] hover:bg-[#333333] text-[#B9F5D0] font-display font-bold text-xs border border-[#111111] text-center flex items-center justify-center gap-1.5 transition-all"
            >
              <span>VISIT LIVE</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => onOpenCaseStudy(BUILD_PROJECTS[2])}
              className="px-3 py-2 rounded-xl bg-white hover:bg-[#F0F0EA] text-[#111111] font-display font-bold text-xs border border-[#111111] cursor-pointer"
              title="View Case Study"
            >
              CASE STUDY
            </button>
            <a
              href="https://github.com/alqabid"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white border border-[#111111] text-[#111111] hover:bg-[#F0F0EA]"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* GRANDIOSE GLAM */}
        <div className="rounded-3xl bg-[#FAFAF7] border-2 border-[#111111] p-5 flex flex-col justify-between shadow-[4px_4px_0px_0px_#111111] transition-all hover:-translate-y-1">
          <div className="space-y-3">
            {/* Live Link Preview Browser Header */}
            <div className="rounded-xl overflow-hidden border border-[#111111] bg-[#111111]">
              <div className="px-3 py-1.5 bg-[#1C1C1C] border-b border-[#333333] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[140px]">
                  grandioseglam.vercel.app
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              </div>
              <div className="h-32 bg-[#151515] relative overflow-hidden flex items-center justify-center">
                <img
                  src="https://api.microlink.io?url=https%3A%2F%2Fgrandioseglam.vercel.app&screenshot=true&meta=false&embed=screenshot.url"
                  alt="Grandiose Glam Live Preview"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[10px] font-mono text-[#FFB7D5] font-bold">
                    ● Production Live on Vercel
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-[#FFB7D5] border border-[#111111] text-[10px] font-mono font-bold text-[#111111]">
                  LUXURY E-COMMERCE
                </span>
                <span className="text-[10px] font-mono text-[#777777]">React · Tailwind</span>
              </div>
              <h4 className="text-lg font-display font-extrabold text-[#111111]">
                Grandiose Glam — Beauty Storefront
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed line-clamp-2">
                High-converting luxury cosmetics boutique with editorial aesthetics, rapid cart drawer, and checkout funnels.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#ECECE4] flex items-center justify-between gap-2">
            <a
              href="https://grandioseglam.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-xl bg-[#111111] hover:bg-[#333333] text-[#FFB7D5] font-display font-bold text-xs border border-[#111111] text-center flex items-center justify-center gap-1.5 transition-all"
            >
              <span>VISIT LIVE</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => onOpenCaseStudy(BUILD_PROJECTS[3])}
              className="px-3 py-2 rounded-xl bg-white hover:bg-[#F0F0EA] text-[#111111] font-display font-bold text-xs border border-[#111111] cursor-pointer"
              title="View Case Study"
            >
              CASE STUDY
            </button>
            <a
              href="https://github.com/alqabid"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white border border-[#111111] text-[#111111] hover:bg-[#F0F0EA]"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* AUTORESUME AI / GITHUB REPOSITORIES */}
        <div className="rounded-3xl bg-[#FAFAF7] border-2 border-[#111111] p-5 flex flex-col justify-between shadow-[4px_4px_0px_0px_#111111] transition-all hover:-translate-y-1">
          <div className="space-y-3">
            {/* Live Link Preview Browser Header */}
            <div className="rounded-xl overflow-hidden border border-[#111111] bg-[#111111]">
              <div className="px-3 py-1.5 bg-[#1C1C1C] border-b border-[#333333] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[140px]">
                  github.com/alqabid
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              </div>
              <div className="h-32 bg-[#151515] relative overflow-hidden flex items-center justify-center">
                <img
                  src="https://api.microlink.io?url=https%3A%2F%2Fgithub.com%2Falqabid&screenshot=true&meta=false&embed=screenshot.url"
                  alt="GitHub Repositories Preview"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[10px] font-mono text-[#C9B8FF] font-bold">
                    ● GitHub Code Base & Repos
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-[#C9B8FF] border border-[#111111] text-[10px] font-mono font-bold text-[#111111]">
                  NLP & REPOSITORIES
                </span>
                <span className="text-[10px] font-mono text-[#777777]">Python · TypeScript</span>
              </div>
              <h4 className="text-lg font-display font-extrabold text-[#111111]">
                AutoResume AI & Systems
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed line-clamp-2">
                Automated ATS optimizer with semantic keyword parsing and NLP competency match scoring.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#ECECE4] flex items-center justify-between gap-2">
            <a
              href="https://github.com/alqabid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-xl bg-[#111111] hover:bg-[#333333] text-[#C9B8FF] font-display font-bold text-xs border border-[#111111] text-center flex items-center justify-center gap-1.5 transition-all"
            >
              <span>EXPLORE GITHUB</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => onOpenCaseStudy(BUILD_PROJECTS[4])}
              className="px-3 py-2 rounded-xl bg-white hover:bg-[#F0F0EA] text-[#111111] font-display font-bold text-xs border border-[#111111] cursor-pointer"
            >
              DETAILS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
