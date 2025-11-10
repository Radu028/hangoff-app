'use client';

import { UserRound, Package, LogOut, LogIn, UserPlus } from 'lucide-react';
import { MenuDropdown } from './menu-item';

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
    <MenuDropdown
      trigger={<UserRound className="size-4" />}
      items={menuItems}
      position="right"
      width="260px"
      ariaLabel="Account"
    />
  );
}
