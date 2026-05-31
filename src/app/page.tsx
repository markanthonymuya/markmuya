import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Apps } from '@/components/sections/Apps';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Apps />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
