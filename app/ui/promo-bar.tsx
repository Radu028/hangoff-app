'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MESSAGES = [
  'FREE SHIPPING ON ORDERS OVER $100',
  '20% OFF YOUR FIRST ORDER',
  '10% OFF YOUR FIRST ORDER',
  '5% OFF YOUR FIRST ORDER',
  '2% OFF YOUR FIRST ORDER',
  '1% OFF YOUR FIRST ORDER',
  '0% OFF YOUR FIRST ORDER',
];
const INTERVAL = 5000;

export default function PromoBar() {
  const [index, setIndex] = useState(0);

  const cycleIndex = (offset: number) => {
    setIndex((i) => (i + offset + MESSAGES.length) % MESSAGES.length);
  };

  useEffect(() => {
    if (!MESSAGES.length) return;
    const id = setInterval(() => {
      cycleIndex(1);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [MESSAGES, INTERVAL]);

  return (
    <div className="w-full border-b bg-[#f36c21]">
      <div className="grid grid-cols-[auto_1fr_auto] items-center py-2">
        <button
          aria-label="Previous promo"
          onClick={() => cycleIndex(-1)}
          className="text-white px-4 bg-transparent hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 ml-2 cursor-pointer"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="text-center text-xs text-white overflow-hidden col-start-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="whitespace-nowrap"
            >
              {MESSAGES[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          aria-label="Next promo"
          onClick={() => cycleIndex(1)}
          className="text-white px-4 bg-transparent hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 mr-2 cursor-pointer"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
