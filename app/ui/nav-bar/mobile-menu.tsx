'use client';

import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Menu } from 'lucide-react';

interface MobileMenuProps {
  links: { href: string; label: string }[];
}

export function MobileMenu({ links }: MobileMenuProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className="h-9 w-9 p-0 [&>svg.lucide-chevron-down]:hidden"
        aria-label="Menu"
      >
        <Menu className="size-4" />
      </NavigationMenuTrigger>
      <NavigationMenuContent className="absolute left-0 right-auto w-[200px] z-50 overflow-visible">
        <ul className="grid gap-1 p-1">
          {links.map((link) => (
            <li key={link.href}>
              <NavigationMenuLink
                href={link.href}
                className="block p-3 rounded-md hover:bg-accent transition-colors"
              >
                <div className="text-sm font-medium">{link.label}</div>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
