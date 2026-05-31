'use client';

import { useInView } from '@/hooks/useInView';
import { clsx } from 'clsx';
import { Mail, MessageSquare, MapPin, Clock } from 'lucide-react';

export function Contact() {
  const { ref, inView } = useInView();

  return (
    <section id="contact" ref={ref as React.RefObject<HTMLElement>} className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className={clsx('text-center mb-16 reveal', inView && 'visible')}>
          <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-4">Let's Talk</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Ready to <span className="text-gradient">Work Together?</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Whether you want to hire me, collaborate on a project, or just say hello — my inbox is always open.
          </p>
        </div>

        <div className={clsx('grid lg:grid-cols-2 gap-8 reveal', inView && 'visible reveal-delay-2')}>
          {/* Left: Contact info */}
          <div className="space-y-5">
            {[
              {
                icon: Mail,
                label: 'Email',
                value: 'markmuya@outlook.com',
                href: 'mailto:markmuya@outlook.com',
                desc: 'For inquiries, job opportunities, and collaborations',
              },
              {
                icon: MessageSquare,
                label: 'Live Chat',
                value: 'Chat with my assistant',
                href: '#',
                desc: 'Use the chat bubble (bottom-right) to leave a message',
                onClick: true,
              },
              {
                icon: MapPin,
                label: 'Location',
                value: 'Open to Remote & On-site',
                href: null,
                desc: 'Available worldwide for remote work',
              },
              {
                icon: Clock,
                label: 'Response Time',
                value: 'Within 24 hours',
                href: null,
                desc: 'I read every message and respond promptly',
              },
            ].map(({ icon: Icon, label, value, href, desc, onClick }) => (
              <div key={label} className="glass rounded-2xl p-5 flex items-start gap-4 hover:bg-white/[0.06] transition-all">
                <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-brand-light" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-white font-semibold text-sm hover:text-brand-light transition-colors"
                      onClick={onClick ? (e) => {
                        e.preventDefault();
                        const btn = document.getElementById('chat-trigger');
                        btn?.click();
                      } : undefined}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-white font-semibold text-sm">{value}</p>
                  )}
                  <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: CTA card */}
          <div className="glass rounded-3xl p-8 flex flex-col justify-center">
            <div className="text-5xl mb-6">👋</div>
            <h3 className="text-2xl font-black text-white mb-3">Hire me for your next project</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              I specialize in building modern web and mobile applications with clean code, great UX, and
              AI-powered features. I'm detail-oriented, communicative, and deliver on time.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                'React Native mobile apps (iOS & Android)',
                'Next.js web applications',
                'AI integrations (Claude, OpenAI)',
                'Full-stack PHP/MySQL backends',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-emerald-400">✓</span> {item}
                </li>
              ))}
            </ul>
            <a
              href="mailto:markmuya@outlook.com?subject=I'd like to hire you"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-brand to-violet-600 hover:opacity-90 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-brand/30"
            >
              <Mail size={16} />
              Send Me an Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
