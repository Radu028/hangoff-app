import { NavigationMenuLink } from '@/components/ui/navigation-menu';

interface MenuItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}

export function MenuItem({ href, icon, label, description }: MenuItemProps) {
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
}

