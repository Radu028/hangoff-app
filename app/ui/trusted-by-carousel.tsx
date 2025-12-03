'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

const IMAGES = [
  '/trusted-by/biutiful.svg',
  '/trusted-by/boltfood.svg',
  '/trusted-by/fratelli.svg',
  '/trusted-by/freshful.svg',
  '/trusted-by/nostalgia.svg',
  '/trusted-by/sezamo.svg',
]

const SPEED = 60

function LogoStrip({ keyPrefix }: { keyPrefix: string }) {
  const duplicatedImages = [...IMAGES, ...IMAGES]

  return (
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
          className="flex h-full min-w-[140px] shrink-0 items-center justify-center"
        >
          <Image
            src={image}
            alt={`Logo ${(index % IMAGES.length) + 1}`}
            width={120}
            height={60}
            className="max-h-full object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
          />
        </div>
      ))}
    </motion.div>
  )
}

export default function TrustedByCarousel() {
  return (
    <div className="relative flex w-screen flex-col pt-4 pb-2 md:pt-6">
      <h2 className="mb-1 text-center text-2xl font-bold md:mb-2 md:text-4xl">TRUSTED BY</h2>
      <div className="flex items-center overflow-hidden">
        <div className="flex">
          <LogoStrip keyPrefix="first" />
          <LogoStrip keyPrefix="second" />
        </div>
      </div>
    </div>
  )
}
