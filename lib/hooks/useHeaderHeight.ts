'use client'

import { useEffect, useState } from 'react'

/**
 * Calculates and returns the real height of promo-bar + nav-bar automatically
 * Updates whenever padding/margin/etc changes in the code
 */
export function useHeaderHeight() {
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const updateHeaderHeight = () => {
      const promoBar = document.querySelector('[data-promo-bar]')
      const navBar = document.querySelector('[data-nav-bar]')

      let totalHeight = 0

      if (promoBar) {
        totalHeight += promoBar.getBoundingClientRect().height
      }

      if (navBar) {
        totalHeight += navBar.getBoundingClientRect().height
      }

      setHeight(totalHeight)
      document.documentElement.style.setProperty('--header-height', `${totalHeight}px`)
    }

    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)

    const promoBar = document.querySelector('[data-promo-bar]')
    const navBar = document.querySelector('[data-nav-bar]')

    const resizeObserver = new ResizeObserver(updateHeaderHeight)

    if (promoBar) resizeObserver.observe(promoBar)
    if (navBar) resizeObserver.observe(navBar)

    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
      resizeObserver.disconnect()
    }
  }, [])

  return height
}
