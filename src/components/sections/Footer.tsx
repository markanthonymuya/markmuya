import { Github, Mail, Linkedin, TrendingUp } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand to-violet-500 flex items-center justify-center">
            <TrendingUp size={13} className="text-white" />
          </div>
          <span className="text-sm font-bold text-white">Mark Muya</span>
        </div>
        <p className="text-sm text-slate-600">© {year} Mark Muya. All rights reserved.</p>
        <div className="flex items-center gap-3">
          {[
            { icon: Mail,     href: 'mailto:markmuya@outlook.com' },
            { icon: Github,   href: 'https://github.com/markanthonymuya/' },
            { icon: Linkedin, href: 'https://linkedin.com/in/markmuya' },
          ].map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="w-8 h-8 glass rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-all hover:border-white/15"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
