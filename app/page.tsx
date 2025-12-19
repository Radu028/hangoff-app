import HeroCarousel from './ui/hero-carousel'
import TrustedByCarousel from './ui/trusted-by-carousel'

export default function Home() {
  return (
    <section className="flex flex-1 flex-col overflow-hidden h-full">
      <div className="relative flex-1 min-h-0">
        <HeroCarousel />
      </div>
      <div className="bg-background border-t">
        <TrustedByCarousel />
      </div>
    </section>
  )
}
