import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { ChatBot } from '@/components/ChatBot';

export const metadata: Metadata = {
  title: 'Mark Muya — Full-Stack & Mobile Developer',
  description:
    'Portfolio of Mark Muya, a full-stack and mobile developer building AI-powered apps. Available for hire.',
  keywords: 'Mark Muya, developer, React Native, Next.js, portfolio, hire',
  openGraph: {
    title: 'Mark Muya — Developer Portfolio',
    description: 'Full-stack & mobile developer. Let\'s build something great.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
