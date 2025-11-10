'use client';

import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useState } from 'react';
import { Logo, NavLinks, SearchButton } from './nav-elements';
import { AccountMenu } from './account-menu';
import { CartMenu } from './cart-menu';
import { LINKS } from './constants';

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
