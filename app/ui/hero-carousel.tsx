'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const IMAGES = ['/hero/boxes.jpg', '/hero/ice.jpg'] as const;

export default function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  return (
    <Carousel
      className="relative h-full *:data-[slot=carousel-content]:h-full *:data-[slot=carousel-item]:h-full"
      opts={{ loop: true }}
      setApi={setApi}
    >
      <CarouselContent className="ml-0 h-full">
        {IMAGES.map((image, index) => (
          <CarouselItem key={index} className="pl-0 h-full">
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
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-white/10 hover:bg-white/20 border-none text-white backdrop-blur-sm transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-6" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-white/10 hover:bg-white/20 border-none text-white backdrop-blur-sm transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
        aria-label="Next slide"
      >
        <ChevronRight className="size-6" />
      </button>
    </Carousel>
  );
}
