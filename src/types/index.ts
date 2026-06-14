export interface App {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  platform: 'iOS & Android' | 'Web' | 'Cross-Platform';
  status: 'Live' | 'Coming Soon' | 'Beta';
  emoji: string;
  gradient: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCta?: { label: string; href: string };
  features: string[];
  visitPrompt?: { title: string; description: string; url: string; urlLabel: string };
}

export interface ChatMessage {
  id: string;
  role: 'bot' | 'user';
  text: string;
  timestamp: Date;
  options?: string[];
}

export type ChatStep =
  | 'greeting'
  | 'intent'
  | 'collect_name'
  | 'collect_email'
  | 'collect_message'
  | 'confirm'
  | 'done'
  | 'error';

export interface InquiryPayload {
  name: string;
  email: string;
  intent: string;
  message: string;
}
