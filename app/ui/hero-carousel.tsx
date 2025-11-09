'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useCallback } from 'react';

const IMAGES = [
  {
    src: '/hero/boxes.jpg',
    width: 3840,
    height: 2400,
  },
  {
    src: '/hero/ice.jpg',
    width: 3024,
    height: 4032,
  },
];

export default function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <Carousel
      className="w-full h-full"
      opts={{
        loop: true,
      }}
      setApi={setApi}
    >
      <CarouselContent className="ml-0 h-full">
        {IMAGES.map((image, index) => (
          <CarouselItem key={index} className="pl-0 h-full">
            <Image
              src={image.src}
              alt={`Hero ${index + 1}`}
              width={image.width}
              height={image.height}
              className="w-full h-full object-cover"
              priority
            />
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
