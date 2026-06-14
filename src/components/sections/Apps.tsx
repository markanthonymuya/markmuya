'use client';

import { useInView } from '@/hooks/useInView';
import { clsx } from 'clsx';
import { APPS } from '@/lib/data';
import { ExternalLink, Check, ArrowRight } from 'lucide-react';
import { App } from '@/types';

function AppCard({ app, delay }: { app: App; delay: string }) {
  const { ref, inView } = useInView();

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={clsx('glass rounded-3xl overflow-hidden reveal', inView && `visible ${delay}`)}>

      {/* Gradient header */}
      <div className={clsx('relative bg-gradient-to-br p-8 sm:p-10', app.gradient)}>
        <div className="flex items-start justify-between mb-6">
          <span className="text-6xl animate-float">{app.emoji}</span>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
              ● Live
            </span>
            <span className="glass rounded-full px-3 py-1 text-xs font-medium text-white/80">
              {app.platform}
            </span>
          </div>
        </div>
        <h3 className="text-4xl font-black text-white mb-2">{app.name}</h3>
        <p className="text-white/80 text-lg font-medium">{app.tagline}</p>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
      </div>

      {/* Content — two columns on desktop */}
      <div className="p-8 sm:p-10 grid sm:grid-cols-2 gap-8">

        {/* Left: description + tags + CTAs */}
        <div className="flex flex-col">
          <p className="text-slate-300 leading-relaxed mb-6">{app.description}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {app.tags.map((tag) => (
              <span key={tag}
                className="px-3 py-1 bg-white/5 border border-white/8 rounded-lg text-xs font-medium text-slate-400">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-auto flex gap-3">
            <a
              href={app.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand hover:bg-brand-dark text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand/30"
            >
              {app.ctaLabel}
              <ArrowRight size={15} />
            </a>
            {app.secondaryCta && (
              <a
                href={app.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 glass hover:bg-white/10 text-white rounded-xl transition-all"
                title={app.secondaryCta.label}
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Right: features + visit prompt */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">What it does</p>
          <ul className="space-y-3">
            {app.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-slate-300">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center">
                  <Check size={11} className="text-brand" />
                </span>
                <span className="text-sm leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>

          {app.visitPrompt && (
            <div className="mt-8 p-4 rounded-2xl bg-brand/8 border border-brand/20">
              <p className="text-sm text-brand-light font-medium mb-1">{app.visitPrompt.title}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{app.visitPrompt.description}</p>
              <a
                href={app.visitPrompt.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-brand hover:text-brand-light transition-colors"
              >
                {app.visitPrompt.urlLabel}
                <ExternalLink size={11} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Apps() {
  const { ref, inView } = useInView();

  return (
    <section id="apps" ref={ref as React.RefObject<HTMLElement>} className="py-28 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Section header */}
        <div className={clsx('text-center mb-14 reveal', inView && 'visible')}>
          <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-4">Featured Apps</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            What I've <span className="text-gradient">Built</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Real products crafted with care — try them and see for yourself.
          </p>
        </div>

        {/* App cards */}
        <div className="space-y-8">
          {APPS.map((app, i) => (
            <AppCard key={app.id} app={app} delay={`reveal-delay-${(i + 1) * 2}`} />
          ))}
        </div>

        {/* CTA below */}
        <div className={clsx('mt-12 text-center reveal', inView && 'visible reveal-delay-4')}>
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-2xl font-bold text-white mb-2">Have a project in mind?</p>
            <p className="text-slate-400 mb-6">I'm always open to building something new and exciting. Let's talk.</p>
            <a
              href="mailto:markmuya@outlook.com?subject=Project inquiry"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand hover:bg-brand-dark text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-brand/30"
            >
              Start a Conversation
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
