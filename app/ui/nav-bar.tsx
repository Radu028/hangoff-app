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
import {
  Search,
  ShoppingBag,
  UserRound,
  Package,
  LogOut,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';

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

function NavLinks({
  links,
  className,
}: {
  links: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={cn('hidden md:flex items-center gap-2', className)}>
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

function AccountMenu({ authenticated }: { authenticated: boolean }) {
  const elementInAccountMenu = (
    href: string,
    icon: React.ReactNode,
    label: string,
    description: string
  ) => {
    return (
      <li>
        <NavigationMenuLink
          href={href}
          className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-md hover:bg-accent transition-colors"
        >
          {icon}
          <div>
            <h3 className="text-sm font-medium leading-none">{label}</h3>
            <p className="text-muted-foreground line-clamp-2 text-xs md:text-sm leading-snug mt-0.5 md:mt-1">
              {description}
            </p>
          </div>
        </NavigationMenuLink>
      </li>
    );
  };

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className="h-9 w-9 p-0 [&>svg.lucide-chevron-down]:hidden"
        aria-label="Account"
      >
        <UserRound className="size-4" />
      </NavigationMenuTrigger>
      <NavigationMenuContent className="[&]:absolute [&]:right-0 [&]:left-auto [&]:w-[260px] [&]:z-50 [&]:overflow-visible md:[&]:w-[280px]">
        <ul className="grid gap-1.5 p-1.5 md:gap-2 md:p-1">
          {authenticated ? (
            <>
              <li>
                <NavigationMenuLink
                  href="/orders"
                  className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-md hover:bg-accent transition-colors"
                >
                  <Package className="size-4 md:size-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium leading-none">
                      Orders
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-xs md:text-sm leading-snug mt-0.5 md:mt-1">
                      Track your orders and purchases
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink
                  href="/signout"
                  className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-md hover:bg-accent transition-colors"
                >
                  <LogOut className="size-4 md:size-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium leading-none">
                      Sign Out
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-xs md:text-sm leading-snug mt-0.5 md:mt-1">
                      Log out of your account
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavigationMenuLink
                  href="/signup"
                  className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-md hover:bg-accent transition-colors"
                >
                  <UserPlus className="size-4 md:size-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium leading-none">
                      Sign Up
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-xs md:text-sm leading-snug mt-0.5 md:mt-1">
                      Create a new account
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink
                  href="/login"
                  className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-md hover:bg-accent transition-colors"
                >
                  <LogIn className="size-4 md:size-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium leading-none">
                      Log In
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-xs md:text-sm leading-snug mt-0.5 md:mt-1">
                      Sign in to your account
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
            </>
          )}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function CartMenu() {
  const cartItems: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }> = [];
  const isEmpty = cartItems.length === 0;

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className="h-9 w-9 p-0 [&>svg.lucide-chevron-down]:hidden"
        aria-label="Cart"
      >
        <ShoppingBag className="size-4" />
      </NavigationMenuTrigger>
      <NavigationMenuContent className="[&]:absolute [&]:right-0 [&]:left-auto [&]:w-[280px] [&]:z-50 [&]:overflow-visible md:[&]:w-[350px]">
        <div className="p-3 md:p-4">
          <div className="mb-3 md:mb-4">
            <h3 className="text-base md:text-lg font-semibold">
              Shopping Cart
            </h3>
            <p className="text-muted-foreground text-xs md:text-sm">
              {isEmpty
                ? 'Your cart is empty'
                : `${cartItems.length} items in cart`}
            </p>
          </div>

          {isEmpty ? (
            <div className="py-6 md:py-8 text-center">
              <ShoppingBag className="size-10 md:size-12 mx-auto mb-3 md:mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">
                Your cart is empty
              </p>
              <NavigationMenuLink href="/shop" className="w-full">
                <Button className="w-full text-sm md:text-base">
                  Continue Shopping
                </Button>
              </NavigationMenuLink>
            </div>
          ) : (
            <>
              <ul className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3 p-2 rounded-md hover:bg-accent"
                  >
                    <div className="size-16 bg-muted rounded-md" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </div>
                      <div className="text-sm font-semibold">${item.price}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <NavigationMenuLink href="/cart" className="w-full">
                  <Button className="w-full">View Cart & Checkout</Button>
                </NavigationMenuLink>
              </div>
            </>
          )}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export default function NavBar() {
  const [isAuthenticated] = useState(false);

  return (
    <nav className="sticky top-0 z-50 select-none bg-background w-full">
      <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-2 px-2 py-3 md:py-4">
        <div className="flex items-center md:hidden">
          <SearchButton />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex md:items-center md:gap-1 md:ml-4">
          <NavigationMenu viewport={false} className="max-w-full">
            <NavigationMenuList>
              <Logo />
              <NavLinks links={LINKS} className="ml-4" />
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="md:col-start-2" />

        <div className="flex items-center gap-1 sm:mr-4 ml-auto md:col-start-3">
          <NavigationMenu viewport={false} className="max-w-full">
            <NavigationMenuList>
              <div className="hidden md:block">
                <SearchButton />
              </div>
              <AccountMenu authenticated={isAuthenticated} />
              <CartMenu />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}
