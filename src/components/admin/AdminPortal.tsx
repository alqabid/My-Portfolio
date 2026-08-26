import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Palette,
  Glasses,
  Cpu,
  Briefcase,
  Clock,
  Inbox,
  Shield,
  LogOut,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Check,
  Download,
  Upload,
  RotateCcw,
  Eye,
  Search,
  X,
  Copy,
  ChevronRight,
  Terminal,
  FileCode,
  Tag,
  AlertCircle
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, DesignItem, ARLens, SkillNode, ServiceItem, ExperienceItem } from '../../types';
import { playSound } from '../../utils/sound';

type AdminTab =
  | 'overview'
  | 'profile'
  | 'projects'
  | 'designs'
  | 'lenses'
  | 'skills'
  | 'services'
  | 'experience'
  | 'messages'
  | 'settings';

export const AdminPortal: React.FC = () => {
  const {
    personalInfo,
    updatePersonalInfo,
    buildProjects,
    addProject,
    updateProject,
    deleteProject,
    designItems,
    addDesignItem,
    updateDesignItem,
    deleteDesignItem,
    arLenses,
    addARLens,
    updateARLens,
    deleteARLens,
    skillNodes,
    addSkillNode,
    updateSkillNode,
    deleteSkillNode,
    services,
    addService,
    updateService,
    deleteService,
    experience,
    addExperience,
    updateExperience,
    deleteExperience,
    contactMessages,
    updateMessageStatus,
    deleteMessage,
    clearAllMessages,
    adminConfigState,
    updateAdminConfig,
    logoutAdmin,
    isAdminPortalOpen,
    setIsAdminPortalOpen,
    exportBackupJson,
    importBackupJson,
    resetToDefaults
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [saveNotification, setSaveNotification] = useState<string>('');

  // Editing modals/states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProjectModal, setIsNewProjectModal] = useState(false);

  const [editingDesign, setEditingDesign] = useState<DesignItem | null>(null);
  const [isNewDesignModal, setIsNewDesignModal] = useState(false);

  const [editingLens, setEditingLens] = useState<ARLens | null>(null);
  const [isNewLensModal, setIsNewLensModal] = useState(false);

  const [editingSkill, setEditingSkill] = useState<SkillNode | null>(null);
  const [isNewSkillModal, setIsNewSkillModal] = useState(false);

  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isNewServiceModal, setIsNewServiceModal] = useState(false);

  const [editingExpIndex, setEditingExpIndex] = useState<number | null>(null);
  const [isNewExpModal, setIsNewExpModal] = useState(false);

  // Security config local state
  const [newAdminEmail, setNewAdminEmail] = useState(adminConfigState.email);
  const [newAdminPin, setNewAdminPin] = useState(adminConfigState.pin);

  // Search queries for lists
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAdminPortalOpen) return null;

  const showToast = (msg: string) => {
    playSound('pop');
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(''), 3000);
  };

  const handleExport = () => {
    playSound('pop');
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportBackupJson());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `abdul_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Database exported as JSON backup.');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        if (event.target?.result) {
          const res = importBackupJson(event.target.result as string);
          if (res.success) {
            playSound('unlock');
            showToast(res.message);
          } else {
            alert(res.message);
          }
        }
      };
    }
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail || !newAdminPin) {
      alert('Email and PIN are required.');
      return;
    }
    updateAdminConfig({ email: newAdminEmail, pin: newAdminPin });
    showToast('Security credentials updated successfully.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0C0D10] text-[#E1E2E8] flex flex-col overflow-hidden font-sans">
      {/* Top Header */}
      <header className="h-14 bg-[#14151B] text-neutral-200 px-4 sm:px-6 flex items-center justify-between border-b border-neutral-800 shrink-0 select-none">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-emerald-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-mono font-bold text-xs sm:text-sm text-white tracking-wide uppercase">
              Admin Console
            </h1>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-800 text-neutral-400 border border-neutral-700">
              Active Session
            </span>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          {saveNotification && (
            <div className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-mono text-[11px] font-medium flex items-center gap-1.5 animate-fadeIn">
              <Check className="w-3 h-3" />
              <span>{saveNotification}</span>
            </div>
          )}

          <button
            onClick={() => {
              playSound('click');
              setIsAdminPortalOpen(false);
            }}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-mono text-xs border border-neutral-800 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live View</span>
          </button>

          <button
            onClick={() => {
              playSound('pop');
              logoutAdmin();
            }}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-rose-950 text-neutral-400 hover:text-rose-400 font-mono text-xs border border-neutral-800 hover:border-rose-900 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-60 bg-[#101116] border-r border-neutral-800 p-2.5 overflow-y-auto shrink-0 flex md:flex-col gap-1 border-b md:border-b-0 select-none">
          <div className="hidden md:block px-2.5 py-1.5 text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
            Navigation
          </div>

          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard, count: null },
            { id: 'profile', label: 'Profile & Bio', icon: User, count: null },
            { id: 'projects', label: 'Projects', icon: FolderGit2, count: buildProjects.length },
            { id: 'designs', label: 'Design World', icon: Palette, count: designItems.length },
            { id: 'lenses', label: 'AR Lenses', icon: Glasses, count: arLenses.length },
            { id: 'skills', label: 'Skills & Tech', icon: Cpu, count: skillNodes.length },
            { id: 'services', label: 'Services', icon: Briefcase, count: services.length },
            { id: 'experience', label: 'Experience', icon: Clock, count: experience.length },
            {
              id: 'messages',
              label: 'Inquiries',
              icon: Inbox,
              count: contactMessages.filter((m) => m.status === 'new').length || contactMessages.length,
              badgeHighlight: contactMessages.some((m) => m.status === 'new')
            },
            { id: 'settings', label: 'Settings & Data', icon: Shield, count: null }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playSound('click');
                  setActiveTab(tab.id as AdminTab);
                }}
                className={`w-full px-2.5 py-2 rounded-lg font-mono text-xs text-left flex items-center justify-between transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-neutral-500'}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== null && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                      tab.badgeHighlight
                        ? 'bg-emerald-500 text-black font-bold'
                        : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-7 overflow-y-auto bg-[#0C0D10]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                    Overview
                  </h2>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Portfolio state, active records, and direct editing controls.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExport}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs border border-neutral-800 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Export JSON</span>
                  </button>
                  <label className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs border border-neutral-800 flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Import JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportFile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Stat Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { tab: 'projects', label: 'Build Projects', count: buildProjects.length, icon: FolderGit2 },
                  { tab: 'designs', label: 'Design Items', count: designItems.length, icon: Palette },
                  { tab: 'lenses', label: 'AR Lenses', count: arLenses.length, icon: Glasses },
                  { tab: 'messages', label: 'Inquiries', count: contactMessages.length, icon: Inbox }
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        playSound('click');
                        setActiveTab(stat.tab as AdminTab);
                      }}
                      className="p-4 rounded-xl bg-[#14151B] border border-neutral-800 hover:border-neutral-700 cursor-pointer transition-all space-y-1"
                    >
                      <div className="flex items-center justify-between text-neutral-400">
                        <Icon className="w-4 h-4 text-emerald-400" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                          {stat.label}
                        </span>
                      </div>
                      <div className="text-2xl font-mono font-bold text-white">
                        {stat.count}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Overview Details Panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Profile Summary Panel */}
                <div className="p-5 rounded-xl bg-[#14151B] border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-400" />
                      <h3 className="font-mono font-bold text-xs uppercase text-white tracking-wide">
                        Profile & Branding
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="text-xs font-mono text-emerald-400 hover:underline cursor-pointer"
                    >
                      Edit →
                    </button>
                  </div>
                  <div className="p-3.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-xs font-mono space-y-1.5 text-neutral-300">
                    <div><span className="text-neutral-500">Name:</span> {personalInfo.name}</div>
                    <div><span className="text-neutral-500">Positioning:</span> {personalInfo.positioning}</div>
                    <div><span className="text-neutral-500">Email:</span> {personalInfo.email}</div>
                    <div><span className="text-neutral-500">Snapchat:</span> @{personalInfo.snapchatHandle}</div>
                    <div><span className="text-neutral-500">Location:</span> {personalInfo.location}</div>
                  </div>
                </div>

                {/* Recent Inquiries Panel */}
                <div className="p-5 rounded-xl bg-[#14151B] border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Inbox className="w-4 h-4 text-emerald-400" />
                      <h3 className="font-mono font-bold text-xs uppercase text-white tracking-wide">
                        Recent Inquiries ({contactMessages.length})
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="text-xs font-mono text-emerald-400 hover:underline cursor-pointer"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="space-y-2">
                    {contactMessages.length === 0 ? (
                      <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800 text-xs font-mono text-neutral-500 text-center">
                        No inquiries received yet.
                      </div>
                    ) : (
                      contactMessages.slice(0, 3).map((msg) => (
                        <div
                          key={msg.id}
                          className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono flex items-center justify-between"
                        >
                          <div className="space-y-0.5 max-w-[70%]">
                            <div className="font-bold text-neutral-200">{msg.name}</div>
                            <div className="text-[11px] text-neutral-500 truncate">{msg.message}</div>
                          </div>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-mono ${
                              msg.status === 'new'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-neutral-800 text-neutral-400'
                            }`}
                          >
                            {msg.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE & BIO */}
          {activeTab === 'profile' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <h2 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                  Profile & Identity
                </h2>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Update primary identity parameters, positioning lines, and social URLs.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast('Profile configuration saved.');
                }}
                className="bg-[#14151B] p-5 sm:p-6 rounded-xl border border-neutral-800 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={personalInfo.name}
                      onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                      Short Name
                    </label>
                    <input
                      type="text"
                      value={personalInfo.shortName}
                      onChange={(e) => updatePersonalInfo({ shortName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                      Positioning Statement
                    </label>
                    <input
                      type="text"
                      value={personalInfo.positioning}
                      onChange={(e) => updatePersonalInfo({ positioning: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                      Titles / Roles
                    </label>
                    <input
                      type="text"
                      value={personalInfo.titles}
                      onChange={(e) => updatePersonalInfo({ titles: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    Bio Narrative
                  </label>
                  <textarea
                    rows={4}
                    value={personalInfo.bio}
                    onChange={(e) => updatePersonalInfo({ bio: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={personalInfo.location}
                      onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                      Availability Status
                    </label>
                    <input
                      type="text"
                      value={personalInfo.availability}
                      onChange={(e) => updatePersonalInfo({ availability: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                      Snapchat Handle (without @)
                    </label>
                    <input
                      type="text"
                      value={personalInfo.snapchatHandle}
                      onChange={(e) => updatePersonalInfo({ snapchatHandle: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                      Snapchat Profile URL
                    </label>
                    <input
                      type="text"
                      value={personalInfo.snapchatAccount}
                      onChange={(e) => updatePersonalInfo({ snapchatAccount: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="text"
                      value={personalInfo.github}
                      onChange={(e) => updatePersonalInfo({ github: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={personalInfo.linkedin}
                      onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: PROJECTS (BUILD WORLD) */}
          {activeTab === 'projects' && (
            <div className="max-w-5xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                    Projects (Build World)
                  </h2>
                  <p className="text-xs text-neutral-400 font-mono">
                    Manage software engineering projects, live preview URLs, and case studies.
                  </p>
                </div>
                <button
                  onClick={() => {
                    playSound('click');
                    setIsNewProjectModal(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects Table / List */}
              <div className="space-y-2">
                {buildProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 rounded-xl bg-[#14151B] border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-white">
                          {project.title}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-neutral-900 text-neutral-400 border border-neutral-800">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 font-mono line-clamp-1 max-w-xl">
                        {project.summary}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {project.techStack.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-neutral-900 text-neutral-400 border border-neutral-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          playSound('click');
                          setEditingProject(project);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs border border-neutral-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${project.title}"?`)) {
                            playSound('pop');
                            deleteProject(project.id);
                            showToast('Project removed.');
                          }
                        }}
                        className="p-1.5 rounded-lg bg-neutral-900 hover:bg-rose-950 text-neutral-500 hover:text-rose-400 border border-neutral-800 hover:border-rose-900 cursor-pointer transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DESIGN ITEMS */}
          {activeTab === 'designs' && (
            <div className="max-w-5xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                    Design World
                  </h2>
                  <p className="text-xs text-neutral-400 font-mono">
                    Manage visual assets, YouTube thumbnails, brand identities, and CTR metrics.
                  </p>
                </div>
                <button
                  onClick={() => {
                    playSound('click');
                    setIsNewDesignModal(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Asset</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {designItems.map((design) => (
                  <div
                    key={design.id}
                    className="p-3.5 rounded-xl bg-[#14151B] border border-neutral-800 space-y-2.5 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="w-full h-32 rounded-lg bg-neutral-900 overflow-hidden border border-neutral-800">
                        <img
                          src={design.imageUrl}
                          alt={design.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-white">
                          {design.title}
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-neutral-900 text-neutral-400 border border-neutral-800 uppercase">
                          {design.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-mono line-clamp-2">
                        {design.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-neutral-800/80">
                      <span className="text-[10px] font-mono text-emerald-400">
                        {design.metrics || 'Visual Asset'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            playSound('click');
                            setEditingDesign(design);
                          }}
                          className="p-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-mono"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${design.title}"?`)) {
                              playSound('pop');
                              deleteDesignItem(design.id);
                              showToast('Design asset removed.');
                            }
                          }}
                          className="p-1 rounded bg-neutral-900 hover:bg-rose-950 text-neutral-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: AR LENSES */}
          {activeTab === 'lenses' && (
            <div className="max-w-5xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                    AR Lenses (Snapchat)
                  </h2>
                  <p className="text-xs text-neutral-400 font-mono">
                    Manage Snapchat lens collection, unlock URLs, view counts, and category tags.
                  </p>
                </div>
                <button
                  onClick={() => {
                    playSound('click');
                    setIsNewLensModal(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add AR Lens</span>
                </button>
              </div>

              <div className="space-y-2">
                {arLenses.map((lens) => (
                  <div
                    key={lens.id}
                    className="p-3.5 rounded-xl bg-[#14151B] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 overflow-hidden border border-neutral-800 shrink-0">
                        <img
                          src={lens.previewUrl}
                          alt={lens.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-white">
                            {lens.name}
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-neutral-900 text-neutral-400 border border-neutral-800">
                            {lens.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 font-mono line-clamp-1">
                          {lens.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-emerald-400">
                        {lens.views}
                      </span>
                      <a
                        href={lens.snapcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800"
                        title="Open Unlock Link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => {
                          playSound('click');
                          setEditingLens(lens);
                        }}
                        className="px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs border border-neutral-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete AR lens "${lens.name}"?`)) {
                            playSound('pop');
                            deleteARLens(lens.id);
                            showToast('AR Lens removed.');
                          }
                        }}
                        className="p-1.5 rounded bg-neutral-900 hover:bg-rose-950 text-neutral-500 hover:text-rose-400 border border-neutral-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SKILLS */}
          {activeTab === 'skills' && (
            <div className="max-w-5xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                    Technical Skills & Constellation
                  </h2>
                  <p className="text-xs text-neutral-400 font-mono">
                    Modify competencies, category groupings, and proficiency indices.
                  </p>
                </div>
                <button
                  onClick={() => {
                    playSound('click');
                    setIsNewSkillModal(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {skillNodes.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-3 rounded-lg bg-[#14151B] border border-neutral-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-mono font-bold text-xs text-white">
                        {skill.name}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-500">
                        {skill.category} · Lvl {skill.level}/100
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          playSound('click');
                          setEditingSkill(skill);
                        }}
                        className="p-1 rounded bg-neutral-900 text-neutral-300 hover:bg-neutral-800"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove skill "${skill.name}"?`)) {
                            playSound('pop');
                            deleteSkillNode(skill.id);
                            showToast('Skill removed.');
                          }
                        }}
                        className="p-1 rounded bg-neutral-900 text-neutral-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SERVICES */}
          {activeTab === 'services' && (
            <div className="max-w-5xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                    Service Offerings
                  </h2>
                  <p className="text-xs text-neutral-400 font-mono">
                    Configure specialized engineering and design services offered to clients.
                  </p>
                </div>
                <button
                  onClick={() => {
                    playSound('click');
                    setIsNewServiceModal(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 rounded-xl bg-[#14151B] border border-neutral-800 space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-white">
                          {service.title}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500">
                          {service.iconName}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 font-mono">
                        {service.description}
                      </p>
                      <ul className="space-y-1 pt-1">
                        {service.deliverables.map((item, idx) => (
                          <li key={idx} className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-end gap-1.5 pt-2 border-t border-neutral-800">
                      <button
                        onClick={() => {
                          playSound('click');
                          setEditingService(service);
                        }}
                        className="px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove service "${service.title}"?`)) {
                            playSound('pop');
                            deleteService(service.id);
                            showToast('Service removed.');
                          }
                        }}
                        className="p-1 rounded bg-neutral-900 hover:bg-rose-950 text-neutral-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="max-w-5xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                    Experience & Career Timeline
                  </h2>
                  <p className="text-xs text-neutral-400 font-mono">
                    Manage professional roles, companies, dates, and achievement highlights.
                  </p>
                </div>
                <button
                  onClick={() => {
                    playSound('click');
                    setIsNewExpModal(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Role</span>
                </button>
              </div>

              <div className="space-y-2">
                {experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#14151B] border border-neutral-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-xs text-white">
                          {exp.role}
                        </span>
                        <span className="text-xs text-neutral-400 font-mono">
                          {' '}· {exp.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-neutral-500">
                          {exp.period}
                        </span>
                        <button
                          onClick={() => {
                            playSound('click');
                            setEditingExpIndex(idx);
                          }}
                          className="px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove "${exp.role}" at ${exp.company}?`)) {
                              playSound('pop');
                              deleteExperience(idx);
                              showToast('Experience record removed.');
                            }
                          }}
                          className="p-1 rounded bg-neutral-900 hover:bg-rose-950 text-neutral-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-xs font-mono text-neutral-400 flex items-start gap-2">
                          <span className="text-neutral-600 mt-0.5">·</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: MESSAGES & INQUIRIES */}
          {activeTab === 'messages' && (
            <div className="max-w-5xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                    Inquiries Inbox
                  </h2>
                  <p className="text-xs text-neutral-400 font-mono">
                    Submissions received via portfolio contact form.
                  </p>
                </div>
                {contactMessages.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('Clear all received inquiries?')) {
                        playSound('pop');
                        clearAllMessages();
                        showToast('Inbox cleared.');
                      }
                    }}
                    className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-rose-950 text-neutral-400 hover:text-rose-400 border border-neutral-800 font-mono text-xs cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {contactMessages.length === 0 ? (
                <div className="p-8 text-center bg-[#14151B] border border-neutral-800 rounded-xl space-y-2">
                  <Inbox className="w-8 h-8 text-neutral-600 mx-auto" />
                  <p className="text-xs font-mono text-neutral-400">
                    No client inquiries recorded yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {contactMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-4 rounded-xl bg-[#14151B] border border-neutral-800 space-y-2.5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-neutral-800/80 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-white">
                            {msg.name}
                          </span>
                          <span className="text-xs font-mono text-neutral-400">
                            &lt;{msg.email}&gt;
                          </span>
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9px] font-mono uppercase ${
                              msg.status === 'new'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                            }`}
                          >
                            {msg.status}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-500">
                          {new Date(msg.timestamp).toLocaleString()}
                        </span>
                      </div>

                      <div className="text-xs font-mono text-neutral-300 bg-neutral-900/80 p-3 rounded-lg border border-neutral-800 whitespace-pre-wrap">
                        {msg.message}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-mono text-neutral-500">
                          Type: {msg.projectType || 'General Inquire'}
                        </span>
                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${msg.email}?subject=Re: Inquiry from ${encodeURIComponent(msg.name)}`}
                            className="px-2.5 py-1 rounded bg-white hover:bg-neutral-200 text-neutral-950 font-mono text-xs font-bold"
                          >
                            Reply via Email
                          </a>
                          {msg.status === 'new' && (
                            <button
                              onClick={() => {
                                updateMessageStatus(msg.id, 'read');
                                showToast('Marked as read.');
                              }}
                              className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs border border-neutral-800"
                            >
                              Mark Read
                            </button>
                          )}
                          <button
                            onClick={() => {
                              deleteMessage(msg.id);
                              showToast('Inquiry deleted.');
                            }}
                            className="p-1 rounded bg-neutral-900 hover:bg-rose-950 text-neutral-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 10: SETTINGS & BACKUP */}
          {activeTab === 'settings' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <h2 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                  Security & Data Management
                </h2>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Update administrative authentication credentials and manage local database backups.
                </p>
              </div>

              {/* Security Credentials */}
              <form
                onSubmit={handleSaveSecurity}
                className="bg-[#14151B] p-5 rounded-xl border border-neutral-800 space-y-4"
              >
                <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-mono font-bold text-xs uppercase text-white tracking-wide">
                    Admin Authentication Credentials
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      required
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                      Security PIN Code
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={newAdminPin}
                      onChange={(e) => setNewAdminPin(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 font-mono font-bold text-xs cursor-pointer"
                  >
                    Update Credentials
                  </button>
                </div>
              </form>

              {/* Data Import / Export */}
              <div className="bg-[#14151B] p-5 rounded-xl border border-neutral-800 space-y-4">
                <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-mono font-bold text-xs uppercase text-white tracking-wide">
                    Database Snapshots & Reset
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={handleExport}
                    className="p-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-mono text-xs border border-neutral-800 flex flex-col items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Export JSON Backup</span>
                  </button>

                  <label className="p-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-mono text-xs border border-neutral-800 flex flex-col items-center justify-center gap-2 cursor-pointer">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Import JSON Backup</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportFile}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Reset all dynamic data to initial default state?')) {
                        playSound('pop');
                        resetToDefaults();
                        showToast('Database reset to defaults.');
                      }
                    }}
                    className="p-3 rounded-lg bg-neutral-900 hover:bg-rose-950 text-neutral-400 hover:text-rose-300 font-mono text-xs border border-neutral-800 hover:border-rose-900 flex flex-col items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-rose-400" />
                    <span>Reset to Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: EDIT / NEW PROJECT */}
      {/* ========================================================================= */}
      {(editingProject || isNewProjectModal) && (
        <ProjectModal
          project={editingProject}
          isNew={isNewProjectModal}
          onClose={() => {
            setEditingProject(null);
            setIsNewProjectModal(false);
          }}
          onSave={(proj) => {
            if (isNewProjectModal) {
              addProject(proj);
              showToast('New project added.');
            } else if (editingProject) {
              updateProject(editingProject.id, proj);
              showToast('Project updated.');
            }
            setEditingProject(null);
            setIsNewProjectModal(false);
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT / NEW DESIGN ITEM */}
      {/* ========================================================================= */}
      {(editingDesign || isNewDesignModal) && (
        <DesignModal
          design={editingDesign}
          isNew={isNewDesignModal}
          onClose={() => {
            setEditingDesign(null);
            setIsNewDesignModal(false);
          }}
          onSave={(item) => {
            if (isNewDesignModal) {
              addDesignItem(item);
              showToast('Design item added.');
            } else if (editingDesign) {
              updateDesignItem(editingDesign.id, item);
              showToast('Design item updated.');
            }
            setEditingDesign(null);
            setIsNewDesignModal(false);
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT / NEW AR LENS */}
      {/* ========================================================================= */}
      {(editingLens || isNewLensModal) && (
        <ARLensModal
          lens={editingLens}
          isNew={isNewLensModal}
          onClose={() => {
            setEditingLens(null);
            setIsNewLensModal(false);
          }}
          onSave={(lensData) => {
            if (isNewLensModal) {
              addARLens(lensData);
              showToast('AR lens added.');
            } else if (editingLens) {
              updateARLens(editingLens.id, lensData);
              showToast('AR lens updated.');
            }
            setEditingLens(null);
            setIsNewLensModal(false);
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT / NEW SKILL */}
      {/* ========================================================================= */}
      {(editingSkill || isNewSkillModal) && (
        <SkillModal
          skill={editingSkill}
          isNew={isNewSkillModal}
          onClose={() => {
            setEditingSkill(null);
            setIsNewSkillModal(false);
          }}
          onSave={(skillData) => {
            if (isNewSkillModal) {
              addSkillNode(skillData);
              showToast('Skill node added.');
            } else if (editingSkill) {
              updateSkillNode(editingSkill.id, skillData);
              showToast('Skill node updated.');
            }
            setEditingSkill(null);
            setIsNewSkillModal(false);
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT / NEW SERVICE */}
      {/* ========================================================================= */}
      {(editingService || isNewServiceModal) && (
        <ServiceModal
          service={editingService}
          isNew={isNewServiceModal}
          onClose={() => {
            setEditingService(null);
            setIsNewServiceModal(false);
          }}
          onSave={(serviceData) => {
            if (isNewServiceModal) {
              addService(serviceData);
              showToast('Service added.');
            } else if (editingService) {
              updateService(editingService.id, serviceData);
              showToast('Service updated.');
            }
            setEditingService(null);
            setIsNewServiceModal(false);
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT / NEW EXPERIENCE */}
      {/* ========================================================================= */}
      {(editingExpIndex !== null || isNewExpModal) && (
        <ExperienceModal
          experience={editingExpIndex !== null ? experience[editingExpIndex] : null}
          isNew={isNewExpModal}
          onClose={() => {
            setEditingExpIndex(null);
            setIsNewExpModal(false);
          }}
          onSave={(expData) => {
            if (isNewExpModal) {
              addExperience(expData);
              showToast('Experience added.');
            } else if (editingExpIndex !== null) {
              updateExperience(editingExpIndex, expData);
              showToast('Experience updated.');
            }
            setEditingExpIndex(null);
            setIsNewExpModal(false);
          }}
        />
      )}
    </div>
  );
};

// ============================================================================
// MODAL SUB-COMPONENTS (Clean, developer-console style)
// ============================================================================

interface ProjectModalProps {
  project: Project | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (proj: Project) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isNew, onClose, onSave }) => {
  const [formData, setFormData] = useState<Project>(
    project || {
      id: `proj_${Date.now()}`,
      title: '',
      category: 'Healthcare AI / Web3',
      tagline: '',
      summary: '',
      techStack: ['React', 'TypeScript', 'Tailwind CSS'],
      metrics: '',
      githubUrl: '',
      liveUrl: '',
      previewUrl: '',
      caseStudy: {
        problem: '',
        solution: '',
        architecture: '',
        impact: ''
      }
    }
  );

  const [techInput, setTechInput] = useState(formData.techStack.join(', '));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#14151B] text-neutral-200 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto font-mono text-xs">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="font-bold text-sm text-white">
            {isNew ? 'New Project' : `Edit: ${formData.title}`}
          </h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({
              ...formData,
              techStack: techInput.split(',').map((s) => s.trim()).filter(Boolean)
            });
          }}
          className="space-y-3.5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-neutral-400 uppercase mb-1">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] text-neutral-400 uppercase mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">Summary</label>
            <textarea
              rows={2}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] text-neutral-400 uppercase mb-1">Live URL</label>
              <input
                type="text"
                value={formData.liveUrl || ''}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] text-neutral-400 uppercase mb-1">GitHub URL</label>
              <input
                type="text"
                value={formData.githubUrl || ''}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] text-neutral-400 uppercase mb-1">Metrics</label>
              <input
                type="text"
                value={formData.metrics || ''}
                onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">Tech Stack (comma separated)</label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          {/* Case Study Details */}
          <div className="p-3 bg-neutral-900/60 rounded border border-neutral-800 space-y-2">
            <span className="text-[10px] uppercase text-neutral-400 font-bold block">Case Study Architecture</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Problem statement"
                value={formData.caseStudy?.problem || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    caseStudy: { ...formData.caseStudy, problem: e.target.value, solution: formData.caseStudy?.solution || '', architecture: formData.caseStudy?.architecture || '', impact: formData.caseStudy?.impact || '' }
                  })
                }
                className="w-full px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-white"
              />
              <input
                type="text"
                placeholder="Solution statement"
                value={formData.caseStudy?.solution || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    caseStudy: { ...formData.caseStudy, solution: e.target.value, problem: formData.caseStudy?.problem || '', architecture: formData.caseStudy?.architecture || '', impact: formData.caseStudy?.impact || '' }
                  })
                }
                className="w-full px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded bg-neutral-900 text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-emerald-500 text-neutral-950 font-bold hover:bg-emerald-400"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface DesignModalProps {
  design: DesignItem | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (item: DesignItem) => void;
}

const DesignModal: React.FC<DesignModalProps> = ({ design, isNew, onClose, onSave }) => {
  const [formData, setFormData] = useState<DesignItem>(
    design || {
      id: `des_${Date.now()}`,
      title: '',
      category: 'youtube-thumbnail',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      description: '',
      metrics: '',
      tags: ['CTR Optimized', 'Visuals']
    }
  );

  const [tagsInput, setTagsInput] = useState(formData.tags.join(', '));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#14151B] text-neutral-200 border border-neutral-800 rounded-xl p-5 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="font-bold text-sm text-white">
            {isNew ? 'New Design Item' : `Edit: ${formData.title}`}
          </h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({
              ...formData,
              tags: tagsInput.split(',').map((s) => s.trim()).filter(Boolean)
            });
          }}
          className="space-y-3"
        >
          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-neutral-400 uppercase mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
              >
                <option value="youtube-thumbnail">YouTube Thumbnail</option>
                <option value="branding">Branding & Identity</option>
                <option value="poster">Poster & Key Visual</option>
                <option value="social">Social Graphics</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-neutral-400 uppercase mb-1">Metrics / Tag</label>
              <input
                type="text"
                value={formData.metrics || ''}
                onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">Image URL</label>
            <input
              type="text"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded bg-neutral-900 text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-emerald-500 text-neutral-950 font-bold hover:bg-emerald-400"
            >
              Save Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ARLensModalProps {
  lens: ARLens | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (lens: ARLens) => void;
}

const ARLensModal: React.FC<ARLensModalProps> = ({ lens, isNew, onClose, onSave }) => {
  const [formData, setFormData] = useState<ARLens>(
    lens || {
      id: `lens_${Date.now()}`,
      name: '',
      category: 'Face Tracking',
      description: '',
      views: '500K+ Views',
      snapcodeUrl: 'https://www.snapchat.com/unlock/?type=SNAPCODE',
      previewUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
      features: ['3D Mesh', 'Segmentation'],
      simulatorType: 'cyber-hud'
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#14151B] text-neutral-200 border border-neutral-800 rounded-xl p-5 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="font-bold text-sm text-white">
            {isNew ? 'New Snapchat AR Lens' : `Edit: ${formData.name}`}
          </h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="space-y-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-neutral-400 uppercase mb-1">Lens Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] text-neutral-400 uppercase mb-1">Views</label>
              <input
                type="text"
                value={formData.views}
                onChange={(e) => setFormData({ ...formData, views: e.target.value })}
                className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">Snapcode Unlock URL</label>
            <input
              type="text"
              required
              value={formData.snapcodeUrl}
              onChange={(e) => setFormData({ ...formData, snapcodeUrl: e.target.value })}
              className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">Preview Image URL</label>
            <input
              type="text"
              required
              value={formData.previewUrl}
              onChange={(e) => setFormData({ ...formData, previewUrl: e.target.value })}
              className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded bg-neutral-900 text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-emerald-500 text-neutral-950 font-bold hover:bg-emerald-400"
            >
              Save Lens
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface SkillModalProps {
  skill: SkillNode | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (skill: SkillNode) => void;
}

const SkillModal: React.FC<SkillModalProps> = ({ skill, isNew, onClose, onSave }) => {
  const [formData, setFormData] = useState<SkillNode>(
    skill || {
      id: `skill_${Date.now()}`,
      name: '',
      category: 'code',
      level: 90,
      description: '',
      relatedProjects: []
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#14151B] text-neutral-200 border border-neutral-800 rounded-xl p-5 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="font-bold text-sm text-white">
            {isNew ? 'New Skill Node' : `Edit: ${formData.name}`}
          </h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="space-y-3"
        >
          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">Skill Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-neutral-400 uppercase mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
              >
                <option value="code">Code / Engineering</option>
                <option value="design">Design & CTR</option>
                <option value="ar">Snapchat AR</option>
                <option value="strategy">Strategy / Product</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-neutral-400 uppercase mb-1">Level (1-100)</label>
              <input
                type="number"
                min={10}
                max={100}
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded bg-neutral-900 text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-emerald-500 text-neutral-950 font-bold hover:bg-emerald-400"
            >
              Save Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ServiceModalProps {
  service: ServiceItem | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (service: ServiceItem) => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, isNew, onClose, onSave }) => {
  const [formData, setFormData] = useState<ServiceItem>(
    service || {
      id: `srv_${Date.now()}`,
      title: '',
      description: '',
      iconName: 'Code2',
      deliverables: ['Custom Development', 'Production QA']
    }
  );

  const [delivInput, setDelivInput] = useState(formData.deliverables.join('\n'));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#14151B] text-neutral-200 border border-neutral-800 rounded-xl p-5 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="font-bold text-sm text-white">
            {isNew ? 'New Service' : `Edit: ${formData.title}`}
          </h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({
              ...formData,
              deliverables: delivInput.split('\n').map((s) => s.trim()).filter(Boolean)
            });
          }}
          className="space-y-3"
        >
          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">Service Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">Deliverables (one per line)</label>
            <textarea
              rows={3}
              value={delivInput}
              onChange={(e) => setDelivInput(e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded bg-neutral-900 text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-emerald-500 text-neutral-950 font-bold hover:bg-emerald-400"
            >
              Save Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ExperienceModalProps {
  experience: ExperienceItem | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (exp: ExperienceItem) => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ experience, isNew, onClose, onSave }) => {
  const [formData, setFormData] = useState<ExperienceItem>(
    experience || {
      role: '',
      company: '',
      period: '2024 — Present',
      highlights: ['Led engineering and UI delivery.']
    }
  );

  const [highInput, setHighInput] = useState(formData.highlights.join('\n'));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#14151B] text-neutral-200 border border-neutral-800 rounded-xl p-5 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="font-bold text-sm text-white">
            {isNew ? 'New Experience Record' : `Edit: ${formData.role}`}
          </h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({
              ...formData,
              highlights: highInput.split('\n').map((s) => s.trim()).filter(Boolean)
            });
          }}
          className="space-y-3"
        >
          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">Role Title</label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-neutral-400 uppercase mb-1">Company / Organization</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] text-neutral-400 uppercase mb-1">Period</label>
              <input
                type="text"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-neutral-400 uppercase mb-1">Highlights (one per line)</label>
            <textarea
              rows={3}
              value={highInput}
              onChange={(e) => setHighInput(e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded bg-neutral-900 text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-emerald-500 text-neutral-950 font-bold hover:bg-emerald-400"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
