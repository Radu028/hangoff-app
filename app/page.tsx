import HeroCarousel from './ui/hero-carousel'
import AvailabilitySection from './ui/availability-section'

export default function Home() {
  return (
    <section className="flex flex-1 flex-col overflow-hidden h-full">
      <div className="relative flex-1 min-h-0">
        <HeroCarousel />
      </div>
      <AvailabilitySection />
    </section>
  )
}
