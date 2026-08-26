import { Project, DesignItem, ARLens, SkillNode, ServiceItem, ExperienceItem } from '../types';

export const PERSONAL_INFO = {
  name: 'ABDUL QABID SIAKA',
  shortName: 'Abdul Qabid',
  titles: 'Software Developer · Graphic Designer · AR Creator',
  positioning: 'Creative Technologist',
  brandStatement: 'I BUILD. I DESIGN. I CREATE EXPERIENCES.',
  tagline: 'Turning complex ideas into functional, visual, and interactive reality.',
  location: 'Ghana 🇬🇭',
  email: 'siakaabdulqabid@gmail.com',
  github: 'https://github.com/alqabid',
  linkedin: 'https://www.linkedin.com/in/abdul-qabid-siaka-a59a01414/',
  snapchat: 'https://creator.snapchat.com/creator/zVAqoADqQn9UCriV-MlElg',
  snapchatCreator: 'https://creator.snapchat.com/creator/zVAqoADqQn9UCriV-MlElg',
  snapchatAccount: 'https://www.snapchat.com/add/big_qabid?share_id=Y2N5s5T8SAGlHF13qzE7qA&locale=en_GH',
  snapchatHandle: 'big_qabid',
  whatsapp: 'https://wa.me/233238318021', // direct WhatsApp link
  availability: 'Available for Engineering Roles, AR Commissions & Design Projects',
  bio: `I'm a software developer, graphic designer, and AR creator from Ghana. I bridge the gap between engineering rigor and high-impact visual design. Whether building AI-powered computer vision systems, crafting high-converting visual media and viral thumbnails, or authoring interactive augmented reality lenses in Lens Studio, I build digital experiences people actually love to explore.`,
  equation: {
    part1: 'CODE (Python & TypeScript)',
    part2: 'DESIGN (Canva & Photoshop)',
    part3: 'AR (Lens Studio & 3D)',
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
    description: 'MedVision is a clinical-support web application that analyzes pediatric chest X-rays to detect viral and bacterial pneumonia signatures in seconds, empowering healthcare practitioners with rapid triage insights.',
    problem: 'Radiologist shortages in developing medical centers often delay chest X-ray interpretations for acute respiratory infections, where rapid diagnosis can be life-saving.',
    solution: 'Designed and deployed an end-to-end computer vision pipeline using MobileNetV2 with transfer learning, exposed via a low-latency FastAPI backend and wrapped in an intuitive medical dashboard with confidence scores and region heatmaps.',
    architecture: [
      'Frontend: React + Tailwind CSS with DICOM/PNG radiograph visualizer',
      'API Layer: Asynchronous FastAPI with Pydantic validation & image normalization',
      'Inference Engine: TensorFlow / MobileNetV2 trained on thousands of labeled pediatric chest radiographs',
      'Deployment: Vercel Global Edge Network'
    ],
    features: [
      'Sub-second image pre-processing and tensor normalization',
      'Confidence scoring with uncertainty threshold alerts (Viral vs. Bacterial vs. Normal)',
      'Grad-CAM styled attention heatmap overlay highlighting pulmonary infiltrates',
      'Exportable clinical summary reports for attending physicians'
    ],
    technologies: ['Python', 'TensorFlow', 'MobileNetV2', 'FastAPI', 'React', 'TypeScript', 'Vercel', 'Computer Vision'],
    metrics: [
      { label: 'Validation Accuracy', value: '94.2%' },
      { label: 'Avg Inference Time', value: '< 280ms' },
      { label: 'Model Footprint', value: '14.8 MB' }
    ],
    previewType: 'interactive',
    previewUrl: 'https://api.microlink.io?url=https%3A%2F%2Fmedvision1.vercel.app&screenshot=true&meta=false&embed=screenshot.url',
    accentColor: '#FFF35C',
    role: 'Lead ML & Full-Stack Engineer',
    liveUrl: 'https://medvision1.vercel.app/',
    githubUrl: 'https://github.com/alqabid'
  },
  {
    id: 'yugogoo',
    title: 'Yugogoo',
    category: 'build',
    subtitle: 'Location-Based Event Discovery & Social Ticketing Platform',
    tagline: 'Discover what is happening nearby with real-time geospatial feeds.',
    description: 'Yugogoo is a vibrant live platform bridging event organizers and attendees through geo-clustered discovery, automated dynamic QR ticketing, and interactive attendee heatmaps.',
    problem: 'Community gatherings and cultural events in African tech & creative hubs often suffer from fragmented discovery across disparate WhatsApp groups and social feeds with cumbersome payment links.',
    solution: 'Engineered a unified location-first platform where users discover curated events on an interactive map, reserve tickets with mobile money integration, and connect with attendees before stepping through the door.',
    architecture: [
      'Frontend: React + TypeScript + Motion with mobile-optimized map interfaces',
      'Backend: Node.js & Express REST APIs with geospatial indexing',
      'Deployment: Vercel Cloud CDN with edge optimization',
      'Ticketing: Cryptographically signed QR generation for fast offline-capable venue check-ins'
    ],
    features: [
      'Real-time proximity filtering (5km, 15km, 50km radius)',
      'Instant digital ticket wallet with offline QR scanning',
      'Organizer dashboard with ticket tier analytics and live attendee check-in counts',
      'Social RSVP circles and integrated calendar syncing'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Vercel', 'Tailwind CSS', 'QR Engine', 'Geospatial API'],
    metrics: [
      { label: 'Active Events Hosted', value: '120+' },
      { label: 'Ticket Scan Latency', value: '< 150ms' },
      { label: 'User Satisfaction', value: '98%' }
    ],
    previewType: 'interactive',
    previewUrl: 'https://api.microlink.io?url=http%3A%2F%2Fyugogoo-website.vercel.app&screenshot=true&meta=false&embed=screenshot.url',
    accentColor: '#A9DDFF',
    role: 'Product Lead & Lead Developer',
    liveUrl: 'http://yugogoo-website.vercel.app/',
    githubUrl: 'https://github.com/alqabid'
  },
  {
    id: 'ugogo',
    title: 'UGOGO',
    category: 'build',
    subtitle: 'Location-First Urban Exploration & Mobility Platform',
    tagline: 'Seamlessly navigating local hotspots, experiences, and transit connections.',
    description: 'UGOGO is a modern location-based mobility and discovery web application designed for fast, frictionless local navigation and community engagement.',
    problem: 'Navigating urban centers, discovering local businesses, and organizing transportation is often fragmented across multiple uncoordinated apps.',
    solution: 'Created an all-in-one responsive web platform combining dynamic maps, direct business indexing, and swift commuter insights with high-performance client rendering.',
    architecture: [
      'Frontend: React + Vite + Tailwind CSS for responsive mobile and desktop viewports',
      'Location Engine: Geolocation API integration with interactive routing',
      'State Management: Lightweight reactive client state with cached search queries',
      'Deployment: Vercel Cloud CDN with automatic edge optimization'
    ],
    features: [
      'Interactive localized mapping and spot discovery',
      'Fast responsive search indexing for nearby venues and points of interest',
      'Mobile-first touch optimized navigation controls',
      'Live status feeds and community bookmarks'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Geospatial APIs', 'Vercel'],
    metrics: [
      { label: 'Page Load Speed', value: '< 0.8s' },
      { label: 'Mobile Responsiveness', value: '100%' },
      { label: 'Lighthouse Score', value: '98/100' }
    ],
    previewType: 'image',
    previewUrl: 'https://api.microlink.io?url=http%3A%2F%2Fugogo.vercel.app&screenshot=true&meta=false&embed=screenshot.url',
    accentColor: '#B9F5D0',
    role: 'Lead Frontend & Product Architect',
    liveUrl: 'http://ugogo.vercel.app/',
    githubUrl: 'https://github.com/alqabid'
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
    id: 'autoresume-ai',
    title: 'AutoResume AI',
    category: 'build',
    subtitle: 'Semantic Skill Extraction & ATS Optimizer',
    tagline: 'Transform tech resumes into tailored ATS-compliant profiles.',
    description: 'An automated analyzer extracting keyword taxonomies, technical competencies, and semantic job description matches using natural language embeddings.',
    problem: 'Job seekers struggle to understand how applicant tracking systems parse their engineering experience.',
    solution: 'Built an interactive parser that tokenizes resumes, highlights missing domain competencies, and suggests high-impact bullet point phrasing.',
    features: [
      'PDF & Word document multi-section parser',
      'Semantic keyword clustering across 200+ developer frameworks',
      'Match percentage calculation against target job descriptions'
    ],
    technologies: ['Python', 'FastAPI', 'NLP', 'React', 'Tailwind CSS'],
    metrics: [
      { label: 'Parsing Accuracy', value: '96%' },
      { label: 'Processing Speed', value: '< 1.2s' }
    ],
    previewType: 'image',
    previewUrl: 'https://api.microlink.io?url=https%3A%2F%2Fgithub.com%2Falqabid&screenshot=true&meta=false&embed=screenshot.url',
    accentColor: '#C9B8FF',
    role: 'Full-Stack Developer',
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
  { id: 'react', name: 'React', category: 'code', level: 92, description: 'Component architecture, hooks, state machines, Motion animations, performance optimization.', connectedProjects: ['medvision', 'yugogoo', 'autoresume-ai'] },
  { id: 'typescript', name: 'TypeScript', category: 'code', level: 90, description: 'Strict typing, generic interfaces, scalable full-stack codebases.', connectedProjects: ['medvision', 'yugogoo'] },
  { id: 'python', name: 'Python', category: 'code', level: 94, description: 'FastAPI, asynchronous backend architectures, data preprocessing, machine learning scripts.', connectedProjects: ['medvision', 'autoresume-ai'] },
  { id: 'fastapi', name: 'FastAPI', category: 'code', level: 90, description: 'High-throughput microservices, OpenAPI schemas, async workers.', connectedProjects: ['medvision', 'autoresume-ai'] },
  { id: 'tensorflow', name: 'TensorFlow / AI', category: 'ai', level: 85, description: 'MobileNetV2, CNN architectures, computer vision transfer learning, model quantization.', connectedProjects: ['medvision'] },
  { id: 'canva', name: 'Canva (Advanced)', category: 'design', level: 98, description: 'High-converting visual composition, YouTube thumbnails, marketing collateral, brand decks.', connectedProjects: ['thumb-ai-breakthrough', 'thumb-dev-roadmap', 'brand-tech-fest', 'social-product-drop'] },
  { id: 'photoshop', name: 'Adobe Photoshop', category: 'design', level: 88, description: 'Photo manipulation, color grading, clipping paths, lighting effects, raster compositing.', connectedProjects: ['thumb-ai-breakthrough', 'poster-cyber-beats', 'marketing-creator-kit'] },
  { id: 'figma', name: 'Figma', category: 'design', level: 86, description: 'UI/UX wireframing, responsive design systems, interactive prototypes.', connectedProjects: ['ui-crypto-lens', 'brand-tech-fest', 'yugogoo'] },
  { id: 'lensstudio', name: 'Lens Studio', category: 'ar', level: 92, description: 'Face & world tracking, segmentation shaders, visual scripting, 3D asset integration.', connectedProjects: ['lens-cyber-hud', 'lens-aura-bloom', 'lens-retro-shades', 'lens-ghana-portal'] },
  { id: 'postgresql', name: 'PostgreSQL & SQL', category: 'code', level: 84, description: 'Relational schemas, indexing, query optimization, spatial queries.', connectedProjects: ['medvision', 'yugogoo'] },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'code', level: 95, description: 'Utility-first rapid prototyping, responsive layouts, custom design systems.', connectedProjects: ['medvision', 'yugogoo', 'autoresume-ai'] },
  { id: 'ar_vfx', name: 'AR Shaders & VFX', category: 'ar', level: 87, description: 'Particle systems, lighting maps, blend modes, interactive triggers.', connectedProjects: ['lens-cyber-hud', 'lens-aura-bloom'] }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-build',
    title: 'BUILD',
    tagline: 'Web Apps, APIs & AI Software',
    description: 'Transforming technical requirements into lightning-fast, production-ready web platforms and intelligent APIs.',
    deliverables: ['Custom React / Next.js web applications', 'FastAPI & Node.js backend microservices', 'Database architecture & PostgreSQL integrations', 'AI / ML integration & model deployment'],
    accentColor: '#FFF35C',
    iconName: 'Code2'
  },
  {
    id: 'srv-design',
    title: 'DESIGN',
    tagline: 'Thumbnails, Branding & High-Impact Visuals',
    description: 'Crafting visuals that stop the scroll and establish undeniable authority across digital channels.',
    deliverables: ['High-CTR YouTube thumbnail design', 'Complete brand identity & style guides', 'Marketing flyers & social campaign packages', 'UI/UX component systems in Figma'],
    accentColor: '#FFB7D5',
    iconName: 'Palette'
  },
  {
    id: 'srv-ar',
    title: 'AR CREATION',
    tagline: 'Snapchat Lenses & Interactive Filters',
    description: 'Crafting immersive augmented reality experiences for creators, brands, and cultural events.',
    deliverables: ['Snapchat Lens Studio development', 'Custom face effects & 3D tracking shaders', 'Event & festival branded filters', 'Snapcode deployment & analytics reporting'],
    accentColor: '#C9B8FF',
    iconName: 'Sparkles'
  },
  {
    id: 'srv-ai',
    title: 'AI & VISION',
    tagline: 'Computer Vision & Intelligent Systems',
    description: 'Deploying machine learning models into real-world diagnostic and classification workflows.',
    deliverables: ['Computer vision model training & fine-tuning', 'Transfer learning with MobileNet / CNNs', 'Inference APIs with sub-second response times', 'Interactive diagnostic interfaces'],
    accentColor: '#B9F5D0',
    iconName: 'Brain'
  }
];

export const RECRUITER_DATA = {
  name: 'ABDUL QABID SIAKA',
  title: 'Software Developer · Graphic Designer · AR Creator (Creative Technologist)',
  location: 'Ghana',
  email: 'siakaabdulqabid@gmail.com',
  summary: 'Multidisciplinary Creative Technologist with deep experience in full-stack web development (TypeScript, React, Python, FastAPI), visual design (Canva Advanced, Photoshop, Figma), and Augmented Reality creation (Lens Studio). Proven track record leading product architecture for event discovery platforms (Yugogoo) and engineering clinical AI computer vision solutions (MedVision).',
  skills: {
    languages: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML5', 'CSS3'],
    frameworks: ['React', 'Next.js', 'FastAPI', 'Node.js', 'Express', 'Tailwind CSS', 'TensorFlow'],
    tools: ['Lens Studio', 'Canva (Advanced)', 'Adobe Photoshop', 'Figma', 'Git', 'GitHub', 'PostgreSQL', 'Docker'],
    competencies: ['Computer Vision (MobileNetV2)', 'REST APIs', 'AR Lens Creation', 'UI/UX Prototyping', 'High-CTR Visual Content', 'Product Leadership']
  },
  experience: [
    {
      period: '2024 — Present',
      role: 'Product Lead & Full-Stack Developer',
      company: 'Yugogoo Platform',
      location: 'Ghana',
      highlights: [
        'Directed the technical architecture and user experience of a location-based event discovery platform.',
        'Engineered responsive React client and PostgreSQL backend supporting 120+ active community events.',
        'Implemented cryptographically signed QR ticket scanning pipeline with sub-150ms verification latency.'
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'QR Engine']
    },
    {
      period: '2023 — Present',
      role: 'AR Creator & Visual Content Designer',
      company: 'Freelance / Creator Studio',
      location: 'Remote',
      highlights: [
        'Authored over a dozen Snapchat Lens Studio augmented reality filters amassing over 250,000+ total views.',
        'Designed high-impact YouTube thumbnails and marketing assets yielding verified average CTRs exceeding 14%.',
        'Partnered with brands and event organizers to create cohesive visual campaigns spanning digital and print.'
      ],
      technologies: ['Lens Studio', 'Canva Advanced', 'Adobe Photoshop', 'Figma', '3D Shaders']
    },
    {
      period: '2023 — 2024',
      role: 'Lead ML & Software Engineer',
      company: 'MedVision Project',
      location: 'Academic / Open-Source',
      highlights: [
        'Developed transfer learning computer vision pipeline with MobileNetV2 for automated pneumonia detection on chest radiographs (94.2% test accuracy).',
        'Built asynchronous FastAPI inference gateway and React medical consultation dashboard.'
      ],
      technologies: ['Python', 'TensorFlow', 'MobileNetV2', 'FastAPI', 'React', 'TypeScript']
    }
  ] as ExperienceItem[],
  education: [
    {
      degree: 'B.Sc. in Computer Science & Engineering',
      institution: 'Top Technical University / College',
      location: 'Ghana',
      period: '2021 — 2025 (Expected/Graduated)',
      highlights: ['Specialization in Software Systems, Computer Vision, and Digital Product Design']
    }
  ]
};

export const EXPERIENCE: ExperienceItem[] = RECRUITER_DATA.experience;
