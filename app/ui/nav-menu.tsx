'use client';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Image from 'next/image';
import Link from 'next/link';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/shop', label: 'Shop' },
  { href: '/merch', label: 'Merch' },
];

export default function NavMenu() {
  return (
    <nav className="sticky top-0 z-50 select-none bg-background">
      <div className="container ml-4 px-4 py-4">
        <div className="flex items-center gap-2">
          <Link href="/" aria-label="Home">
            <Image
              src="/logo.svg"
              alt="Hangoff Logo"
              width={800}
              height={160}
              priority
              className="h-6 w-auto"
            />
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
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
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}
