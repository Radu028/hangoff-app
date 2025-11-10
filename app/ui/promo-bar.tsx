'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
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

function usePromoCycle(length: number, interval: number = 5000) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    if (!length) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, interval);
  }, [clearTimer, length, interval]);

  const cycleMessage = useCallback(
    (offset: number) => {
      setIndex((i) => (i + offset + length) % length);
      startTimer();
    },
    [length, startTimer]
  );

  useEffect(() => {
    setIndex((i) => (length ? i % length : 0));
    startTimer();
    return clearTimer;
  }, [length, interval, startTimer, clearTimer]);

  return { index, cycleMessage };
}

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
  const { index, cycleMessage } = usePromoCycle(MESSAGES.length, INTERVAL);

  return (
    <div className="w-full border-b bg-primary" data-promo-bar>
      <div className="grid grid-cols-[auto_1fr_auto] items-center py-2">
        <ArrowButton direction="left" onClick={() => cycleMessage(-1)} />

        <div className="text-center text-xs text-white overflow-hidden col-start-2">
          <PromoMessage text={MESSAGES[index]} keyId={index} />
        </div>

        <ArrowButton direction="right" onClick={() => cycleMessage(1)} />
      </div>
    </div>
  );
}
