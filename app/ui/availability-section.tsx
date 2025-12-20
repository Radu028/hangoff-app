'use client';

import { type ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

const LOGOS = [
  { src: '/availability/boltfood.svg', alt: 'Bolt Food' },
  { src: '/availability/sezamo.svg', alt: 'sezamo' },
  { src: '/availability/freshful.svg', alt: 'Freshful' },
  { src: '/availability/biutiful.svg', alt: 'Biutiful' },
  {
    src: '/availability/fratelli.svg',
    alt: 'Fratelli',
    className: 'h-12 w-28 md:h-24 md:w-48'
  },
  { src: '/availability/nostalgia.svg', alt: 'Nostalgia' },
];

const Marquee = ({
  children,
  reverse = false,
  speed = 40,
}: {
  children: ReactNode;

  reverse?: boolean;
  speed?: number;
}) => {
  return (
    <div className="flex w-full overflow-hidden select-none">
      <motion.div
        className="flex shrink-0 items-center gap-8 md:gap-16"
        animate={{
          x: reverse ? ['-50%', '0%'] : ['0%', '-50%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};

export default function AvailabilitySection() {
  return (
    <section
      className="bg-white pt-4 pb-4 md:pt-28 md:pb-8"
      aria-labelledby="availability-heading"
      data-availability-section
    >
      <div className="container mx-auto flex flex-col items-center px-4">
        <h2
          id="availability-heading"
          className="mb-8 text-center text-[26px] font-black tracking-tighter text-black uppercase md:mb-10 md:text-[32px]"
        >
          NE GĂSEȘTI ȘI PE
        </h2>

        <div className="relative w-full overflow-hidden">
          {/* Professional Masking gradients */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-6 bg-linear-to-r from-white to-transparent md:w-32" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-6 bg-linear-to-l from-white to-transparent md:w-32" />

          <Marquee speed={40}>
            {LOGOS.map((logo, index) => (
              <div
                key={index}
                className={`flex shrink-0 items-center justify-center ${logo.className || 'h-8 w-28 md:h-16 md:w-48'
                  }`}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={80}
                  className="h-full w-auto object-contain"
                  priority={index < 4}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
