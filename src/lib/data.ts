import { App } from '@/types';

export const APPS: App[] = [
  {
    id: 'hourlyhealth',
    name: 'HourlyHealth AI',
    tagline: 'Know your health, hour by hour.',
    description:
      'Log every hour of your day, track mood and activity intensity, and receive AI-powered daily, monthly, and yearly health insights. Built with React Native & Claude AI.',
    tags: ['React Native', 'Expo', 'Claude AI', 'SQLite'],
    platform: 'iOS & Android',
    status: 'Coming Soon',
    emoji: '🏃',
    gradient: 'from-blue-500 to-cyan-400',
    ctaLabel: 'Notify Me',
    ctaHref: 'mailto:markmuya@outlook.com?subject=HourlyHealth AI — Notify Me',
    features: [
      '24-hour activity grid',
      'AI daily health analysis',
      'Mood & intensity tracking',
      'Streak & achievement system',
    ],
  },
  {
    id: 'spendwise',
    name: 'SpendWise',
    tagline: 'Smart expense tracking, beautifully simple.',
    description:
      'A modern web-based expense tracker with category analytics, monthly trend charts, smart filtering, and CSV export. Built with Next.js 14 and Tailwind CSS.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Recharts'],
    platform: 'Web',
    status: 'Live',
    emoji: '💸',
    gradient: 'from-violet-500 to-purple-600',
    ctaLabel: 'Try Live Demo',
    ctaHref: '#',
    secondaryCta: { label: 'View Code', href: 'https://github.com/markanthonymuya/' },
    features: [
      'Expense categories & filters',
      'Monthly trend analytics',
      'Category breakdown charts',
      'CSV export',
    ],
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
  },
];

export const SKILLS = [
  { category: 'Mobile',     items: ['React Native', 'Expo', 'iOS', 'Android'] },
  { category: 'Frontend',   items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend',    items: ['Node.js', 'PHP', 'REST APIs', 'MySQL'] },
  { category: 'AI & Tools', items: ['Claude API', 'OpenAI', 'SQLite', 'Git'] },
];
