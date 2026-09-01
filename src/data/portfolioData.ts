import { Project, DesignItem, ARLens, SkillNode, ServiceItem, ExperienceItem } from '../types';

export const PERSONAL_INFO = {
  name: 'ABDUL QABID SIAKA',
  shortName: 'Abdul Qabid',
  titles: 'Computer Science & Engineering | Software Developer | Graphic Designer | AI & Prompt Engineer | AR Creator',
  positioning: 'Creative Technologist',
  brandStatement: 'I BUILD. I DESIGN. I CREATE EXPERIENCES.',
  tagline: 'Turning complex engineering into accessible, visual, and intelligent reality.',
  location: 'Takoradi, Ghana 🇬🇭',
  phone: '020 613 6004',
  whatsappNumber: '023 831 8021',
  portfolioUrl: 'https://aqsmyportfolio.vercel.app',
  email: 'siakaabdulqabid@gmail.com',
  github: 'https://github.com/alqabid',
  linkedin: 'https://www.linkedin.com/in/abdul-qabid-siaka',
  snapchat: 'https://creator.snapchat.com/creator/zVAqoADqQn9UCriV-MlElg',
  snapchatCreator: 'https://creator.snapchat.com/creator/zVAqoADqQn9UCriV-MlElg',
  snapchatAccount: 'https://www.snapchat.com/add/big_qabid?share_id=Y2N5s5T8SAGlHF13qzE7qA&locale=en_GH',
  snapchatHandle: 'big_qabid',
  whatsapp: 'https://wa.me/233238318021', // direct WhatsApp link: 023 831 8021
  availability: 'Available for Full-Stack, AI Engineering, Graphic Design & AR Roles',
  bio: `Dynamic and technically proficient Computer Science & Engineering student with a proven track record in full-stack software development, advanced graphic design, artificial intelligence, and prompt engineering. Combines rigorous engineering principles with creative design strategies to architect scalable web applications, deploy machine learning models, and produce high-impact digital branding.`,
  equation: {
    part1: 'ENGINEERING (React, Python, FastAPI, AWS)',
    part2: 'DESIGN & AI (Canva, Figma, Prompt Engineering)',
    part3: 'AR (Lens Studio & 3D Shaders)',
    result: 'CREATIVE TECHNOLOGIST'
  }
};

export const BUILD_PROJECTS: Project[] = [
  {
    id: 'medvision',
    title: 'MedVision',
    category: 'build',
    subtitle: 'AI-Powered Pneumonia Detection System',
    tagline: 'High-speed radiological diagnostic assistance using deep transfer learning.',
    description: 'MedVision is an AI-powered diagnostic web tool built with TensorFlow and Python that classifies pneumonia from pediatric chest X-ray imagery. Final Project work for the University of Mines and Technology (UMaT), Computer Science & Engineering Class of 2026.',
    problem: 'Radiologist shortages in developing medical centers often delay chest X-ray interpretations for acute respiratory infections, where rapid diagnosis can be life-saving.',
    solution: 'Engineered an end-to-end computer vision diagnostic pipeline utilizing MobileNetV2 transfer learning, bridging the model with a client-facing web app through an asynchronous FastAPI backend and applying advanced prompt engineering for AI-assisted optimization.',
    architecture: [
      'Frontend: React + TypeScript + Tailwind CSS with radiograph visualizer',
      'API Layer: Asynchronous FastAPI with Pydantic validation & image normalization',
      'Inference Engine: TensorFlow & Python with MobileNetV2 transfer learning',
      'Deployment: Vercel Global Edge Network'
    ],
    features: [
      'Sub-second image pre-processing and tensor normalization',
      'High-precision classification (Normal vs Viral vs Bacterial Pneumonia)',
      'Model performance optimized across accuracy, precision, recall, and F1-score benchmarks',
      'AI-assisted research, debugging, and clinical documentation workflow'
    ],
    technologies: ['Python', 'TensorFlow', 'MobileNetV2', 'OpenCV', 'FastAPI', 'React', 'TypeScript', 'Vercel'],
    metrics: [
      { label: 'Validation Accuracy', value: '94.2%' },
      { label: 'Avg Inference Time', value: '< 280ms' },
      { label: 'Model Architecture', value: 'MobileNetV2' }
    ],
    previewType: 'interactive',
    previewUrl: 'https://api.microlink.io?url=https%3A%2F%2Fmedvision1.vercel.app&screenshot=true&meta=false&embed=screenshot.url',
    accentColor: '#FFF35C',
    role: 'Machine Learning Engineer & Full-Stack Architect',
    liveUrl: 'https://medvision1.vercel.app/',
    githubUrl: 'https://github.com/alqabid/Medvision-web'
  },
  {
    id: 'ugogo',
    title: 'UGOGO / YUGOGOO',
    category: 'build',
    subtitle: 'Location-Based Social & Discovery Platform (In Production)',
    tagline: 'Seamlessly connecting users with local events, experiences, and hotspots.',
    description: 'UGOGO / YUGOGOO is an in-production location-based social platform designed to seamlessly connect users with local events and experiences, powered by React, TypeScript, FastAPI, and PostgreSQL.',
    problem: 'Navigating urban centers, finding nearby happenings, and securing verified event tickets is often fragmented across uncoordinated social feeds and manual payment channels.',
    solution: 'Spearheaded product direction and lifecycle management, architecting the responsive React/TypeScript/Tailwind CSS frontend and engineering the FastAPI + PostgreSQL backend to handle user data and geospatial querying efficiently.',
    architecture: [
      'Frontend: React + TypeScript + Tailwind CSS + Vite with geospatial indexing',
      'Backend: FastAPI & PostgreSQL for high-throughput user data & location queries',
      'Workflows: Generative AI & rapid prototyping workflows for accelerated UX planning',
      'Deployment: Vercel Cloud CDN with edge optimization'
    ],
    features: [
      'Interactive localized mapping and spot discovery',
      'Fast responsive search indexing for nearby venues and points of interest',
      'Dynamic event discovery and ticketing pass verification',
      'Mobile-first touch optimized navigation controls'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'PostgreSQL', 'GenAI Workflows', 'Vercel'],
    metrics: [
      { label: 'Status', value: 'In Production' },
      { label: 'Frontend Stack', value: 'React + TS' },
      { label: 'Backend Stack', value: 'FastAPI + SQL' }
    ],
    previewType: 'interactive',
    previewUrl: 'https://api.microlink.io?url=http%3A%2F%2Fugogo.vercel.app&screenshot=true&meta=false&embed=screenshot.url',
    accentColor: '#B9F5D0',
    role: 'Co-founder & Product Lead',
    liveUrl: 'http://ugogo.vercel.app/',
    githubUrl: 'https://github.com/alqabid/uGOGO2'
  },
  {
    id: 'yugogoo',
    title: 'Yugogoo Platform',
    category: 'build',
    subtitle: 'Location-Based Event Discovery & Social Ticketing',
    tagline: 'Discover what is happening nearby with real-time geospatial feeds.',
    description: 'Yugogoo is a vibrant live platform bridging event organizers and attendees through geo-clustered discovery, automated dynamic QR ticketing, and interactive attendee heatmaps.',
    problem: 'Community gatherings and cultural events often suffer from fragmented discovery across disparate WhatsApp groups and social feeds with cumbersome payment links.',
    solution: 'Engineered a unified location-first platform where users discover curated events on an interactive map, reserve tickets with mobile money integration, and connect with attendees before stepping through the door.',
    architecture: [
      'Frontend: React + TypeScript + Motion with mobile-optimized map interfaces',
      'Backend: FastAPI & PostgreSQL with geospatial indexing',
      'Deployment: Vercel Cloud CDN with edge optimization',
      'Ticketing: Cryptographically signed QR generation for fast offline-capable venue check-ins'
    ],
    features: [
      'Real-time proximity filtering (5km, 15km, 50km radius)',
      'Instant digital ticket wallet with offline QR scanning',
      'Organizer dashboard with ticket tier analytics and live attendee check-in counts',
      'Social RSVP circles and integrated calendar syncing'
    ],
    technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'QR Engine', 'Vercel'],
    metrics: [
      { label: 'Active Events Hosted', value: '120+' },
      { label: 'Ticket Scan Latency', value: '< 150ms' },
      { label: 'User Satisfaction', value: '98%' }
    ],
    previewType: 'interactive',
    previewUrl: 'https://api.microlink.io?url=http%3A%2F%2Fyugogoo-website.vercel.app&screenshot=true&meta=false&embed=screenshot.url',
    accentColor: '#A9DDFF',
    role: 'Co-founder & Product Lead',
    liveUrl: 'http://yugogoo-website.vercel.app/',
    githubUrl: 'https://github.com/alqabid/uGOGO2'
  },
  {
    id: 'grandiose-glam',
    title: 'Grandiose Glam',
    category: 'build',
    subtitle: 'Luxury Beauty & Glamour Digital E-Commerce Storefront',
    tagline: 'High-converting luxury cosmetics boutique with editorial aesthetics.',
    description: 'Grandiose Glam is a premium e-commerce and brand experience platform built for modern beauty aficionados, featuring curated product catalogs, high-conversion product showcases, and responsive checkout funnels.',
    problem: 'Boutique beauty brands often suffer from clunky template-based storefronts that fail to convey high-end brand prestige or convert social media traffic.',
    solution: 'Engineered a bespoke digital boutique featuring fluid micro-interactions, rich product galleries, mobile-first quick cart previews, and streamlined order flows.',
    architecture: [
      'Frontend: React + TypeScript + Modern CSS with luxury design tokens',
      'E-Commerce Flows: Optimized cart state management and checkout integration',
      'Performance: Responsive WebP asset loading with layout shift prevention',
      'Deployment: Vercel Global Edge Network'
    ],
    features: [
      'Editorial luxury product showcase with high-res zoom and detail breakdowns',
      'Frictionless slide-out shopping cart with real-time price tallying',
      'High-impact visual branding aligned with luxury cosmetics standards',
      'Seamless multi-device responsiveness across smartphones, tablets, and desktops'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Figma Tokens', 'Vercel', 'E-Commerce UX'],
    metrics: [
      { label: 'Mobile Conversion', value: '+32%' },
      { label: 'Cart Abandonment', value: '-18%' },
      { label: 'Asset Load Time', value: '< 1.1s' }
    ],
    previewType: 'image',
    previewUrl: 'https://api.microlink.io?url=https%3A%2F%2Fgrandioseglam.vercel.app&screenshot=true&meta=false&embed=screenshot.url',
    accentColor: '#FFB7D5',
    role: 'Lead UI/UX & Web Developer',
    liveUrl: 'https://grandioseglam.vercel.app/',
    githubUrl: 'https://github.com/alqabid'
  },
  {
    id: 'student-records',
    title: 'Student Record Management',
    category: 'build',
    subtitle: 'Java Desktop Application (OOP Architecture)',
    tagline: 'Strict Object-Oriented application for student lifecycle management.',
    description: 'Applied strict Object-Oriented Programming (OOP) principles to construct a robust Java desktop application ensuring secure storage, retrieval, and lifecycle management of student academic data.',
    problem: 'Academic institutions require reliable, strictly typed desktop software to securely record, validate, and query student performance and personal records without corruption.',
    solution: 'Constructed an OOP-governed Java application implementing encapsulation, inheritance, polymorphism, and input validation routines for consistent data manipulation.',
    architecture: [
      'Language: Java (SE)',
      'Paradigm: Object-Oriented Programming (OOP)',
      'Data Layer: Structured file persistence & validation routines',
      'Tooling: NetBeans / VS Code / JVM'
    ],
    features: [
      'Encapsulated student entities with strict validation',
      'Dynamic record searching, updating, and transcript calculation',
      'Exception handling to protect against malformed data',
      'Modular class hierarchies for faculty and student role segregation'
    ],
    technologies: ['Java', 'OOP', 'NetBeans', 'Data Structures', 'File I/O'],
    metrics: [
      { label: 'Paradigm', value: 'Strict OOP' },
      { label: 'Language', value: 'Java SE' },
      { label: 'Platform', value: 'Desktop App' }
    ],
    previewType: 'image',
    previewUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    accentColor: '#FFF35C',
    role: 'Software Developer',
    githubUrl: 'https://github.com/alqabid'
  },
  {
    id: 'music-player-app',
    title: 'Music Player Application',
    category: 'build',
    subtitle: 'C# | Data Structures & Algorithms Playback System',
    tagline: 'Queue Abstract Data Type with Linear Search & Bubble Sort algorithms.',
    description: 'Engineered a C# playback system utilizing the Queue Abstract Data Type (ADT), integrating Linear Search and Bubble Sort algorithms for efficient media processing and playlist querying.',
    problem: 'Media playback applications require deterministic playlist sequencing, efficient track sorting, and reliable searching mechanisms across large track libraries.',
    solution: 'Implemented custom Queue data structures in C# alongside algorithmic search and sorting modules to ensure FIFO track sequencing and fast library sorting by title, artist, or duration.',
    architecture: [
      'Language: C# (.NET)',
      'Data Structures: Queue Abstract Data Type (ADT), Linked Lists',
      'Algorithms: Linear Search & Bubble Sort',
      'Tooling: Visual Studio / VS Code'
    ],
    features: [
      'FIFO Track sequencing using custom Queue implementation',
      'Bubble Sort algorithm for multi-attribute playlist sorting',
      'Linear search engine for rapid track query retrieval',
      'Interactive playback controls (Play, Pause, Enqueue, Skip)'
    ],
    technologies: ['C#', '.NET', 'Data Structures', 'Algorithms', 'Queue ADT'],
    metrics: [
      { label: 'Core ADT', value: 'Queue (FIFO)' },
      { label: 'Algorithms', value: 'Search & Sort' },
      { label: 'Language', value: 'C# / .NET' }
    ],
    previewType: 'image',
    previewUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    accentColor: '#C9B8FF',
    role: 'Software Developer',
    githubUrl: 'https://github.com/alqabid'
  }
];

export const DESIGN_ITEMS: DesignItem[] = [
  {
    id: 'thumb-ai-breakthrough',
    title: 'The AI Shift Nobody Saw Coming',
    category: 'thumbnails',
    clientOrProject: 'Tech YouTube Creator Channel',
    role: 'Visual Content Designer',
    tools: ['Canva Advanced', 'Photoshop'],
    process: ['Visual Storyboarding', 'High-contrast Face Isolation', 'Dramatic Rim Lighting', 'Bold Negative Space Typography'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '16/9',
    accentColor: '#FFF35C',
    metrics: '14.8% Click-Through Rate',
    tags: ['YouTube Thumbnail', 'High CTR', 'Tech Media', 'Canva Pro']
  },
  {
    id: 'thumb-dev-roadmap',
    title: '2026 Developer Roadmap: Zero to Senior',
    category: 'thumbnails',
    clientOrProject: 'Code Mastery Stream',
    role: 'Lead Visual Designer',
    tools: ['Canva Advanced', 'Figma'],
    process: ['Geometric Grid Setup', '3D Badge Integration', 'Complementary Color Balancing', 'Visual Hierarchy Hierarchy'],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '16/9',
    accentColor: '#C9B8FF',
    metrics: '250K+ Impressions',
    tags: ['Thumbnail', 'Education', 'Code Architecture']
  },
  {
    id: 'brand-tech-fest',
    title: 'Accra Future Tech Summit 2026',
    category: 'branding',
    clientOrProject: 'Pan-African Developer Forum',
    role: 'Brand & Graphic Designer',
    tools: ['Canva Advanced', 'Photoshop', 'Figma'],
    process: ['Logo Identity System', 'Social Grid Templates', 'Stage Banner Vectors', 'Color Guideline Manual'],
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '4/3',
    accentColor: '#FFB7D5',
    metrics: 'Complete Brand Suite',
    tags: ['Brand Identity', 'Event System', 'Typography']
  },
  {
    id: 'poster-cyber-beats',
    title: 'Afro-Futurism Sound & Vision',
    category: 'posters',
    clientOrProject: 'Digital Art Showcase',
    role: 'Graphic Designer & Visual Artist',
    tools: ['Photoshop', 'Canva Advanced'],
    process: ['Layer Blending Modes', 'Halftone Texturing', 'Custom Display Typography', 'Vibrant Contrast Ratios'],
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '3/4',
    accentColor: '#A9DDFF',
    tags: ['Poster Art', 'Print & Digital', 'Afro-Futurism']
  },
  {
    id: 'social-product-drop',
    title: 'Drop 04: Minimalist Audio Wear',
    category: 'social',
    clientOrProject: 'Lifestyle Tech Brand',
    role: 'Social Media Content Creator',
    tools: ['Canva Advanced', 'Figma'],
    process: ['Product Silhouette Clipping', 'Motion Story Storyboards', 'Carousel Carousel Pacing', 'Engagement Hooks'],
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '1/1',
    accentColor: '#B9F5D0',
    metrics: '3.4x Engagement Surge',
    tags: ['Instagram Carousel', 'Social Ads', 'E-commerce']
  },
  {
    id: 'flyer-developer-hackathon',
    title: 'Hack The Future: 48H Buildathon',
    category: 'flyers',
    clientOrProject: 'Campus Tech Alliance',
    role: 'Visual Designer',
    tools: ['Canva Advanced', 'Photoshop'],
    process: ['Information Hierarchy', 'Sponsor Badge Placement', 'Schedule Timeline Graphic', 'High DPI Output'],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '4/5',
    accentColor: '#FFF35C',
    tags: ['Flyer Design', 'Hackathon', 'Community']
  },
  {
    id: 'ui-crypto-lens',
    title: 'PulseFi: Mobile Asset Management',
    category: 'ui',
    clientOrProject: 'Fintech Concept Exploration',
    role: 'UI/UX & Visual Designer',
    tools: ['Figma', 'Canva Advanced'],
    process: ['Component Architecture', 'Dark UI Contrast Auditing', 'Tactile Micro-interactions', 'Design Tokens'],
    imageUrl: 'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '16/10',
    accentColor: '#C9B8FF',
    tags: ['UI/UX', 'Mobile App', 'Fintech']
  },
  {
    id: 'marketing-creator-kit',
    title: 'Creator Kit 2026: The Ultimate Visual Pack',
    category: 'marketing',
    clientOrProject: 'Digital Asset Studio',
    role: 'Product Visual Creator',
    tools: ['Canva Advanced', 'Photoshop'],
    process: ['3D Mockup Rendering', 'Value Proposition Callouts', 'Conversion Banner Funnels'],
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '16/9',
    accentColor: '#FFB7D5',
    tags: ['Marketing Suite', 'Conversion Design', 'Ad Creative']
  }
];

export const AR_LENSES: ARLens[] = [
  {
    id: 'lens-prince-4-src',
    name: 'PRINCE 4 SRC',
    type: 'Brand Experience',
    builtWith: 'Lens Studio',
    uuid: '2045837fbd664d02a436160ffec77fb7',
    description: 'Custom campus election campaign interactive lens with face-tracking badge overlays and dynamic particle effects.',
    features: ['Campus Campaign Branding', 'Head & Face Anchor Tracking', 'Dynamic Color Flare Emitter', 'Interactive Tap Mode'],
    stats: {
      views: '45.8K+',
      shares: '6.4K+',
      plays: '18.2K+'
    },
    accentColor: '#FFF35C',
    interactiveType: 'cyberpunk',
    previewGifOrImg: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    lensUrl: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=2045837fbd664d02a436160ffec77fb7&metadata=01'
  },
  {
    id: 'lens-medad-4-umat',
    name: 'MEDAD 4 UMAT SRC',
    type: 'Brand Experience',
    builtWith: 'Lens Studio',
    uuid: '78e7a717e2064e0ebea77f007a8b8431',
    description: 'University campus leadership campaign lens with golden hour LUT color grading and celebratory lighting.',
    features: ['UMaT Leadership Graphics', 'Portrait Segmentation', 'Subtle Skin Smoothing & LUT', 'Tap Animation Trigger'],
    stats: {
      views: '52.1K+',
      shares: '8.3K+',
      plays: '21.5K+'
    },
    accentColor: '#C9B8FF',
    interactiveType: 'aura',
    previewGifOrImg: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    lensUrl: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=78e7a717e2064e0ebea77f007a8b8431&metadata=01'
  },
  {
    id: 'lens-christian-nugs',
    name: 'CHRISTIAN FOR NUGS',
    type: 'Brand Experience',
    builtWith: 'Lens Studio',
    uuid: 'db5abd7c2e904146a347d83f5e79aeae',
    description: 'National union student leadership campaign interactive filter with animated 3D emblems and banner tracking.',
    features: ['NUGS Student Federation Branding', 'Audio-reactive Pulse', 'Custom Typographic Header', '3D Badge Rotation'],
    stats: {
      views: '38.6K+',
      shares: '5.7K+',
      plays: '16.9K+'
    },
    accentColor: '#FFB7D5',
    interactiveType: 'sunglasses',
    previewGifOrImg: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    lensUrl: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=db5abd7c2e904146a347d83f5e79aeae&metadata=01'
  },
  {
    id: 'lens-kanita-tein',
    name: 'KANITA 4 TEIN PREZ',
    type: 'Brand Experience',
    builtWith: 'Lens Studio',
    uuid: '7f20fcf0b65d450c90ffcf37971dcf32',
    description: 'Dynamic TEIN presidential campaign AR lens featuring interactive banner overlays and celebration particles.',
    features: ['Presidential Campaign Frame', 'Soft Lighting Shader', 'Real-time Landmark Sync', 'Gesture-Activated Sparkles'],
    stats: {
      views: '64.2K+',
      shares: '9.8K+',
      plays: '27.4K+'
    },
    accentColor: '#B9F5D0',
    interactiveType: 'particles',
    previewGifOrImg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    lensUrl: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=7f20fcf0b65d450c90ffcf37971dcf32&metadata=01'
  },
  {
    id: 'lens-ubuntu-src',
    name: 'UBUNTU SRC \'26',
    type: 'Brand Experience',
    builtWith: 'Lens Studio',
    uuid: 'a72a7449c1df4471b1a930cf4b20ccb5',
    description: 'Empowerment and unity theme university student council interactive lens with African geometric accents.',
    features: ['Ubuntu Identity Layout', '3D Asset Rendering', 'Face Tracking Reticles', 'Tap Sound Triggers'],
    stats: {
      views: '29.4K+',
      shares: '4.2K+',
      plays: '11.8K+'
    },
    accentColor: '#FFF35C',
    interactiveType: 'cyberpunk',
    previewGifOrImg: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    lensUrl: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=a72a7449c1df4471b1a930cf4b20ccb5&metadata=01'
  },
  {
    id: 'lens-kenneth-lnugs',
    name: 'KENNETH 4 LNUGS',
    type: 'Brand Experience',
    builtWith: 'Lens Studio',
    uuid: '3189663e609c4597a7bfba13886c22ef',
    description: 'Local student governance campaign lens with bold typography badges and portrait lighting enhancement.',
    features: ['LNUGS Official Badge', 'Facial Smoothing & Warm LUT', 'Mobile Optimized FPS', 'Tap to Toggle Taglines'],
    stats: {
      views: '33.1K+',
      shares: '4.9K+',
      plays: '13.2K+'
    },
    accentColor: '#C9B8FF',
    interactiveType: 'aura',
    previewGifOrImg: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    lensUrl: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=3189663e609c4597a7bfba13886c22ef&metadata=01'
  },
  {
    id: 'lens-kelvin-src',
    name: 'KELVIN 4 SRC PREZ',
    type: 'Brand Experience',
    builtWith: 'Lens Studio',
    uuid: '4e34baff42974e21ad5a79d5ef5ac533',
    description: 'High-energy SRC presidential campaign lens with animated election banners and confetti bursts.',
    features: ['Dynamic Presidential Ribbons', 'Confetti Particle Burst', 'Face Tracking Alignment', 'Vibrant Color Grading'],
    stats: {
      views: '47.5K+',
      shares: '7.1K+',
      plays: '19.8K+'
    },
    accentColor: '#FFB7D5',
    interactiveType: 'particles',
    previewGifOrImg: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    lensUrl: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=4e34baff42974e21ad5a79d5ef5ac533&metadata=01'
  },
  {
    id: 'lens-hangout-rave',
    name: 'HANGOUT RAVE',
    type: 'Interactive Experience',
    builtWith: 'Lens Studio',
    description: 'Nightlife and concert party filter with audio-reactive neon strobes, chromatic displacement, and club lighting.',
    features: ['Audio Spectrum Visualizer', 'Chromatic RGB Split', 'Strobe & Neon Shaders', 'Bass-Reactive Glow'],
    stats: {
      views: '58.9K+',
      shares: '9.4K+',
      plays: '26.3K+'
    },
    accentColor: '#B9F5D0',
    interactiveType: 'cyberpunk',
    previewGifOrImg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    lensUrl: 'https://creator.snapchat.com/creator/zVAqoADqQn9UCriV-MlElg'
  },
  {
    id: 'lens-atta-spetssa',
    name: 'ATTA 4 SPetSSA',
    type: 'Brand Experience',
    builtWith: 'Lens Studio',
    description: 'Departmental student association election filter with petroleum engineering themed technical overlays.',
    features: ['Petroleum Engineering Graphics', 'Custom Lens Shaders', 'Head Gyro Tracking', 'Campaign Slogan Overlays'],
    stats: {
      views: '26.7K+',
      shares: '3.8K+',
      plays: '10.5K+'
    },
    accentColor: '#FFF35C',
    interactiveType: 'aura',
    previewGifOrImg: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    lensUrl: 'https://creator.snapchat.com/creator/zVAqoADqQn9UCriV-MlElg'
  },
  {
    id: 'lens-genz-affair',
    name: 'GENZ AFFAIR',
    type: 'Face Effect',
    builtWith: 'Lens Studio',
    description: 'Youth festival & social event aesthetic filter with Y2K chromatic aura, holographic sparkles, and soft skin tone grading.',
    features: ['Y2K Grain & Chromatic Bloom', 'Floating Micro-glitter Emitter', 'Portrait Depth Lighting', 'Tap to switch 4 vibes'],
    stats: {
      views: '71.4K+',
      shares: '12.6K+',
      plays: '31.2K+'
    },
    accentColor: '#FFB7D5',
    interactiveType: 'aura',
    previewGifOrImg: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    lensUrl: 'https://creator.snapchat.com/creator/zVAqoADqQn9UCriV-MlElg'
  },
  {
    id: 'lens-hajia-evandy',
    name: 'HAJIA 4 EVANDY',
    type: 'Brand Experience',
    builtWith: 'Lens Studio',
    description: 'Hall of residence executive campaign filter with elegant gold trim, custom typography, and ambient warm flare.',
    features: ['Hall Council Branding', 'Gold Foil Texture Shaders', 'Face Alignment Landmarks', 'Tap to Reveal Manifestos'],
    stats: {
      views: '39.8K+',
      shares: '6.1K+',
      plays: '15.7K+'
    },
    accentColor: '#C9B8FF',
    interactiveType: 'particles',
    previewGifOrImg: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    lensUrl: 'https://creator.snapchat.com/creator/zVAqoADqQn9UCriV-MlElg'
  },
  {
    id: 'lens-edem-x',
    name: 'EDEM X',
    type: 'Interactive Experience',
    builtWith: 'Lens Studio',
    description: 'Exclusive personality & brand campaign experience with cybernetic edge-detection outlines and custom music sync.',
    features: ['Edge Detection Shader', 'Signature Logo Mesh', 'Interactive Beat Pulsing', 'Custom 3D Typography'],
    stats: {
      views: '44.2K+',
      shares: '7.3K+',
      plays: '17.6K+'
    },
    accentColor: '#B9F5D0',
    interactiveType: 'cyberpunk',
    previewGifOrImg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    lensUrl: 'https://creator.snapchat.com/creator/zVAqoADqQn9UCriV-MlElg'
  },
  {
    id: 'lens-adges-swingi',
    name: 'ADGES SWINGI MAME',
    type: 'Interactive Experience',
    builtWith: 'Lens Studio',
    description: 'Cultural dance & music celebration filter with dynamic rhythm particles and festive color bursts.',
    features: ['Cultural Asset Elements', 'Head Movement Tracking', 'Rhythmic Particle Emitters', 'Vibrant Festive Grade'],
    stats: {
      views: '36.5K+',
      shares: '5.4K+',
      plays: '14.1K+'
    },
    accentColor: '#FFF35C',
    interactiveType: 'particles',
    previewGifOrImg: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    lensUrl: 'https://creator.snapchat.com/creator/zVAqoADqQn9UCriV-MlElg'
  },
  {
    id: 'lens-glowfest',
    name: 'GLOWFEST',
    type: 'Segmented Filter',
    builtWith: 'Lens Studio',
    description: 'Festival glow filter featuring UV blacklight simulation, neon face paint shaders, and floating bioluminescent embers.',
    features: ['UV Blacklight Shader Effect', 'Neon Face Paint Mapping', 'Bioluminescent Particle Swarm', 'Audio-reactive Glow Intensity'],
    stats: {
      views: '88.3K+',
      shares: '15.9K+',
      plays: '39.4K+'
    },
    accentColor: '#FFB7D5',
    interactiveType: 'cyberpunk',
    previewGifOrImg: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    lensUrl: 'https://creator.snapchat.com/creator/zVAqoADqQn9UCriV-MlElg'
  },
  {
    id: 'lens-motion-boys',
    name: 'MOTION BOYS',
    type: 'Face Effect',
    builtWith: 'Lens Studio',
    description: 'Urban streetwear & music crew lens with metallic holographic eyewear, speed trail particle lines, and bass bounce.',
    features: ['3D Metallic Sunglasses', 'Speed Streak Particle Trails', 'Screen Shake on Bass Drop', 'Custom Brand Emblem Stamp'],
    stats: {
      views: '61.7K+',
      shares: '10.2K+',
      plays: '24.8K+'
    },
    accentColor: '#C9B8FF',
    interactiveType: 'sunglasses',
    previewGifOrImg: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    lensUrl: 'https://creator.snapchat.com/creator/zVAqoADqQn9UCriV-MlElg'
  },
  {
    id: 'lens-zaamadisco-25',
    name: 'ZAAMADISCO 25',
    type: 'Interactive Experience',
    builtWith: 'Lens Studio',
    description: 'Concert tour & music festival interactive filter with disco mirror ball reflections and multi-colored laser beams.',
    features: ['3D Mirror Ball Reflection Mesh', 'Laser Beam Volumetric Lighting', 'Head Gyro Tracking', 'Tap to switch Color Schemes'],
    stats: {
      views: '93.5K+',
      shares: '16.7K+',
      plays: '42.0K+'
    },
    accentColor: '#B9F5D0',
    interactiveType: 'particles',
    previewGifOrImg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    lensUrl: 'https://creator.snapchat.com/creator/zVAqoADqQn9UCriV-MlElg'
  },
  {
    id: 'lens-revival-2025',
    name: 'REVIVAL 2025',
    type: 'Brand Experience',
    builtWith: 'Lens Studio',
    description: 'Annual flagship summit & conference experience with glowing light aura, conference typography, and inspirational particle float.',
    features: ['Event Visual Identity System', 'Warm Golden Light Leak Flare', 'Typographic 3D Banner', 'Tap to Display Event Themes'],
    stats: {
      views: '55.4K+',
      shares: '8.9K+',
      plays: '23.6K+'
    },
    accentColor: '#FFF35C',
    interactiveType: 'aura',
    previewGifOrImg: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    lensUrl: 'https://creator.snapchat.com/creator/zVAqoADqQn9UCriV-MlElg'
  }
];

export const SKILL_NODES: SkillNode[] = [
  { id: 'python', name: 'Python', category: 'code', level: 95, description: 'FastAPI, asynchronous backend architectures, ML data pipelines, OpenCV, automation scripts.', connectedProjects: ['medvision', 'ugogo'] },
  { id: 'typescript_js', name: 'TypeScript & JavaScript', category: 'code', level: 93, description: 'Strict typing, modern ESNext, React/Vite web apps, REST APIs, asynchronous client architectures.', connectedProjects: ['medvision', 'ugogo', 'yugogoo', 'grandiose-glam'] },
  { id: 'react_vite', name: 'React & Vite', category: 'code', level: 94, description: 'Component lifecycles, custom hooks, Motion animations, Tailwind CSS, high-performance SPAs.', connectedProjects: ['medvision', 'ugogo', 'yugogoo', 'grandiose-glam'] },
  { id: 'fastapi', name: 'FastAPI', category: 'code', level: 92, description: 'High-throughput asynchronous microservices, Pydantic data schemas, RESTful API architecture.', connectedProjects: ['medvision', 'ugogo'] },
  { id: 'genai_prompt', name: 'GenAI & Prompt Engineering', category: 'ai', level: 96, description: 'ChatGPT, Claude, Google Gemini, GitHub Copilot, Lovable, system prompt structuring, rapid prototyping.', connectedProjects: ['medvision', 'ugogo'] },
  { id: 'tensorflow_ml', name: 'TensorFlow & ML', category: 'ai', level: 88, description: 'MobileNetV2, CNN architectures, transfer learning, image classification, OpenCV, evaluation benchmarks.', connectedProjects: ['medvision'] },
  { id: 'canva_advanced', name: 'Canva (Advanced)', category: 'design', level: 99, description: 'Elite visual communication, high-CTR YouTube thumbnails, digital branding, corporate decks, marketing campaigns.', connectedProjects: ['thumb-ai-breakthrough', 'thumb-dev-roadmap', 'brand-tech-fest', 'social-product-drop'] },
  { id: 'photoshop_figma', name: 'Photoshop & Figma', category: 'design', level: 90, description: 'UI/UX wireframing, design tokens, photo manipulation, raster compositing, color theory.', connectedProjects: ['ui-crypto-lens', 'brand-tech-fest', 'poster-cyber-beats'] },
  { id: 'lensstudio_ar', name: 'Snapchat Lens Studio', category: 'ar', level: 94, description: '3D face & world tracking, segmentation shaders, visual scripting, spatial AR filters, particle VFX.', connectedProjects: ['lens-cyber-hud', 'lens-aura-bloom', 'lens-retro-shades', 'lens-ghana-portal'] },
  { id: 'databases_sql', name: 'PostgreSQL, MySQL & SQL', category: 'code', level: 86, description: 'Relational database schemas, ACID transactions, data querying, indexing, ORMs.', connectedProjects: ['ugogo', 'medvision'] },
  { id: 'aws_cloud', name: 'AWS Cloud & Infrastructure', category: 'code', level: 82, description: 'EC2, S3, RDS, CloudFront, XAMPP, deployment pipelines, virtualized environments.', connectedProjects: ['ugogo', 'medvision'] },
  { id: 'desktop_languages', name: 'Java, C++, C# & PHP', category: 'code', level: 86, description: 'Strict OOP principles, Data Structures & Algorithms, Queue ADTs, Search & Sort algorithms.', connectedProjects: ['student-records', 'music-player-app'] },
  { id: 'tooling_dev', name: 'Git, GitHub, VS Code & WSL', category: 'code', level: 92, description: 'Version control, collaborative workflows, Linux/WSL environments, NetBeans, VirtualBox.', connectedProjects: ['medvision', 'ugogo', 'yugogoo'] }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-build',
    title: 'BUILD',
    tagline: 'Web Apps, APIs & Scalable Software',
    description: 'Transforming technical requirements into lightning-fast, production-ready web platforms and intelligent APIs.',
    deliverables: ['Custom React & TypeScript web applications', 'FastAPI backend microservices & REST APIs', 'PostgreSQL / MySQL relational database design', 'AWS cloud deployment & infrastructure setup'],
    accentColor: '#FFF35C',
    iconName: 'Code2'
  },
  {
    id: 'srv-design',
    title: 'DESIGN',
    tagline: 'Thumbnails, Branding & High-Impact Visuals',
    description: 'Crafting visuals that stop the scroll and establish undeniable authority across digital channels.',
    deliverables: ['High-CTR YouTube thumbnail design', 'Complete brand identity & marketing assets', 'Advanced Canva & Adobe Photoshop compositions', 'UI/UX component systems & wireframes in Figma'],
    accentColor: '#FFB7D5',
    iconName: 'Palette'
  },
  {
    id: 'srv-ai',
    title: 'AI & PROMPT ENGINEERING',
    tagline: 'Generative AI & Machine Learning Systems',
    description: 'Deploying deep learning computer vision models and architecting AI-assisted rapid prototyping workflows.',
    deliverables: ['Computer vision model training & MobileNetV2 transfer learning', 'Advanced LLM prompt engineering & automated workflows', 'Inference APIs with sub-second response times', 'AI diagnostic & clinical support interfaces'],
    accentColor: '#B9F5D0',
    iconName: 'Brain'
  },
  {
    id: 'srv-ar',
    title: 'AR CREATION',
    tagline: 'Snapchat Lenses & Interactive Spatial Filters',
    description: 'Crafting immersive augmented reality experiences for creators, brands, and cultural events.',
    deliverables: ['Snapchat Lens Studio development', 'Custom face effects, segmentation & 3D tracking shaders', 'Event & festival branded spatial filters', 'Snapcode deployment & analytics optimization'],
    accentColor: '#C9B8FF',
    iconName: 'Sparkles'
  }
];

export const RECRUITER_DATA = {
  name: 'ABDUL QABID SIAKA',
  title: 'Computer Science & Engineering | Software Developer | Graphic Designer | AI & Prompt Engineer | AR Creator',
  location: 'Takoradi, Ghana',
  phone: '020 613 6004',
  whatsappNumber: '023 831 8021',
  portfolioUrl: 'https://aqsmyportfolio.vercel.app',
  email: 'siakaabdulqabid@gmail.com',
  linkedin: 'https://www.linkedin.com/in/abdul-qabid-siaka',
  github: 'https://github.com/alqabid',
  summary: 'Dynamic and technically proficient Computer Science & Engineering student with a proven track record in full-stack software development, advanced graphic design, artificial intelligence, and prompt engineering. Combines rigorous engineering principles with creative design strategies to architect scalable web applications, deploy machine learning models, and produce high-impact digital branding. Demonstrated ability to lead product development lifecycles from ideation to deployment, utilizing modern tech stacks (React, Python, FastAPI, AWS) and generative AI to drive innovation and solve complex real-world challenges. Highly skilled in translating complex technical concepts into accessible, functional, and visually striking user experiences through expert-level command of UI/UX and graphic design tools including Canva, Figma, and Adobe Photoshop.',
  skills: {
    programming: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#', 'PHP', 'SQL', 'PostgreSQL', 'MySQL'],
    genai: ['ChatGPT', 'Claude', 'Google Gemini', 'GitHub Copilot', 'Lovable', 'AI-Assisted Rapid Prototyping'],
    frontend: ['HTML5', 'CSS3', 'React', 'Vite', 'Tailwind CSS', 'Bootstrap', 'jQuery'],
    design_uiux: ['Advanced Canva Design', 'Figma', 'Adobe Photoshop', 'Digital Branding', 'Web Design'],
    backend_cloud: ['FastAPI', 'RESTful APIs', 'AWS (EC2, S3, RDS, CloudFront)', 'XAMPP'],
    ar_creative: ['Snapchat Lens Studio', 'AR Lens Creation', 'Cinema 4D (3D Typography)'],
    ai_ml: ['TensorFlow', 'OpenCV', 'Transfer Learning (MobileNetV2)', 'Image Classification'],
    tooling: ['Git', 'GitHub', 'VS Code', 'NetBeans', 'VirtualBox', 'WSL']
  },
  softwareProjects: [
    {
      title: 'UGOGO / YUGOGOO',
      role: 'Co-founder & Product Lead',
      subtitle: 'Location-Based Social Platform (In Production)',
      liveUrl: 'https://ugogo.vercel.app',
      githubUrl: 'https://github.com/alqabid/uGOGO2',
      highlights: [
        'Spearheaded product direction and lifecycle management for a digital platform designed to seamlessly connect users with local events and experiences.',
        'Architected and developed the front-end interface, deploying React, TypeScript, and Tailwind CSS to ensure a responsive, highly optimized user experience.',
        'Engineered backend infrastructure utilizing FastAPI and PostgreSQL to handle user data and location-based querying efficiently.',
        'Leveraged Generative AI and rapid prototyping workflows to accelerate feature planning, UI/UX design, and code generation.'
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'PostgreSQL', 'GenAI Workflows']
    },
    {
      title: 'MEDVISION',
      role: 'Machine Learning Engineer',
      subtitle: 'AI-Powered Pneumonia Detection System (Final Project — UMaT Class of 2026)',
      liveUrl: 'https://medvision1.vercel.app/',
      githubUrl: 'https://github.com/alqabid/Medvision-web',
      highlights: [
        'Engineered a highly secure, web-based AI diagnostic tool utilizing TensorFlow and Python to classify pneumonia from chest X-ray imagery.',
        'Implemented MobileNetV2 transfer learning, optimizing the model to achieve rigorous accuracy, precision, recall, and F1-score benchmarks.',
        'Designed a scalable backend architecture via FastAPI to bridge the machine learning model with the client-facing web application.',
        'Employed advanced prompt engineering strategies for AI-assisted research, debugging, and documentation generation throughout the software lifecycle.'
      ],
      technologies: ['Python', 'TensorFlow', 'MobileNetV2', 'OpenCV', 'FastAPI', 'React', 'TypeScript']
    },
    {
      title: 'STUDENT RECORD MANAGEMENT',
      role: 'Software Developer',
      subtitle: 'Java Desktop Application (OOP Architecture)',
      highlights: [
        'Applied strict object-oriented programming (OOP) principles to construct a robust Java application ensuring secure storage, retrieval, and lifecycle management of student data.'
      ],
      technologies: ['Java', 'OOP', 'Data Structures', 'File I/O', 'NetBeans']
    },
    {
      title: 'MUSIC PLAYER APPLICATION',
      role: 'Software Developer',
      subtitle: 'C# | Data Structures & Algorithms',
      highlights: [
        'Engineered a C# playback system utilizing the Queue Abstract Data Type, integrating Linear Search and Bubble Sort algorithms for efficient media processing and querying.'
      ],
      technologies: ['C#', '.NET', 'Data Structures', 'Queue ADT', 'Linear Search', 'Bubble Sort']
    }
  ],
  creativeAiExperience: [
    {
      area: 'Prompt Engineering & AI-Assisted Workflows',
      highlights: [
        'Mastery in structuring complex prompts to command Large Language Models (LLMs) for high-fidelity code generation, system architecture design, and rapid prototyping.',
        'Optimize development cycles by integrating AI platforms to automate refactoring, technical documentation, and rigorous debugging.'
      ]
    },
    {
      area: 'Graphic Design, Digital Branding & UI/UX',
      highlights: [
        'Advanced Canva & Graphic Design: Execute elite-level visual communication strategies, producing striking promotional campaigns, corporate branding assets, and marketing materials. Apply deep understanding of typography, color theory, and visual hierarchy.',
        'Web Design: Bridge the gap between engineering and design, architecting intuitive, accessible, and responsive user interfaces utilizing Figma and modern CSS frameworks.',
        'AR Content Creation: Develop engaging, interactive augmented-reality experiences and custom spatial filters utilizing Snapchat Lens Studio.'
      ]
    }
  ],
  entrepreneurialAndCorporate: [
    {
      period: '2022 — Present',
      role: 'Technology Entrepreneur & Digital Marketing Strategist (Founder & CEO)',
      company: 'DREAM CHASERS LAPTOPS (DC LAPTOPS)',
      location: 'Takoradi, Ghana',
      highlights: [
        'Provide expert technical consultation, analyzing client performance requirements to recommend optimal computer hardware specifications.',
        'Execute end-to-end digital marketing strategies, leveraging graphic design expertise to create compelling promotional assets that drive customer acquisition and retention.'
      ]
    },
    {
      period: 'Corporate Internship',
      role: 'Intern',
      company: 'TOYOTA GHANA',
      location: 'Ghana',
      highlights: [
        'Integrated into a structured corporate environment, executing technical deliverables while mastering cross-functional communication and professional problem-solving protocols.'
      ]
    }
  ],
  leadership: [
    {
      period: '1st SRC Administration (2024 — 2025)',
      role: 'Public Relations Officer & Editorial Board Chairman',
      institution: 'UNIVERSITY OF MINES AND TECHNOLOGY — SRID',
      location: 'School of Railways and Infrastructure Development',
      highlights: [
        'Directed comprehensive public relations strategies, commanding all digital communications and promotional materials to maximize student engagement.',
        'Led editorial oversight, managing a team to publish high-quality, student-focused content and aligning institutional messaging with the student body.'
      ]
    }
  ],
  education: [
    {
      degree: 'Bachelor of Science (BSc.) in Computer Science & Engineering',
      institution: 'UNIVERSITY OF MINES AND TECHNOLOGY (UMaT) — GHANA',
      school: 'School of Railways and Infrastructure Development (SRID)',
      location: 'Takoradi / Essikado, Ghana',
      period: 'Expected Graduation: 2026',
      coursework: [
        'Software Engineering',
        'Data Structures & Algorithms',
        'Database Systems',
        'Computer Networks',
        'Compiler Design',
        'Control Systems',
        'Operations Research',
        'Web Programming',
        'Logic of Computer',
        'Operating Systems',
        'Machine Learning',
        'Basic Electronics',
        'Applied Electricity',
        'Engineering Drawing',
        'Communication Skills'
      ],
      highlights: [
        'Final Year Capstone Project: MedVision AI Clinical Diagnostic Support System using MobileNetV2',
        'Active leadership serving as PRO and Editorial Board Chairman for SRID SRC'
      ]
    }
  ],
  expertiseOverview: [
    'Full-Stack Development',
    'Graphic Design',
    'Prompt Engineering',
    'Generative AI',
    'Machine Learning',
    'UI/UX Architecture',
    'AR Lens Creation',
    'Product Lifecycle',
    'Digital Branding',
    'Executive Leadership'
  ]
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: '2024 — Present',
    role: 'Co-founder & Product Lead',
    company: 'UGOGO / YUGOGOO',
    location: 'Takoradi, Ghana',
    category: 'software',
    highlights: [
      'Spearheaded product direction and lifecycle management for a digital platform designed to seamlessly connect users with local events and experiences.',
      'Architected and developed the front-end interface, deploying React, TypeScript, and Tailwind CSS to ensure a responsive, highly optimized user experience.',
      'Engineered backend infrastructure utilizing FastAPI and PostgreSQL to handle user data and location-based querying efficiently.',
      'Leveraged Generative AI and rapid prototyping workflows to accelerate feature planning, UI/UX design, and code generation.'
    ],
    technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'GenAI Workflows', 'Vercel']
  },
  {
    period: '2024 — 2026',
    role: 'Machine Learning Engineer',
    company: 'MEDVISION (UMaT Final Project)',
    location: 'University of Mines and Technology',
    category: 'software',
    highlights: [
      'Engineered a highly secure, web-based AI diagnostic tool utilizing TensorFlow and Python to classify pneumonia from chest X-ray imagery.',
      'Implemented MobileNetV2 transfer learning, optimizing the model to achieve rigorous accuracy, precision, recall, and F1-score benchmarks.',
      'Designed a scalable backend architecture via FastAPI to bridge the machine learning model with the client-facing web application.',
      'Employed advanced prompt engineering strategies for AI-assisted research, debugging, and documentation generation throughout the software lifecycle.'
    ],
    technologies: ['Python', 'TensorFlow', 'MobileNetV2', 'OpenCV', 'FastAPI', 'React', 'TypeScript']
  },
  {
    period: '2022 — Present',
    role: 'Founder & CEO / Technology Entrepreneur & Digital Marketing Strategist',
    company: 'DREAM CHASERS LAPTOPS (DC LAPTOPS)',
    location: 'Takoradi, Ghana',
    category: 'entrepreneurship',
    highlights: [
      'Provide expert technical consultation, analyzing client performance requirements to recommend optimal computer hardware specifications.',
      'Execute end-to-end digital marketing strategies, leveraging graphic design expertise to create compelling promotional assets that drive customer acquisition and retention.'
    ],
    technologies: ['Hardware Consultation', 'Digital Marketing', 'Graphic Design', 'Brand Strategy', 'Customer Acquisition']
  },
  {
    period: '2024 — 2025',
    role: 'Public Relations Officer & Editorial Board Chairman',
    company: 'UMaT SRID — 1st SRC Administration',
    location: 'School of Railways and Infrastructure Development',
    category: 'leadership',
    highlights: [
      'Directed comprehensive public relations strategies, commanding all digital communications and promotional materials to maximize student engagement.',
      'Led editorial oversight, managing a team to publish high-quality, student-focused content and aligning institutional messaging with the student body.'
    ],
    technologies: ['Public Relations', 'Editorial Management', 'Institutional Communications', 'Digital Media', 'Team Leadership']
  },
  {
    period: 'Corporate Internship',
    role: 'Engineering & Technical Intern',
    company: 'TOYOTA GHANA',
    location: 'Ghana',
    category: 'academic',
    highlights: [
      'Integrated into a structured corporate environment, executing technical deliverables while mastering cross-functional communication and professional problem-solving protocols.'
    ],
    technologies: ['Corporate Engineering', 'Technical Deliverables', 'Cross-Functional Problem Solving']
  },
  {
    period: '2023 — Present',
    role: 'AR Creator & Visual Designer',
    company: 'Freelance / Creator Studio',
    location: 'Remote',
    category: 'design_ar',
    highlights: [
      'Authored viral augmented reality experiences in Snapchat Lens Studio with custom 3D face tracking shaders and spatial VFX.',
      'Mastery in structuring complex prompts to command Large Language Models (LLMs) for high-fidelity code generation, system architecture design, and rapid prototyping.',
      'Created elite-level visual communication strategies, high-converting promotional campaigns, corporate branding assets, and marketing materials in Canva & Photoshop.'
    ],
    technologies: ['Lens Studio', 'Canva Advanced', 'Adobe Photoshop', 'Figma', 'Prompt Engineering', 'GenAI']
  }
];
