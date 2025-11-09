'use client';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Search, ShoppingBag, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/shop', label: 'Shop' },
  { href: '/merch', label: 'Merch' },
];

function Logo() {
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

function NavLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <>
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
    </>
  );
}

function SearchButton() {
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

function AccountMenu() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className="h-9 w-9 p-0 [&>svg.lucide-chevron-down]:hidden"
        aria-label="Account"
      >
        <UserRound className="size-4" />
      </NavigationMenuTrigger>
      <NavigationMenuContent className="right-0 left-auto">
        <ul className="grid w-[200px] gap-2 p-4">
          <li>
            <NavigationMenuLink href="/account">
              <div className="text-sm font-medium leading-none">My Account</div>
              <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                View and manage your account settings
              </p>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="/orders">
              <div className="text-sm font-medium leading-none">Orders</div>
              <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                Track your orders and purchases
              </p>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function CartMenu() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className="h-9 w-9 p-0 [&>svg.lucide-chevron-down]:hidden"
        aria-label="Cart"
      >
        <ShoppingBag className="size-4" />
      </NavigationMenuTrigger>
      <NavigationMenuContent className="right-0 left-auto">
        <ul className="grid w-[300px] gap-4 p-4">
          <li>
            <div className="text-sm font-medium">Your Cart</div>
            <p className="text-muted-foreground text-sm">Coșul tău este gol</p>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export default function NavMenu() {
  return (
    <nav className="sticky top-0 z-50 select-none bg-background w-full">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4">
        <div className="flex items-center gap-1 ml-4">
          <NavigationMenu viewport={false} className="max-w-full">
            <NavigationMenuList>
              <Logo />
              <NavLinks links={LINKS} />
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div />

        <div className="flex items-center gap-1 mr-4">
          <NavigationMenu viewport={false} className="max-w-full">
            <NavigationMenuList>
              <SearchButton />
              <AccountMenu />
              <CartMenu />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}
