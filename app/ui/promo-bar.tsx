'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

const MESSAGES = [
  'FREE SHIPPING ON ORDERS OVER $100',
  '20% OFF YOUR FIRST ORDER',
  '10% OFF YOUR FIRST ORDER',
  '5% OFF YOUR FIRST ORDER',
  '2% OFF YOUR FIRST ORDER',
  '1% OFF YOUR FIRST ORDER',
  '0% OFF YOUR FIRST ORDER',
]
const INTERVAL = 5000

function usePromoCycle(length: number, interval: number = 5000) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    clearTimer()
    if (!length) return
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % length)
    }, interval)
  }, [clearTimer, length, interval])

  const cycleMessage = useCallback(
    (offset: number) => {
      setIndex((i) => (i + offset + length) % length)
      startTimer()
    },
    [length, startTimer],
  )

  useEffect(() => {
    startTimer()
    return clearTimer
  }, [startTimer, clearTimer])

  return { index, cycleMessage }
}

function ArrowButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  const Icon =
    direction === 'left' ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />

  return (
    <button
      aria-label={`${direction} promo`}
      onClick={onClick}
      className="cursor-pointer bg-transparent px-4 text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 md:px-8"
    >
      {Icon}
    </button>
  )
}

function PromoMessage({ text, keyId }: { text: string; keyId: number }) {
  return (
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
  )
}

export default function PromoBar() {
  const { index, cycleMessage } = usePromoCycle(MESSAGES.length, INTERVAL)

  return (
    <div className="bg-primary w-full border-b" data-promo-bar>
      <div className="grid grid-cols-[auto_1fr_auto] items-center py-2">
        <ArrowButton direction="left" onClick={() => cycleMessage(-1)} />

        <div className="col-start-2 overflow-hidden text-center text-xs text-white">
          <AnimatePresence mode="wait">
            <PromoMessage text={MESSAGES[index]} keyId={index} />
          </AnimatePresence>
        </div>

        <ArrowButton direction="right" onClick={() => cycleMessage(1)} />
      </div>
    </div>
  )
}
