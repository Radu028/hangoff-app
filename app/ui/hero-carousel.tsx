'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react'

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
      <div className="grid grid-cols-1 px-4 text-white">
        <p className="text-md text-center font-bold md:text-2xl">
          Shot-uri functionale, ca tu sa functionezi
        </p>
        <p className="text-left text-xs leading-tight font-medium">
          Simte-te bine si dupa petrece. <br />
          Suplimente alimentare, nu medicamente.
        </p>

        <div className="flex-col items-center gap-4 text-center">
          <ShieldCheck className="mx-auto mt-8 size-10 md:size-12" />
          <p className="mt-1 text-[0.6rem] leading-tight font-extrabold">SWISS MADE</p>
        </div>
      </div>
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
      className={`absolute ${
        isPrev ? 'left-2 md:left-4' : 'right-2 md:right-4'
      } top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border-none bg-white/10 text-white backdrop-blur-sm transition-opacity duration-300 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 md:size-10 ${
        isHidden ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
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
