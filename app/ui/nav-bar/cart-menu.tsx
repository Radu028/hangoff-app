'use client';

import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export function CartMenu() {
  const cartItems: CartItem[] = [];
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
            <EmptyCart />
          ) : (
            <CartWithItems items={cartItems} />
          )}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function EmptyCart() {
  return (
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
  );
}

function CartWithItems({ items }: { items: CartItem[] }) {
  return (
    <>
      <ul className="space-y-3 mb-4">
        {items.map((item) => (
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
  );
}

