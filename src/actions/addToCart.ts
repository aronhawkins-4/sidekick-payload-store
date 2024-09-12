'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Product } from '@/payload-types'
import { getMeUser } from '@/utilities/getMeUser'

export type CartItem = {
  product?: (number | null) | Product
  quantity?: number | null
  id?: string | null
}

export const addToCart = async (product: Product, quantity: number) => {
  try {
    const { user } = await getMeUser()
    if (!user) {
      return JSON.stringify({ ok: false, message: 'no-user', data: null })
    }
    const cartItems = user?.cart?.items ? user.cart.items : []
    console.log(cartItems)
    const existingItem = cartItems.filter((item) => {
      console.log(item)
      return (item.product as Product).id === product.id
    })
    if (existingItem && existingItem.length > 0) {
      return JSON.stringify({ ok: true, message: 'item-exists', data: null })
    }
    const payload = await getPayloadHMR({ config: configPromise })

    const updatedUser = await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        cart: {
          items: [
            ...cartItems.map((item) => {
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
      return JSON.stringify({ ok: true, message: 'success', data: updatedUser.cart })
    }
  } catch (error: any) {
    console.log(error)
    return JSON.stringify({ ok: false, message: error.message, data: null })
  }
}
