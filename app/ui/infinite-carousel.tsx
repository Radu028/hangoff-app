'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

const IMAGES = [
  '/trusted-by/biutiful.svg',
  '/trusted-by/boltfood.svg',
  '/trusted-by/fratelli.svg',
  '/trusted-by/freshful.svg',
  '/trusted-by/nostalgia.svg',
  '/trusted-by/sezamo.svg',
];

const SPEED = 60;

export default function InfiniteCarousel() {
  const duplicatedImages = [...IMAGES, ...IMAGES];

  const LogoStrip = ({ keyPrefix }: { keyPrefix: string }) => (
    <motion.div
      className="flex gap-8 pr-8"
      animate={{
        x: [0, '-100%'],
      }}
      transition={{
        x: {
          duration: SPEED,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        },
      }}
    >
      {duplicatedImages.map((image, index) => (
        <div
          key={`${keyPrefix}-${index}`}
          className="shrink-0 flex items-center justify-center min-w-[140px] h-full"
        >
          <Image
            src={image}
            alt={`Logo ${(index % IMAGES.length) + 1}`}
            width={120}
            height={60}
            className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 max-h-full"
          />
        </div>
      ))}
    </motion.div>
  );

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center">
      <div className="flex">
        <LogoStrip keyPrefix="first" />
        <LogoStrip keyPrefix="second" />
      </div>
    </div>
  );
}
