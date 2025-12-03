'use client'

import { ShoppingBag } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export function CartMenu() {
  const cartItems: CartItem[] = []
  const isEmpty = cartItems.length === 0

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className="h-9 w-9 p-0 [&>svg.lucide-chevron-down]:hidden"
        aria-label="Cart"
      >
        <ShoppingBag className="size-4" />
      </NavigationMenuTrigger>
      <NavigationMenuContent className="absolute right-0 left-auto z-50 w-[280px] overflow-visible md:w-[350px]">
        <div className="p-2 md:p-4">
          <div className="mb-4">
            <h3 className="text-base font-semibold md:text-lg">Shopping Cart</h3>
            <p className="text-muted-foreground text-xs md:text-sm">
              {isEmpty ? 'Your cart is empty' : `${cartItems.length} items in cart`}
            </p>
          </div>

          {isEmpty ? <EmptyCart /> : <CartWithItems items={cartItems} />}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

function EmptyCart() {
  return (
    <div className="pt-8 text-center">
      <ShoppingBag className="text-muted-foreground/50 mx-auto mb-3 size-10 md:mb-4 md:size-12" />
      <p className="text-muted-foreground mb-3 text-xs md:mb-4 md:text-sm">Your cart is empty</p>
      <NavigationMenuLink href="/shop" className="w-full">
        <Button className="w-full text-sm md:text-base">Continue Shopping</Button>
      </NavigationMenuLink>
    </div>
  )
}

function CartWithItems({ items }: { items: CartItem[] }) {
  return (
    <>
      <ul className="mb-4 space-y-3">
        {items.map((item) => (
          <li key={item.id} className="hover:bg-accent flex gap-3 rounded-md p-2">
            <div className="bg-muted size-16 rounded-md" />
            <div className="flex-1">
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-muted-foreground text-xs">Qty: {item.quantity}</div>
              <div className="text-sm font-semibold">${item.price}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-semibold">$0.00</span>
        </div>
        <NavigationMenuLink href="/cart" className="w-full">
          <Button className="w-full">View Cart & Checkout</Button>
        </NavigationMenuLink>
      </div>
    </>
  )
}
