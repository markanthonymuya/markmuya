'use client';

import { useState, useEffect } from 'react';
import { ArrowDown, Github, Mail, Linkedin, FileText } from 'lucide-react';

const ROLES = [
  'Full-Stack Developer',
  'Mobile App Developer',
  'AI Integration Engineer',
  'React Native Specialist',
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = ROLES[roleIndex];
    let i = 0;
    let timeout: NodeJS.Timeout;

    if (typing) {
      timeout = setInterval(() => {
        setDisplayed(target.slice(0, i + 1));
        i++;
        if (i === target.length) {
          clearInterval(timeout);
          setTimeout(() => setTyping(false), 2200);
        }
      }, 55);
    } else {
      let remaining = displayed.length; // capture now — avoids stale closure
      timeout = setInterval(() => {
        remaining--;
        setDisplayed((prev) => prev.slice(0, -1));
        if (remaining <= 0) {
          clearInterval(timeout);
          setRoleIndex((r) => (r + 1) % ROLES.length);
          setTyping(true);
        }
      }, 30);
    }

    return () => clearInterval(timeout);
  }, [roleIndex, typing]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-brand/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-violet-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Available badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping-slow" />
          <span className="text-xs font-medium text-slate-300">Available for hire</span>
        </div>

        {/* Name */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-4 animate-fade-up">
          <span className="text-white">Hi, I'm </span>
          <span className="text-gradient">Mark Muya</span>
        </h1>

        {/* Typewriter role */}
        <div className="h-12 flex items-center justify-center mb-6">
          <p className="text-2xl sm:text-3xl font-semibold text-slate-300">
            {displayed}
            <span className="animate-blink text-brand ml-0.5">|</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
          I build <span className="text-white font-medium">beautiful, purposeful apps</span> for web and mobile.
          From mass intention platforms for Catholic parishes to open event registration tools — I turn real needs into
          products people <span className="text-white font-medium">actually love using</span>.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14 animate-fade-up" style={{ animationDelay: '0.35s' }}>
          <a
            href="#apps"
            onClick={(e) => { e.preventDefault(); document.querySelector('#apps')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-7 py-3.5 bg-brand hover:bg-brand-dark font-semibold text-white rounded-2xl transition-all shadow-lg hover:shadow-brand/40 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            See My Apps
          </a>
          <a
            href="mailto:markmuya@outlook.com"
            className="px-7 py-3.5 glass hover:bg-white/10 font-semibold text-white rounded-2xl transition-all border border-white/10 hover:border-white/20"
          >
            Get In Touch
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 glass hover:bg-white/10 font-semibold text-slate-300 hover:text-white rounded-2xl transition-all border border-white/10 hover:border-white/20"
          >
            <FileText size={16} />
            View CV
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {[
            { icon: Mail,     href: 'mailto:markmuya@outlook.com', label: 'Email'    },
            { icon: Github,   href: 'https://github.com/markanthonymuya/', label: 'GitHub'   },
            { icon: Linkedin, href: 'https://linkedin.com/in/markmuya', label: 'LinkedIn' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              title={label}
              className="w-11 h-11 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all hover:-translate-y-0.5"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors animate-float"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} />
      </button>
    </section>
  );
}
