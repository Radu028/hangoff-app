import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

const IMAGES = [
  { src: '/hero/boxes.jpg', width: 3840, height: 2400 },
  { src: '/hero/ice.jpg', width: 3024, height: 4032 },
];

export default function HeroCarousel() {
  return (
    <Carousel className="w-full h-full">
      <CarouselContent>
        {IMAGES.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-0">
              <Image
                src={image.src}
                alt={`Hero Carousel ${image.src}`}
                width={image.width}
                height={image.height}
                className="object-cover object-center"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
