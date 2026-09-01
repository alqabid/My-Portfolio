import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PersonalInfo,
  Project,
  DesignItem,
  ARLens,
  SkillNode,
  ServiceItem,
  ExperienceItem,
  ContactMessage,
  AdminConfig,
  FullPortfolioData
} from '../types';
import {
  PERSONAL_INFO as DEFAULT_PERSONAL_INFO,
  BUILD_PROJECTS as DEFAULT_BUILD_PROJECTS,
  DESIGN_ITEMS as DEFAULT_DESIGN_ITEMS,
  AR_LENSES as DEFAULT_AR_LENSES,
  SKILL_NODES as DEFAULT_SKILL_NODES,
  SERVICES as DEFAULT_SERVICES,
  EXPERIENCE as DEFAULT_EXPERIENCE
} from '../data/portfolioData';

const STORAGE_KEY = 'abdul_portfolio_cms_v2';
const AUTH_STORAGE_KEY = 'abdul_portfolio_auth_session';

const DEFAULT_ADMIN_CONFIG: AdminConfig = {
  email: 'siakaabdulqabid@gmail.com',
  pin: '2026'
};

const DEFAULT_INITIAL_MESSAGES: ContactMessage[] = [];

interface PortfolioContextType {
  // State slices
  personalInfo: PersonalInfo;
  buildProjects: Project[];
  designItems: DesignItem[];
  arLenses: ARLens[];
  skillNodes: SkillNode[];
  services: ServiceItem[];
  experience: ExperienceItem[];
  contactMessages: ContactMessage[];
  adminConfig: AdminConfig;

  // Personal Info
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;

  // Projects CRUD
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setBuildProjects: React.Dispatch<React.SetStateAction<Project[]>>;

  // Design Items CRUD
  addDesignItem: (item: DesignItem) => void;
  updateDesignItem: (id: string, item: Partial<DesignItem>) => void;
  deleteDesignItem: (id: string) => void;
  setDesignItems: React.Dispatch<React.SetStateAction<DesignItem[]>>;

  // AR Lenses CRUD
  addARLens: (lens: ARLens) => void;
  updateARLens: (id: string, lens: Partial<ARLens>) => void;
  deleteARLens: (id: string) => void;
  setArLenses: React.Dispatch<React.SetStateAction<ARLens[]>>;

  // Skills CRUD
  addSkillNode: (skill: SkillNode) => void;
  updateSkillNode: (id: string, skill: Partial<SkillNode>) => void;
  deleteSkillNode: (id: string) => void;
  setSkillNodes: React.Dispatch<React.SetStateAction<SkillNode[]>>;

  // Services CRUD
  addService: (service: ServiceItem) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;

  // Experience CRUD
  addExperience: (exp: ExperienceItem) => void;
  updateExperience: (index: number, exp: Partial<ExperienceItem>) => void;
  deleteExperience: (index: number) => void;
  setExperience: React.Dispatch<React.SetStateAction<ExperienceItem[]>>;

  // Messages
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => void;
  updateMessageStatus: (id: string, status: 'new' | 'read' | 'replied') => void;
  deleteMessage: (id: string) => void;
  clearAllMessages: () => void;

  // Admin Config & Auth
  adminConfigState: AdminConfig;
  updateAdminConfig: (config: Partial<AdminConfig>) => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (email: string, pin: string) => boolean;
  logoutAdmin: () => void;

  // Admin Modal & Portal visibility
  isAdminPortalOpen: boolean;
  setIsAdminPortalOpen: (open: boolean) => void;
  isAdminLoginModalOpen: boolean;
  setIsAdminLoginModalOpen: (open: boolean) => void;

  // Backup & Restore
  exportBackupJson: () => string;
  importBackupJson: (jsonString: string) => { success: boolean; message: string };
  resetToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial from localStorage or defaults
  const loadSavedData = (): FullPortfolioData => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const storedMessages: ContactMessage[] = Array.isArray(parsed.contactMessages)
          ? parsed.contactMessages.filter(
              (m: ContactMessage) => m && m.id && !m.id.startsWith('msg-sample-')
            )
          : [];
        return {
          personalInfo: parsed.personalInfo || DEFAULT_PERSONAL_INFO,
          buildProjects: parsed.buildProjects || DEFAULT_BUILD_PROJECTS,
          designItems: parsed.designItems || DEFAULT_DESIGN_ITEMS,
          arLenses: parsed.arLenses || DEFAULT_AR_LENSES,
          skillNodes: parsed.skillNodes || DEFAULT_SKILL_NODES,
          services: parsed.services || DEFAULT_SERVICES,
          experience: parsed.experience || DEFAULT_EXPERIENCE,
          contactMessages: storedMessages,
          adminConfig: parsed.adminConfig || DEFAULT_ADMIN_CONFIG
        };
      }
    } catch (e) {
      console.warn('Failed to load portfolio CMS state from storage:', e);
    }
    return {
      personalInfo: DEFAULT_PERSONAL_INFO,
      buildProjects: DEFAULT_BUILD_PROJECTS,
      designItems: DEFAULT_DESIGN_ITEMS,
      arLenses: DEFAULT_AR_LENSES,
      skillNodes: DEFAULT_SKILL_NODES,
      services: DEFAULT_SERVICES,
      experience: DEFAULT_EXPERIENCE,
      contactMessages: DEFAULT_INITIAL_MESSAGES,
      adminConfig: DEFAULT_ADMIN_CONFIG
    };
  };

  const initial = loadSavedData();

  const [personalInfo, setPersonalInfoState] = useState<PersonalInfo>(initial.personalInfo);
  const [buildProjects, setBuildProjects] = useState<Project[]>(initial.buildProjects);
  const [designItems, setDesignItems] = useState<DesignItem[]>(initial.designItems);
  const [arLenses, setArLenses] = useState<ARLens[]>(initial.arLenses);
  const [skillNodes, setSkillNodes] = useState<SkillNode[]>(initial.skillNodes);
  const [services, setServices] = useState<ServiceItem[]>(initial.services);
  const [experience, setExperience] = useState<ExperienceItem[]>(initial.experience);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(initial.contactMessages);
  const [adminConfig, setAdminConfig] = useState<AdminConfig>(initial.adminConfig);

  // Admin Auth & Modals
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // Save changes to localStorage whenever data states update
  useEffect(() => {
    try {
      const fullData: FullPortfolioData = {
        personalInfo,
        buildProjects,
        designItems,
        arLenses,
        skillNodes,
        services,
        experience,
        contactMessages,
        adminConfig
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fullData));
    } catch (e) {
      console.error('Error saving portfolio data to localStorage:', e);
    }
  }, [
    personalInfo,
    buildProjects,
    designItems,
    arLenses,
    skillNodes,
    services,
    experience,
    contactMessages,
    adminConfig
  ]);

  // Personal Info Updater
  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setPersonalInfoState((prev) => ({ ...prev, ...info }));
  };

  // Projects CRUD
  const addProject = (project: Project) => {
    setBuildProjects((prev) => [project, ...prev]);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setBuildProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProject = (id: string) => {
    setBuildProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Design Items CRUD
  const addDesignItem = (item: DesignItem) => {
    setDesignItems((prev) => [item, ...prev]);
  };

  const updateDesignItem = (id: string, updated: Partial<DesignItem>) => {
    setDesignItems((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updated } : d))
    );
  };

  const deleteDesignItem = (id: string) => {
    setDesignItems((prev) => prev.filter((d) => d.id !== id));
  };

  // AR Lenses CRUD
  const addARLens = (lens: ARLens) => {
    setArLenses((prev) => [lens, ...prev]);
  };

  const updateARLens = (id: string, updated: Partial<ARLens>) => {
    setArLenses((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updated } : l))
    );
  };

  const deleteARLens = (id: string) => {
    setArLenses((prev) => prev.filter((l) => l.id !== id));
  };

  // Skills CRUD
  const addSkillNode = (skill: SkillNode) => {
    setSkillNodes((prev) => [...prev, skill]);
  };

  const updateSkillNode = (id: string, updated: Partial<SkillNode>) => {
    setSkillNodes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
  };

  const deleteSkillNode = (id: string) => {
    setSkillNodes((prev) => prev.filter((s) => s.id !== id));
  };

  // Services CRUD
  const addService = (service: ServiceItem) => {
    setServices((prev) => [...prev, service]);
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  // Experience CRUD
  const addExperience = (exp: ExperienceItem) => {
    setExperience((prev) => [exp, ...prev]);
  };

  const updateExperience = (index: number, updated: Partial<ExperienceItem>) => {
    setExperience((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...updated } : item))
    );
  };

  const deleteExperience = (index: number) => {
    setExperience((prev) => prev.filter((_, i) => i !== index));
  };

  // Contact Messages
  const addContactMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => {
    const newMessage: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'new'
    };
    setContactMessages((prev) => [newMessage, ...prev]);
  };

  const updateMessageStatus = (id: string, status: 'new' | 'read' | 'replied') => {
    setContactMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  const deleteMessage = (id: string) => {
    setContactMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const clearAllMessages = () => {
    setContactMessages([]);
  };

  // Admin Config & Auth
  const updateAdminConfig = (updated: Partial<AdminConfig>) => {
    setAdminConfig((prev) => ({ ...prev, ...updated }));
  };

  const loginAdmin = (email: string, pin: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const targetEmail = adminConfig.email.trim().toLowerCase();
    const cleanPin = pin.trim();
    const targetPin = adminConfig.pin.trim();

    if (cleanEmail === targetEmail && cleanPin === targetPin) {
      setIsAdminLoggedIn(true);
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (e) {
        console.warn('Session storage write error', e);
      }
      setAdminConfig((prev) => ({ ...prev, lastLogin: new Date().toISOString() }));
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setIsAdminPortalOpen(false);
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.warn('Session storage remove error', e);
    }
  };

  // Export / Import / Reset
  const exportBackupJson = (): string => {
    const fullData: FullPortfolioData = {
      personalInfo,
      buildProjects,
      designItems,
      arLenses,
      skillNodes,
      services,
      experience,
      contactMessages,
      adminConfig
    };
    return JSON.stringify(fullData, null, 2);
  };

  const importBackupJson = (jsonString: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, message: 'Invalid JSON format.' };
      }

      if (parsed.personalInfo) setPersonalInfoState(parsed.personalInfo);
      if (parsed.buildProjects) setBuildProjects(parsed.buildProjects);
      if (parsed.designItems) setDesignItems(parsed.designItems);
      if (parsed.arLenses) setArLenses(parsed.arLenses);
      if (parsed.skillNodes) setSkillNodes(parsed.skillNodes);
      if (parsed.services) setServices(parsed.services);
      if (parsed.experience) setExperience(parsed.experience);
      if (parsed.contactMessages) setContactMessages(parsed.contactMessages);
      if (parsed.adminConfig) setAdminConfig(parsed.adminConfig);

      return { success: true, message: 'Portfolio database restored successfully!' };
    } catch (err) {
      return { success: false, message: 'Failed to parse JSON file: ' + (err as Error).message };
    }
  };

  const resetToDefaults = () => {
    setPersonalInfoState(DEFAULT_PERSONAL_INFO);
    setBuildProjects(DEFAULT_BUILD_PROJECTS);
    setDesignItems(DEFAULT_DESIGN_ITEMS);
    setArLenses(DEFAULT_AR_LENSES);
    setSkillNodes(DEFAULT_SKILL_NODES);
    setServices(DEFAULT_SERVICES);
    setExperience(DEFAULT_EXPERIENCE);
    setContactMessages(DEFAULT_INITIAL_MESSAGES);
    setAdminConfig(DEFAULT_ADMIN_CONFIG);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        buildProjects,
        designItems,
        arLenses,
        skillNodes,
        services,
        experience,
        contactMessages,
        adminConfig,
        updatePersonalInfo,
        addProject,
        updateProject,
        deleteProject,
        setBuildProjects,
        addDesignItem,
        updateDesignItem,
        deleteDesignItem,
        setDesignItems,
        addARLens,
        updateARLens,
        deleteARLens,
        setArLenses,
        addSkillNode,
        updateSkillNode,
        deleteSkillNode,
        setSkillNodes,
        addService,
        updateService,
        deleteService,
        setServices,
        addExperience,
        updateExperience,
        deleteExperience,
        setExperience,
        addContactMessage,
        updateMessageStatus,
        deleteMessage,
        clearAllMessages,
        adminConfigState: adminConfig,
        updateAdminConfig,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        isAdminPortalOpen,
        setIsAdminPortalOpen,
        isAdminLoginModalOpen,
        setIsAdminLoginModalOpen,
        exportBackupJson,
        importBackupJson,
        resetToDefaults
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
