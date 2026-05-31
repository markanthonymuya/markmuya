'use client';

import { useInView } from '@/hooks/useInView';
import { clsx } from 'clsx';
import { SKILLS } from '@/lib/data';

const SKILL_ICONS: Record<string, string> = {
  'React Native': '⚛️', 'Expo': '📱', 'iOS': '🍎', 'Android': '🤖',
  'Next.js': '▲', 'React': '⚛️', 'TypeScript': '🔷', 'Tailwind CSS': '🎨',
  'Node.js': '🟢', 'PHP': '🐘', 'REST APIs': '🔌', 'MySQL': '🐬',
  'Claude API': '🧠', 'OpenAI': '✨', 'SQLite': '🗄️', 'Git': '🔀',
};

export function Skills() {
  const { ref, inView } = useInView();

  return (
    <section id="skills" ref={ref as React.RefObject<HTMLElement>} className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className={clsx('text-center mb-16 reveal', inView && 'visible')}>
          <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-4">Expertise</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            My <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Tools and technologies I use to bring ideas to life.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map(({ category, items }, ci) => (
            <div
              key={category}
              className={clsx(
                'glass rounded-2xl p-6 hover:bg-white/[0.06] transition-all reveal',
                inView && 'visible',
                ci > 0 && `reveal-delay-${ci}`
              )}
            >
              <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-5">{category}</p>
              <ul className="space-y-3">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors group"
                  >
                    <span className="text-lg w-7 text-center">{SKILL_ICONS[skill] ?? '🔹'}</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className={clsx('grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 reveal', inView && 'visible reveal-delay-4')}>
          {[
            { value: '2+',    label: 'Apps Launched'     },
            { value: '100%',  label: 'TypeScript'        },
            { value: '∞',     label: 'Coffee Consumed'   },
            { value: '24/7',  label: 'Passion for Code'  },
          ].map(({ value, label }) => (
            <div key={label} className="glass rounded-2xl p-5 text-center">
              <p className="text-3xl font-black text-gradient mb-1">{value}</p>
              <p className="text-xs text-slate-500 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
