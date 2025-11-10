'use client';

import TrustedByCarousel from './ui/trusted-by-carousel';
import HeroCarousel from './ui/hero-carousel';
import { useHeaderHeight } from '@/lib/hooks/useHeaderHeight';

export default function Home() {
  const headerHeight = useHeaderHeight();

  return (
    <main>
      <section
        className="grid grid-rows-[1fr_auto]"
        style={{
          height: `calc(100dvh - ${headerHeight}px)`,
          // Fallback for older browsers
          minHeight: `calc(100vh - ${headerHeight}px)`,
        }}
      >
        <HeroCarousel />

        <div className="relative w-screen flex flex-col pt-6 pb-2">
          <h2 className="text-4xl font-bold mb-2 text-center">TRUSTED BY</h2>
          <div className="flex items-center overflow-hidden">
            <TrustedByCarousel />
          </div>
        </div>
      </section>
    </main>
  );
}
