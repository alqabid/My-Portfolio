import React, { useState } from 'react';
import { ExternalLink, RefreshCw, Globe, ShieldCheck, Monitor, Maximize2, Sparkles } from 'lucide-react';
import { playSound } from '../utils/sound';

interface WebsitePreviewProps {
  url: string;
  title: string;
  tagline?: string;
  accentColor?: string;
  heightClass?: string;
  allowLiveIframe?: boolean;
  compact?: boolean;
}

export const WebsitePreview: React.FC<WebsitePreviewProps> = ({
  url,
  title,
  tagline,
  accentColor = '#FFF35C',
  heightClass = 'h-72 sm:h-96',
  allowLiveIframe = true,
  compact = false,
}) => {
  const [viewMode, setViewMode] = useState<'screenshot' | 'iframe'>('screenshot');
  const [iframeKey, setIframeKey] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  // Extract clean domain
  const cleanDomain = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=64`;
  
  // Real website screenshot preview services
  const screenshotUrl = `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
  const fallbackScreenshotUrl = `https://image.thum.io/get/width/1200/crop/800/${url}`;

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(url);
    setCopied(true);
    playSound('pop');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('click');
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="w-full rounded-2xl border-2 border-[#111111] bg-[#111111] overflow-hidden shadow-[4px_4px_0px_0px_#111111] flex flex-col">
      {/* Realistic Browser Chrome / Navigation Header */}
      <div className="bg-[#1C1C1C] px-3.5 py-2.5 border-b border-[#333333] flex items-center justify-between gap-3 select-none">
        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>

        {/* Address Bar */}
        <div
          onClick={handleCopyUrl}
          className="flex-1 max-w-xl mx-auto px-3 py-1 rounded-lg bg-[#0D0D0D] hover:bg-[#151515] border border-[#333333] flex items-center justify-between gap-2 cursor-pointer transition-colors group"
          title="Click to copy live URL"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              src={faviconUrl}
              alt=""
              className="w-3.5 h-3.5 rounded-sm shrink-0"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <ShieldCheck className="w-3 h-3 text-[#10B981] shrink-0" />
            <span className="text-[11px] font-mono text-neutral-300 truncate">
              {url}
            </span>
          </div>

          <span className="text-[10px] font-mono text-[#888888] group-hover:text-white shrink-0 hidden sm:inline">
            {copied ? 'COPIED!' : 'COPY'}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {allowLiveIframe && (
            <div className="hidden sm:flex items-center bg-[#0D0D0D] border border-[#333333] rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  setViewMode('screenshot');
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                  viewMode === 'screenshot'
                    ? 'bg-[#333333] text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Snapshot
              </button>
              <button
                type="button"
                onClick={() => {
                  playSound('pop');
                  setViewMode('iframe');
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                  viewMode === 'iframe'
                    ? 'bg-[#FFF35C] text-[#111111]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Interactive
              </button>
            </div>
          )}

          {viewMode === 'iframe' && (
            <button
              type="button"
              onClick={handleRefresh}
              className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-[#333333] transition-colors"
              title="Reload Frame"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-[#333333] hover:bg-[#FFF35C] text-white hover:text-[#111111] transition-all flex items-center gap-1"
            title="Open Live Web App in New Tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Preview Viewport Canvas */}
      <div className={`relative w-full ${heightClass} bg-[#0D0D0D] overflow-hidden flex items-center justify-center`}>
        {viewMode === 'iframe' ? (
          <iframe
            key={iframeKey}
            src={url}
            title={`${title} Live Preview`}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            loading="lazy"
          />
        ) : (
          <div className="relative w-full h-full bg-[#151515] flex flex-col justify-between">
            {/* Real Screenshot Preview from URL */}
            {!imageError ? (
              <img
                src={screenshotUrl}
                alt={`${title} Real Website Preview`}
                onError={() => {
                  setImageError(true);
                }}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#1C1C1C] to-[#0D0D0D]">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-[#333333] mb-3 shadow-lg"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <Globe className="w-7 h-7" style={{ color: accentColor }} />
                </div>
                <h4 className="text-white font-display font-extrabold text-lg sm:text-xl">
                  {title}
                </h4>
                <p className="text-neutral-400 font-mono text-xs max-w-md mt-1">
                  {url}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#FFF35C] text-[#111111] font-display font-bold text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <span>Launch Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* Bottom Overlay Info Banner */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#10B981] font-bold">
                    LIVE PRODUCTION DEPLOYMENT
                  </span>
                </div>
                <h4 className="text-white font-display font-extrabold text-base sm:text-lg">
                  {title}
                </h4>
                {tagline && (
                  <p className="text-neutral-300 text-xs font-medium max-w-md line-clamp-1">
                    {tagline}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                {allowLiveIframe && (
                  <button
                    type="button"
                    onClick={() => {
                      playSound('pop');
                      setViewMode('iframe');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white font-mono text-xs backdrop-blur-sm border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Monitor className="w-3.5 h-3.5 text-[#FFF35C]" />
                    <span>Live Interactive View</span>
                  </button>
                )}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[#FFF35C] hover:bg-[#ffe338] text-[#111111] font-display font-bold text-xs border border-[#111111] flex items-center gap-1 shadow-sm transition-all"
                >
                  <span>VISIT SITE</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
