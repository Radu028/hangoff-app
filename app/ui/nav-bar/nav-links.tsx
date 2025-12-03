'use client'

import { Menu } from 'lucide-react'

import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { cn } from '@/lib/utils'
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import { LINKS } from './constants'
import { MenuDropdown } from './menu-item'

interface NavLinksProps {
  className?: string
}

export function NavLinks({ className }: NavLinksProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <MenuDropdown
        trigger={<Menu className="size-4" />}
        items={LINKS}
        position="left"
        width="200px"
        ariaLabel="Menu"
      />
    )
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {LINKS.map((link) => (
        <NavigationMenuItem key={link.href}>
          <NavigationMenuLink href={link.href} className={navigationMenuTriggerStyle()}>
            {link.label}
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </div>
  )
}
