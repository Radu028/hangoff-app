'use client';

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo() {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink href="/">
        <Image
          src="/logo.svg"
          alt="Hangoff Logo"
          width={800}
          height={160}
          priority
          className="h-6 w-auto"
        />
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

export function NavLinks({
  links,
  className,
}: {
  links: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {links.map((link) => (
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

export function SearchButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Search"
      className="ml-auto"
      onClick={() => {
        // momentan nimic
      }}
    >
      <Search className="size-4" />
    </Button>
  );
}
