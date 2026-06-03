import { App } from '@/types';

export const APPS: App[] = [
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
  },
];

export const SKILLS = [
  { category: 'Mobile',     items: ['React Native', 'Expo', 'iOS', 'Android'] },
  { category: 'Frontend',   items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend',    items: ['Node.js', 'PHP', 'REST APIs', 'MySQL'] },
  { category: 'AI & Tools', items: ['Claude API', 'OpenAI', 'SQLite', 'Git'] },
];
