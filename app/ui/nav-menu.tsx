import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Image from 'next/image';
import Link from 'next/link';

export default function NavMenu() {
  return (
    <nav className="sticky top-0 z-50 select-none">
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
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className={navigationMenuTriggerStyle()}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/about"
                  className={navigationMenuTriggerStyle()}
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/shop"
                  className={navigationMenuTriggerStyle()}
                >
                  Shop
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/merch"
                  className={navigationMenuTriggerStyle()}
                >
                  Merch
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}
