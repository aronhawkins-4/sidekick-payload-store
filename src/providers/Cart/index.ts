import { CartItems } from '@/payload-types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface CartState {
  cartItems: CartItems
  setCartItems: (cartItems: CartItems) => void
}

export const useCart = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        cartItems: null,
        setCartItems: (cartItems) => set(() => ({ cartItems: cartItems })),
      }),
      {
        name: 'cart_state',
      },
    ),
  ),
)
