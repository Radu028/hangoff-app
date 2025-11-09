'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

function ArrowButton({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) {
  const Icon =
    direction === 'left' ? (
      <ChevronLeft className="size-4" />
    ) : (
      <ChevronRight className="size-4" />
    );

  return (
    <button
      aria-label={`${direction} promo`}
      onClick={onClick}
      className="text-white px-8 bg-transparent hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 cursor-pointer"
    >
      {Icon}
    </button>
  );
}

function PromoMessage({ text, keyId }: { text: string; keyId: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={keyId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="whitespace-nowrap"
      >
        {text}
      </motion.p>
    </AnimatePresence>
  );
}

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
        <ArrowButton direction="left" onClick={() => cycleIndex(-1)} />

        <div className="text-center text-xs text-white overflow-hidden col-start-2">
          <PromoMessage text={MESSAGES[index]} keyId={index} />
        </div>

        <ArrowButton direction="right" onClick={() => cycleIndex(1)} />
      </div>
    </div>
  );
}
