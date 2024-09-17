'use client'
import { CartItems, Product } from '@/payload-types'
import { ShoppingBag, ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import payload from 'payload'
import { useAuth } from '@/providers/Auth'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import { ProductCard } from '../Products/ProductCard'
import { ScrollArea } from '../ui/scroll-area'
import { SideCartItem } from './SideCartItem'
import { Separator } from '../ui/separator'
import { useCart } from '@/providers/Cart'

interface SideCartProps {
  initialItems: CartItems | undefined
}

export const SideCart: React.FC<SideCartProps> = ({ initialItems }) => {
  const { user } = useAuth()
  const { cartItems, setCartItems, removeItem } = useCart()

  useEffect(() => {
    if (initialItems) {
      setCartItems(initialItems)
    }
    console.log(cartItems)
  }, [initialItems])

  return (
    <>
      <Sheet>
        <SheetTrigger className="fixed bottom-8 right-8 p-4 rounded-full bg-[#dc3f35] z-50">
          <ShoppingBag size={32} />
          {cartItems && cartItems.length > 0 && (
            <span className="absolute top-0 right-0 translate-x-2 -translate-y-2 text-xs bg-white text-black w-6 h-6 rounded-full aspect-square leading-none flex items-center justify-center">
              {cartItems?.reduce((total, currentItem) => {
                return (total += currentItem.quantity || 0)
              }, 0)}
            </span>
          )}
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-8">
          <SheetTitle className="text-2xl">Cart</SheetTitle>
          <Separator />
          <ScrollArea className="w-full h-96 mt-8 ">
            <div className="flex flex-col gap-4">
              {cartItems &&
                cartItems.length > 0 &&
                cartItems.map((item, index) => {
                  return (
                    <div
                      key={item.id || (item.product as Product).id}
                      className="flex flex-col gap-4"
                    >
                      <SideCartItem
                        cartItem={item}
                        cartItems={cartItems || []}
                        setCartItems={setCartItems}
                        removeItem={removeItem}
                      />
                      {index !== cartItems.length - 1 && <Separator />}
                    </div>
                  )
                })}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}
