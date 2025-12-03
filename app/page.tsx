'use client'

import { useHeaderHeight } from '@/lib/hooks/useHeaderHeight'

import HeroCarousel from './ui/hero-carousel'
import TrustedByCarousel from './ui/trusted-by-carousel'

export default function Home() {
  const headerHeight = useHeaderHeight()

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

        <TrustedByCarousel />
      </section>
    </main>
  )
}
