'use client'

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

interface SimpleLinkProps {
  href: string
  label: string
}

interface DetailedLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  description: string
}

interface MenuItemProps {
  href: string
  icon?: React.ReactNode
  label: string
  description?: string
  variant?: 'simple' | 'detailed'
}

interface MenuDropdownProps {
  trigger: React.ReactNode
  items: (SimpleLinkProps | DetailedLinkProps)[]
  position?: 'left' | 'right'
  width?: string
  ariaLabel?: string
}

export function MenuItem({ href, icon, label, description, variant = 'simple' }: MenuItemProps) {
  if (variant === 'simple' || (!icon && !description)) {
    return (
      <li>
        <NavigationMenuLink
          href={href}
          className="hover:bg-accent block rounded-md p-3 transition-colors"
        >
          <div className="text-sm font-medium">{label}</div>
        </NavigationMenuLink>
      </li>
    )
  }

  return (
    <li>
      <NavigationMenuLink
        href={href}
        className="hover:bg-accent flex items-center gap-2 rounded-md p-2 transition-colors md:gap-3 md:p-3"
      >
        {icon}
        <div>
          <h3 className="text-sm leading-none font-medium">{label}</h3>
          {description && (
            <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs leading-snug md:mt-1 md:text-sm">
              {description}
            </p>
          )}
        </div>
      </NavigationMenuLink>
    </li>
  )
}

export function MenuDropdown({
  trigger,
  items,
  position = 'right',
  width = '260px',
  ariaLabel,
}: MenuDropdownProps) {
  const positionClasses = position === 'left' ? 'left-0 right-auto' : 'right-0 left-auto'

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className="h-9 w-9 p-0 [&>svg.lucide-chevron-down]:hidden"
        aria-label={ariaLabel}
      >
        {trigger}
      </NavigationMenuTrigger>
      <NavigationMenuContent
        className={`absolute ${positionClasses} z-50 overflow-visible md:w-[280px]`}
        style={{ width }}
      >
        <ul className="grid gap-1 p-1">
          {items.map((item) => {
            const hasDetails = 'icon' in item && 'description' in item
            return (
              <MenuItem
                key={item.href}
                href={item.href}
                icon={hasDetails ? item.icon : undefined}
                label={item.label}
                description={hasDetails ? item.description : undefined}
                variant={hasDetails ? 'detailed' : 'simple'}
              />
            )
          })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}
