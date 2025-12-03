'use client'

import { useSyncExternalStore } from 'react'

/**
 * Custom hook to detect if the viewport width is below a specified breakpoint.
 *
 * @param breakpoint - The width threshold in pixels (default: 768px for md breakpoint)
 * @returns boolean indicating if the viewport is below the breakpoint
 *
 * @example
 * ```tsx
 * const isMobile = useIsMobile(); // Uses default 768px breakpoint
 * const isSmall = useIsMobile(640); // Custom breakpoint
 * ```
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
      mediaQuery.addEventListener('change', callback)
      return () => mediaQuery.removeEventListener('change', callback)
    },
    () => window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches,
    () => false,
  )
}
