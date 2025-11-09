'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

const IMAGES = ['/hero/boxes.jpg', '/hero/ice.jpg'] as const;

function HeroText() {
  return (
    <div className="absolute inset-0 grid place-items-center pointer-events-none z-10">
      <div className="grid grid-cols-1 text-white px-4">
        <p className="text-4xl md:text-2xl font-bold text-center">
          Shot-uri functionale, ca tu sa functionezi
        </p>
        <p className="text-xs font-medium text-left leading-tight">
          Simte-te bine si dupa petrece. <br />
          Suplimente alimentare, nu medicamente.
        </p>

        <div className="flex-col items-center text-center gap-4">
          <ShieldCheck className="size-12 mx-auto mt-8" />
          <p className="text-[0.6rem] font-extrabold leading-tight mt-1">
            SWISS MADE
          </p>
        </div>
      </div>
    </div>
  );
}

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

              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <HeroText />

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
