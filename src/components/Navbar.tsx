'use client';

import { useState, useEffect } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';

const LINKS = [
  { href: '#about',   label: 'About'   },
  { href: '#apps',    label: 'Apps'    },
  { href: '#skills',  label: 'Skills'  },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'bg-transparent'
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-violet-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <TrendingUp size={16} className="text-white" />
          </div>
          <span className="font-bold text-white text-sm tracking-wide">Mark Muya</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <button
                onClick={() => handleLink(href)}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all"
              >
                {label}
              </button>
            </li>
          ))}
          <li>
            <a
              href="https://countmein.markmuya.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 px-4 py-2 text-sm font-semibold text-brand-light border border-brand/30 hover:border-brand hover:bg-brand/10 rounded-xl transition-all"
            >
              🎟️ CountMeIn
            </a>
          </li>
          <li>
            <a
              href="mailto:markmuya@outlook.com"
              className="ml-2 px-4 py-2 text-sm font-semibold text-white bg-brand hover:bg-brand-dark rounded-xl transition-all shadow-sm hover:shadow-brand/30 hover:shadow-md"
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-slate-300 hover:text-white"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-strong border-t border-white/5 px-6 py-4 space-y-1">
          {LINKS.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => handleLink(href)}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              {label}
            </button>
          ))}
          <a
            href="https://countmein.markmuya.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block w-full text-center mt-2 px-4 py-3 text-sm font-semibold text-brand-light border border-brand/30 hover:bg-brand/10 rounded-xl transition-all"
          >
            🎟️ CountMeIn
          </a>
          <a
            href="mailto:markmuya@outlook.com"
            onClick={() => setOpen(false)}
            className="block w-full text-center mt-2 px-4 py-3 text-sm font-semibold text-white bg-brand hover:bg-brand-dark rounded-xl transition-all"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}
