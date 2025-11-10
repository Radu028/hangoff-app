'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

const IMAGES = ['/hero/boxes.jpg', '/hero/ice.jpg'] as const;
const AUTO_SWIPE_INTERVAL = 5000; // milliseconds

function useCarouselAutoplay(api: CarouselApi | undefined) {
  const [autoSwipeKey, setAutoSwipeKey] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const resetTimer = useCallback(() => {
    setAutoSwipeKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!api || !isVisible) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, AUTO_SWIPE_INTERVAL);

    return () => clearInterval(interval);
  }, [api, autoSwipeKey, isVisible]);

  return resetTimer;
}

function useCarouselNavigation(api: CarouselApi | undefined) {
  const [current, setCurrent] = useState(0);
  const resetTimer = useCarouselAutoplay(api);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    // Reset timer on any manual interaction (drag, swipe, etc.)
    const onPointerDown = () => {
      resetTimer();
    };

    api.on('select', onSelect);
    api.on('pointerDown', onPointerDown);
    onSelect();

    return () => {
      api.off('select', onSelect);
      api.off('pointerDown', onPointerDown);
    };
  }, [api, resetTimer]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
    resetTimer();
  }, [api, resetTimer]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
    resetTimer();
  }, [api, resetTimer]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
      resetTimer();
    },
    [api, resetTimer]
  );

  return { current, scrollPrev, scrollNext, scrollTo };
}

function HeroText() {
  return (
    <div className="absolute inset-0 grid place-items-center pointer-events-none z-10 [@media(max-height:500px)]:hidden">
      <div className="grid grid-cols-1 text-white px-4">
        <p className="text-md md:text-2xl font-bold text-center">
          Shot-uri functionale, ca tu sa functionezi
        </p>
        <p className="text-xs font-medium text-left leading-tight">
          Simte-te bine si dupa petrece. <br />
          Suplimente alimentare, nu medicamente.
        </p>

        <div className="flex-col items-center text-center gap-4">
          <ShieldCheck className="size-10 md:size-12 mx-auto mt-8" />
          <p className="text-[0.6rem] font-extrabold leading-tight mt-1">
            SWISS MADE
          </p>
        </div>
      </div>
    </div>
  );
}

function CarouselSlide({ image, index }: { image: string; index: number }) {
  return (
    <CarouselItem className="pl-0 h-full">
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
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>
    </CarouselItem>
  );
}

function NavigationButton({
  direction,
  onClick,
  isHidden,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  isHidden: boolean;
}) {
  const isPrev = direction === 'prev';
  const Icon = isPrev ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      className={`absolute ${
        isPrev ? 'left-2 md:left-4' : 'right-2 md:right-4'
      } top-1/2 -translate-y-1/2 z-10 size-8 md:size-10 rounded-full bg-white/10 hover:bg-white/20 border-none text-white backdrop-blur-sm flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 transition-opacity duration-300 ${
        isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label={`${isPrev ? 'Previous' : 'Next'} slide`}
    >
      <Icon className="size-4 md:size-6" />
    </button>
  );
}

function NavigationDots({
  count,
  current,
  onSelect,
  onHoverChange,
}: {
  count: number;
  current: number;
  onSelect: (index: number) => void;
  onHoverChange: (isHovered: boolean) => void;
}) {
  return (
    <div
      className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10 flex gap-2 px-3 py-2"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`size-2 rounded-full backdrop-blur-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 cursor-pointer ${
            current === index ? 'bg-white/90' : 'bg-white/30 hover:bg-white/50'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [isDotsHovered, setIsDotsHovered] = useState(false);
  const { current, scrollPrev, scrollNext, scrollTo } =
    useCarouselNavigation(api);

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

      <NavigationButton
        direction="prev"
        onClick={scrollPrev}
        isHidden={isDotsHovered}
      />

      <NavigationButton
        direction="next"
        onClick={scrollNext}
        isHidden={isDotsHovered}
      />

      <NavigationDots
        count={IMAGES.length}
        current={current}
        onSelect={scrollTo}
        onHoverChange={setIsDotsHovered}
      />
    </Carousel>
  );
}
