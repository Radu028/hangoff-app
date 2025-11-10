'use client';

import { useEffect, useState } from 'react';

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
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Initial check - using matchMedia for better performance
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    // Set initial value
    setIsMobile(mediaQuery.matches);

    // Handler for media query changes
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Use modern addEventListener API (Safari 14+, all modern browsers)
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [breakpoint]);

  return isMobile;
}
