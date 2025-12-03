'use client'

import { LogIn, LogOut, Package, UserPlus, UserRound } from 'lucide-react'

import { MenuDropdown } from './menu-item'

interface AccountMenuProps {
  authenticated: boolean
}

const AUTHENTICATED_ITEMS = [
  {
    href: '/orders',
    icon: <Package className="text-muted-foreground size-4 md:size-5" />,
    label: 'Orders',
    description: 'Track your orders and purchases',
  },
  {
    href: '/signout',
    icon: <LogOut className="text-muted-foreground size-4 md:size-5" />,
    label: 'Sign Out',
    description: 'Log out of your account',
  },
]

const UNAUTHENTICATED_ITEMS = [
  {
    href: '/signup',
    icon: <UserPlus className="text-muted-foreground size-4 md:size-5" />,
    label: 'Sign Up',
    description: 'Create a new account',
  },
  {
    href: '/login',
    icon: <LogIn className="text-muted-foreground size-4 md:size-5" />,
    label: 'Log In',
    description: 'Sign in to your account',
  },
]

export function AccountMenu({ authenticated }: AccountMenuProps) {
  const menuItems = authenticated ? AUTHENTICATED_ITEMS : UNAUTHENTICATED_ITEMS

  return (
    <MenuDropdown
      trigger={<UserRound className="size-4" />}
      items={menuItems}
      position="right"
      width="260px"
      ariaLabel="Account"
    />
  )
}
