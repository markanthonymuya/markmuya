'use client';

import { useInView } from '@/hooks/useInView';
import { clsx } from 'clsx';
import { APPS } from '@/lib/data';
import { App } from '@/types';
import { ExternalLink, Check, ArrowRight } from 'lucide-react';

function StatusBadge({ status }: { status: App['status'] }) {
  return (
    <span
      className={clsx('px-2.5 py-0.5 rounded-full text-xs font-semibold', {
        'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20': status === 'Live',
        'bg-amber-500/15 text-amber-400 border border-amber-500/20': status === 'Coming Soon',
        'bg-brand/15 text-brand-light border border-brand/20': status === 'Beta',
      })}
    >
      {status === 'Live' && <span className="mr-1">●</span>}
      {status}
    </span>
  );
}

function AppCard({ app, index }: { app: App; index: number }) {
  const { ref, inView } = useInView(0.1);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={clsx(
        'relative glass rounded-3xl overflow-hidden hover:border-white/15 transition-all duration-500 hover:-translate-y-1 hover:glow-brand group reveal',
        inView && 'visible',
        index === 1 && 'reveal-delay-2',
        index === 2 && 'reveal-delay-3'
      )}
    >
      {/* Gradient header */}
      <div className={clsx('relative h-44 bg-gradient-to-br p-6 flex flex-col justify-between', app.gradient)}>
        <div className="flex items-start justify-between">
          <span className="text-5xl animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
            {app.emoji}
          </span>
          <div className="flex items-center gap-2">
            <StatusBadge status={app.status} />
            <span className="glass rounded-full px-2.5 py-0.5 text-xs font-medium text-white/80">
              {app.platform}
            </span>
          </div>
        </div>
        <h3 className="text-2xl font-black text-white">{app.name}</h3>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-brand-light font-semibold text-sm mb-2">{app.tagline}</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">{app.description}</p>

        {/* Features */}
        <ul className="space-y-1.5 mb-6">
          {app.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
              <Check size={13} className="text-brand flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {app.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-white/5 border border-white/8 rounded-lg text-xs font-medium text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex gap-3">
          <a
            href={app.ctaHref}
            target={app.ctaHref.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-brand hover:bg-brand-dark text-white text-sm font-semibold rounded-xl transition-all hover:shadow-md hover:shadow-brand/30"
          >
            {app.ctaLabel}
            <ArrowRight size={14} />
          </a>
          {app.secondaryCta && (
            <a
              href={app.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 glass hover:bg-white/10 text-white rounded-xl transition-all"
              title={app.secondaryCta.label}
            >
              <ExternalLink size={15} />
            </a>
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
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={clsx('text-center mb-16 reveal', inView && 'visible')}>
          <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-4">My Work</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Apps I've <span className="text-gradient">Built</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Real products crafted with care. Download, try, and see for yourself.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPS.map((app, i) => (
            <AppCard key={app.id} app={app} index={i} />
          ))}
        </div>

        {/* CTA below apps */}
        <div className={clsx('mt-16 text-center reveal', inView && 'visible reveal-delay-4')}>
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
