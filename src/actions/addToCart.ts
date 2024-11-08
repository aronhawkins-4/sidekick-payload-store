'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { CartItems, Product } from '@/payload-types'
import { getMeUser } from '@/utilities/getMeUser'
import { revalidatePath } from 'next/cache'

export const addToCart = async (
  product: Product,
  quantity: number,
  cartItems: CartItems | undefined,
) => {
  try {
    const { user } = await getMeUser()
    let updatedCartItems: CartItems | undefined = []
    if (cartItems) {
      cartItems.map((cartItem) => {
        if ((cartItem.product as Product)?.id === product?.id) {
          updatedCartItems?.push({ ...cartItem, quantity: (cartItem?.quantity || 0) + quantity })
        } else {
          updatedCartItems?.push({ product: product, quantity: quantity })
        }
      })
    }
    if (!user) {
      console.log(updatedCartItems)
      return {
        ok: false,
        message: 'No user',
        data:
          updatedCartItems && updatedCartItems.length > 0
            ? [...updatedCartItems]
            : [{ product, quantity }],
      }
    }
    const payloadCartItems = user?.cart?.items ? user.cart.items : []
    let updatedQuantity = 0
    const existingItem = payloadCartItems.filter((item) => {
      return (item.product as Product).id === product.id
    })
    if (existingItem && existingItem.length > 0) {
      if ((existingItem.at(0)?.quantity || 0) + quantity > (product?.inventory || 0)) {
        return {
          ok: false,
          message: 'Insufficient inventory',
          data: {
            available_inventory: (product?.inventory || 0) - (existingItem.at(0)?.quantity || 0),
          },
        }
      }
      updatedQuantity = (existingItem.at(0)?.quantity || 0) + quantity
    }
    const payload = await getPayloadHMR({ config: configPromise })

    const updatedUser = await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        cart: {
          items:
            existingItem && existingItem.length > 0
              ? [
                  ...payloadCartItems.map((item) => {
                    const formattedItem = {
                      id: item.id,
                      product: (item?.product as Product).id,
                      quantity: item.id === existingItem[0].id ? updatedQuantity : item.quantity,
                    }
                    return formattedItem
                  }),
                ]
              : [
                  ...payloadCartItems.map((item) => {
                    const formattedItem = {
                      id: item.id,
                      product: (item?.product as Product).id,
                      quantity: item.quantity,
                    }
                    return formattedItem
                  }),
                  { product: product.id, quantity },
                ],
        },
      },
    })
    if (updatedUser) {
      // revalidatePath('/', 'layout')
      return { ok: true, message: 'success', data: updatedUser.cart }
    }
  } catch (error: any) {
    console.log(error)
    return { ok: false, message: error.message, data: null }
  }
}
