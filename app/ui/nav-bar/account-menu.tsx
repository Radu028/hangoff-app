'use client';

import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import { UserRound, Package, LogOut, LogIn, UserPlus } from 'lucide-react';
import { MenuItem } from './menu-item';

interface AccountMenuProps {
  authenticated: boolean;
}

const AUTHENTICATED_ITEMS = [
  {
    href: '/orders',
    icon: <Package className="size-4 md:size-5 text-muted-foreground" />,
    label: 'Orders',
    description: 'Track your orders and purchases',
  },
  {
    href: '/signout',
    icon: <LogOut className="size-4 md:size-5 text-muted-foreground" />,
    label: 'Sign Out',
    description: 'Log out of your account',
  },
];

const UNAUTHENTICATED_ITEMS = [
  {
    href: '/signup',
    icon: <UserPlus className="size-4 md:size-5 text-muted-foreground" />,
    label: 'Sign Up',
    description: 'Create a new account',
  },
  {
    href: '/login',
    icon: <LogIn className="size-4 md:size-5 text-muted-foreground" />,
    label: 'Log In',
    description: 'Sign in to your account',
  },
];

export function AccountMenu({ authenticated }: AccountMenuProps) {
  const menuItems = authenticated ? AUTHENTICATED_ITEMS : UNAUTHENTICATED_ITEMS;

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className="h-9 w-9 p-0 [&>svg.lucide-chevron-down]:hidden"
        aria-label="Account"
      >
        <UserRound className="size-4" />
      </NavigationMenuTrigger>
      <NavigationMenuContent className="absolute right-0 left-auto w-[260px] z-50 overflow-visible md:w-[280px]">
        <ul className="grid gap-2 p-1">
          {menuItems.map((item) => (
            <MenuItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              description={item.description}
            />
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
