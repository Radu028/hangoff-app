import AvailabilitySection from './ui/availability-section'
import HeroCarousel from './ui/hero-carousel'

export default function Home() {
  return (
    <section className="flex h-full flex-1 flex-col overflow-hidden">
      <div className="relative min-h-0 flex-1">
        <HeroCarousel />
      </div>
      <AvailabilitySection />
    </section>
  )
}
