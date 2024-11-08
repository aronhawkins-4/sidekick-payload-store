'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Product } from '@/payload-types'
import { getMeUser } from '@/utilities/getMeUser'
import { revalidatePath } from 'next/cache'

export const removeFromCart = async (cartItemProductId: number) => {
  try {
    const { user } = await getMeUser()
    if (!user) {
      return { ok: false, message: 'No user', data: null }
    }
    const cartItems = user?.cart?.items ? user.cart.items : []
    console.log(cartItemProductId)
    console.log(cartItems)
    const existingItem = cartItems.filter((item) => {
      console.log(item)
      return (item?.product as Product)?.id === cartItemProductId
    })
    if (!existingItem) {
      return { ok: false, message: 'Item not found', data: null }
    }
    const payload = await getPayloadHMR({ config: configPromise })

    const updatedUser = await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        cart: {
          items: [
            ...cartItems
              .filter((item) => {
                return (item?.product as Product)?.id !== cartItemProductId
              })
              .map((item) => {
                const formattedItem = {
                  id: item.id,
                  product: (item?.product as Product).id,
                  quantity: item.quantity,
                }
                return formattedItem
              }),
          ],
        },
      },
    })
    if (updatedUser) {
      // revalidatePath('/', 'layout')
      return { ok: true, message: 'success', data: updatedUser.cart?.items }
    }
  } catch (error: any) {
    console.log(error)
    return { ok: false, message: error.message, data: null }
  }
}
