'use client'
import { SideCartItem } from '@/components/SideCart/SideCartItem'
import { Separator } from '@/components/ui/separator'
import { Product } from '@/payload-types'
import { useCart, useTotal } from '@/providers/Cart'

export const CartTable = () => {
  const { cartItems } = useCart()
  const total = useTotal()
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {cartItems &&
          cartItems.length > 0 &&
          cartItems.map((item, index) => {
            return (
              <div key={item.id || (item.product as Product).id} className="flex flex-col gap-4">
                <SideCartItem cartItem={item} />
                {index !== cartItems.length - 1 && <Separator />}
              </div>
            )
          })}
      </div>

      <Separator />
      <div className="text-lg font-semibold">
        Total: <span className="text-base font-normal">{total}</span>
      </div>
    </div>
  )
}
