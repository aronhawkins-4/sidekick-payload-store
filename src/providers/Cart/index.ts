import { useToast } from '@/components/ui/hooks/use-toast'
import { CartItems, Product } from '@/payload-types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type CartItem = {
  product?: (number | null) | Product
  quantity?: number | null
  id?: string | null
}

interface CartState {
  cartItems: CartItems | undefined
  setCartItems: (cartItems: CartItems) => void
  addItem: (cartItem: CartItem) => void
  removeItem: (productId: number) => void
}

export const useCart = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        cartItems: undefined,
        setCartItems: (cartItems: CartItems) => set((state) => ({ cartItems: cartItems })),
        addItem: (cartItem: CartItem) =>
          set((state) => {
            const existingItem = state.cartItems?.filter((_cartItem) => {
              return (_cartItem.product as Product)?.id === (cartItem.product as Product)?.id
            })
            const updatedCartItems = state.cartItems
              ? existingItem && existingItem[0]
                ? [
                    ...state.cartItems.map((_cartItem) => {
                      if (
                        (_cartItem.product as Product)?.id === (cartItem.product as Product)?.id
                      ) {
                        return {
                          id: _cartItem.id,
                          product: _cartItem.product,
                          quantity: (_cartItem.quantity || 0) + (cartItem.quantity || 0),
                        }
                      }
                      return _cartItem
                    }),
                  ]
                : [...state.cartItems, cartItem]
              : [cartItem]
            return {
              cartItems: updatedCartItems,
            }
          }),
        removeItem: (productId: number) =>
          set((state) => ({
            cartItems: state.cartItems
              ? state.cartItems.filter((_cartItem) => {
                  return (_cartItem.product as Product)?.id !== productId
                })
              : [],
          })),
      }),
      {
        name: 'cart',
      },
    ),
  ),
)
