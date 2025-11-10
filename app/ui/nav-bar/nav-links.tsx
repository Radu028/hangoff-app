'use client';

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MenuDropdown } from './menu-item';
import { LINKS } from './constants';

export function NavLinks({ className }: { className?: string }) {
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

export function MobileNavLinks() {
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
