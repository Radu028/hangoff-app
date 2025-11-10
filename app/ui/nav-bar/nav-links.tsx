'use client';

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/lib/hooks/useIsMobile';
import { MenuDropdown } from './menu-item';
import { LINKS } from './constants';

interface NavLinksProps {
  className?: string;
}

export function NavLinks({ className }: NavLinksProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MenuDropdown
        trigger={<Menu className="size-4" />}
        items={LINKS}
        position="left"
        width="200px"
        ariaLabel="Menu"
      />
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {LINKS.map((link) => (
        <NavigationMenuItem key={link.href}>
          <NavigationMenuLink
            href={link.href}
            className={navigationMenuTriggerStyle()}
          >
            {link.label}
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </div>
  );
}
