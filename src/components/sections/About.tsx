'use client';

import { useInView } from '@/hooks/useInView';
import { clsx } from 'clsx';
import { Code2, Smartphone, Brain, Globe } from 'lucide-react';

const HIGHLIGHTS = [
  { icon: Smartphone, label: 'Mobile Apps', desc: 'React Native & Expo for iOS and Android' },
  { icon: Globe,      label: 'Web Apps',    desc: 'Next.js, React, TypeScript full-stack'   },
  { icon: Brain,      label: 'AI Features', desc: 'Claude API & OpenAI integrations'        },
  { icon: Code2,      label: 'Clean Code',  desc: 'TypeScript-first, tested & documented'   },
];

export function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className={clsx('grid lg:grid-cols-2 gap-16 items-center reveal', inView && 'visible')}>
          {/* Text */}
          <div>
            <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-4">About Me</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
              Building apps that <span className="text-gradient">matter.</span>
            </h2>
            <div className="space-y-4 text-slate-400 text-base leading-relaxed">
              <p>
                I'm <span className="text-white font-semibold">Mark Muya</span>, a full-stack and
                mobile developer passionate about creating software that genuinely helps people.
                Whether it's a health app that promotes self-awareness or a finance tool that
                makes budgeting effortless — I build with purpose.
              </p>
              <p>
                My stack spans <span className="text-white">React Native</span> for cross-platform
                mobile apps, <span className="text-white">Next.js</span> for blazing-fast web
                experiences, and <span className="text-white">AI APIs</span> like Claude and
                OpenAI to add intelligent features that delight users.
              </p>
              <p>
                I'm currently open to new opportunities — full-time roles, contract work, or
                exciting collaborations. Let's build something great together.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="mailto:markmuya@outlook.com"
                className="px-5 py-2.5 bg-brand hover:bg-brand-dark text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-brand/30"
              >
                Hire Me
              </a>
              <a
                href="mailto:markmuya@outlook.com?subject=Portfolio inquiry"
                className="px-5 py-2.5 glass hover:bg-white/10 text-white font-semibold text-sm rounded-xl transition-all"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-4">
            {HIGHLIGHTS.map(({ icon: Icon, label, desc }, i) => (
              <div
                key={label}
                className={clsx(
                  'glass rounded-2xl p-5 hover:bg-white/[0.07] transition-all hover:-translate-y-1 cursor-default reveal',
                  inView && 'visible',
                  `reveal-delay-${i + 1}`
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-3">
                  <Icon size={18} className="text-brand-light" />
                </div>
                <p className="text-white font-semibold text-sm mb-1">{label}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
