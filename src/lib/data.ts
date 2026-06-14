import { App } from '@/types';

export const APPS: App[] = [
  {
    id: 'panalangin',
    name: 'Panalangin',
    tagline: 'Every prayer, lifted together at the Holy Eucharist.',
    description:
      'A dignified web platform for Filipino Catholic parishes to receive, manage, and display mass intentions during every celebration of the Holy Eucharist — beautifully encoded by parish staff and shown on the altar screen for the whole community.',
    tags: ['FastAPI', 'Python', 'PostgreSQL', 'Neon', 'Vercel'],
    platform: 'Web',
    status: 'Live',
    emoji: '🙏',
    gradient: 'from-amber-800 to-yellow-700',
    ctaLabel: 'Visit Panalangin',
    ctaHref: 'https://panalangin.markmuya.com',
    secondaryCta: { label: 'View Code', href: 'https://github.com/markanthonymuya/panalangin' },
    features: [
      'Community prayer united at every Holy Mass',
      'Projector-ready altar display, works offline',
      'Parish staff encodes & manages all intentions',
      'Novena & multi-day date range support',
    ],
    visitPrompt: {
      title: 'Free 3-month trial for parishes',
      description: 'Parish offices request an access code, register, and start displaying intentions on the altar screen — in under 10 minutes.',
      url: 'https://panalangin.markmuya.com',
      urlLabel: 'panalangin.markmuya.com',
    },
  },
  {
    id: 'countmein',
    name: 'CountMeIn',
    tagline: 'Event registration, beautifully simple.',
    description:
      'A free, open event registration platform. Organizers create events, manage registrants, scan QR codes at entry, run raffles, and export attendance records with certificates.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Cloudflare R2'],
    platform: 'Web',
    status: 'Live',
    emoji: '🎟️',
    gradient: 'from-indigo-500 to-violet-600',
    ctaLabel: 'Register for an Event',
    ctaHref: 'https://countmein.markmuya.com',
    secondaryCta: { label: 'View Code', href: 'https://github.com/markanthonymuya/countmein' },
    features: [
      'QR code check-in & check-out',
      'Multi-day attendance tracking',
      'Raffle wheel for live attendees',
      'Shareable attendance certificate',
    ],
    visitPrompt: {
      title: 'Free & open to everyone',
      description: 'Organizers sign up free. Registrants join events with a QR code — no account needed.',
      url: 'https://countmein.markmuya.com',
      urlLabel: 'countmein.markmuya.com',
    },
  },
];

export const SKILLS = [
  { category: 'Mobile',     items: ['React Native', 'Expo', 'iOS', 'Android'] },
  { category: 'Frontend',   items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend',    items: ['Node.js', 'PHP', 'FastAPI', 'Python', 'REST APIs', 'MySQL'] },
  { category: 'AI & Tools', items: ['Claude API', 'OpenAI', 'PostgreSQL', 'Git'] },
];
