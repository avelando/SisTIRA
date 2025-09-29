import { Header } from '@/components/ui/Header';
import { Hero } from '@/components/ui/Hero';
import { Features } from '@/components/ui/Features';
import { About } from '@/components/ui/About';
import { Footer } from '@/components/ui/Footer';
import styles from '@/styles/Index.module.css';

export default function Landing() {
  return (
    <div className={styles.body}>
      <Header />
      <Hero />
      <Features />
      <About />
      <Footer />
    </div>
  );
}
