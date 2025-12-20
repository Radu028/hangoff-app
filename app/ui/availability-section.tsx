'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Separator } from '@/components/ui/separator'

const LOGOS = [
    { src: '/availability/boltfood.svg', alt: 'Bolt Food' },
    { src: '/availability/sezamo.svg', alt: 'sezamo' },
    { src: '/availability/freshful.svg', alt: 'Freshful' },
    { src: '/availability/biutiful.svg', alt: 'Biutiful' },
    { src: '/availability/fratelli.svg', alt: 'Fratelli' },
    { src: '/availability/nostalgia.svg', alt: 'Nostalgia' },
]

const Marquee = ({ children, reverse = false, speed = 40 }: { children: React.ReactNode; reverse?: boolean; speed?: number }) => {
    return (
        <div className="flex w-full overflow-hidden select-none">
            <motion.div
                className="flex shrink-0 items-center justify-around gap-12 md:gap-24 pr-12 md:pr-24 min-w-full"
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
    )
}

export default function AvailabilitySection() {
    return (
        <section
            className="bg-white py-10 md:py-16"
            aria-labelledby="availability-heading"
            data-availability-section
        >
            <div className="container mx-auto px-4 flex flex-col items-center">
                <h2
                    id="availability-heading"
                    className="mb-8 text-center text-xl font-black tracking-tighter text-black md:mb-12 md:text-2xl uppercase"
                >
                    NE GĂSEȘTI ȘI PE
                </h2>

                <div className="relative w-full overflow-hidden">
                    {/* Professional Masking gradients */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

                    <Marquee speed={30}>
                        {LOGOS.map((logo, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center h-8 md:h-10 w-32 md:w-44 shrink-0 transition-transform duration-300 hover:scale-110"
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={150}
                                    height={50}
                                    className="h-full w-auto object-contain"
                                    priority={index < 4}
                                />
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>

            {/* Shadcn UI element for professional look */}
            <div className="container mx-auto px-4 mt-12 md:mt-16">
                <Separator className="bg-black/5" />
            </div>
        </section>
    )
}
