'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'

const IMAGES = ['/hero/boxes.jpg', '/hero/ice.jpg'] as const
const AUTO_SWIPE_INTERVAL = 5000 // milliseconds

function useCarouselAutoplay(api: CarouselApi | undefined) {
  const [autoSwipeKey, setAutoSwipeKey] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const resetTimer = useCallback(() => {
    setAutoSwipeKey((prev) => prev + 1)
  }, [])

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    if (!api || !isVisible) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, AUTO_SWIPE_INTERVAL)

    return () => clearInterval(interval)
  }, [api, autoSwipeKey, isVisible])

  return resetTimer
}

function useCarouselNavigation(api: CarouselApi | undefined) {
  const [current, setCurrent] = useState(0)
  const resetTimer = useCarouselAutoplay(api)

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    // Reset timer on any manual interaction (drag, swipe, etc.)
    const onPointerDown = () => {
      resetTimer()
    }

    api.on('select', onSelect)
    api.on('pointerDown', onPointerDown)
    onSelect()

    return () => {
      api.off('select', onSelect)
      api.off('pointerDown', onPointerDown)
    }
  }, [api, resetTimer])

  const scrollPrev = useCallback(() => {
    api?.scrollPrev()
    resetTimer()
  }, [api, resetTimer])

  const scrollNext = useCallback(() => {
    api?.scrollNext()
    resetTimer()
  }, [api, resetTimer])

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index)
      resetTimer()
    },
    [api, resetTimer],
  )

  return { current, scrollPrev, scrollNext, scrollTo }
}

function HeroText() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center [@media(max-height:500px)]:hidden">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="flex -translate-y-6 flex-col items-center px-6 text-center text-white sm:translate-y-0"
      >
        <h1 className="text-3xl leading-[1.1] font-bold tracking-tight sm:text-4xl md:text-6xl lg:text-7xl">
          Shot-uri funcționale, <br />
          <span className="text-primary-foreground/90">ca tu să funcționezi</span>
        </h1>
        <p className="mt-4 max-w-md px-4 text-xs leading-relaxed font-light text-white/80 sm:px-0 sm:text-sm md:text-lg">
          Simte-te bine și după petrecere. Suplimente alimentare elvețiene premium, create pentru
          performanță zilnică.
        </p>

        <div className="mt-8 flex flex-col items-center gap-2 md:mt-12">
          <div className="rounded-full border border-white/10 bg-white/5 p-2 ring-1 ring-white/20 backdrop-blur-xl md:p-3">
            <ShieldCheck className="size-6 md:size-10" />
          </div>
          <p className="text-[0.6rem] font-bold tracking-[0.3em] uppercase opacity-80 md:text-[0.7rem]">
            Swiss Made
          </p>
        </div>
      </motion.div>
    </div>
  )
}

function CarouselSlide({ image, index }: { image: string; index: number }) {
  return (
    <CarouselItem className="h-full pl-0">
      <div className="relative h-full">
        <Image
          src={image}
          alt={`Hero ${index + 1}`}
          fill
          priority={index === 0}
          style={{
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-black/20" />
      </div>
    </CarouselItem>
  )
}

function NavigationButton({
  direction,
  onClick,
  isHidden,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  isHidden: boolean
}) {
  const isPrev = direction === 'prev'
  const Icon = isPrev ? ChevronLeft : ChevronRight

  return (
    <button
      onClick={onClick}
      className={cn(
        'absolute top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full border-none bg-white/5 text-white/40 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 md:size-10',
        isPrev ? 'left-2 md:left-4' : 'right-2 md:right-4',
        isHidden ? 'pointer-events-none opacity-0' : 'opacity-100',
      )}
      aria-label={`${isPrev ? 'Previous' : 'Next'} slide`}
    >
      <Icon className="size-4 md:size-6" />
    </button>
  )
}

function NavigationDots({
  count,
  current,
  onSelect,
  onHoverChange,
}: {
  count: number
  current: number
  onSelect: (index: number) => void
  onHoverChange: (isHovered: boolean) => void
}) {
  return (
    <div
      className="absolute bottom-1 left-1/2 z-10 flex -translate-x-1/2 gap-2 px-3 py-2"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`size-2 cursor-pointer rounded-full backdrop-blur-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 ${
            current === index ? 'bg-white/90' : 'bg-white/30 hover:bg-white/50'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}

export default function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [isDotsHovered, setIsDotsHovered] = useState(false)
  const { current, scrollPrev, scrollNext, scrollTo } = useCarouselNavigation(api)

  return (
    <Carousel
      className="relative h-full *:data-[slot=carousel-content]:h-full *:data-[slot=carousel-item]:h-full"
      opts={{ loop: true }}
      setApi={setApi}
    >
      <CarouselContent className="ml-0 h-full">
        {IMAGES.map((image, index) => (
          <CarouselSlide key={index} image={image} index={index} />
        ))}
      </CarouselContent>

      <HeroText />

      <NavigationButton direction="prev" onClick={scrollPrev} isHidden={isDotsHovered} />

      <NavigationButton direction="next" onClick={scrollNext} isHidden={isDotsHovered} />

      <NavigationDots
        count={IMAGES.length}
        current={current}
        onSelect={scrollTo}
        onHoverChange={setIsDotsHovered}
      />
    </Carousel>
  )
}
