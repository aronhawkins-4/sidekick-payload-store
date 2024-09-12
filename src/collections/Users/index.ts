import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { CartItems, Product } from '@/payload-types'
import { CartItem } from '@/actions/addToCart'
const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      label: 'Cart',
      name: 'cart',
      type: 'group',

      fields: [
        {
          name: 'items',
          label: 'Items',
          type: 'array',
          interfaceName: 'CartItems',
          access: {
            create: authenticated,
            read: authenticated,
            update: authenticated,
          },
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
            },
            {
              name: 'quantity',
              type: 'number',
              min: 0,
              admin: {
                step: 1,
              },
            },
          ],
          // hooks: {
          //   beforeChange: [
          //     async ({ value, previousValue, req: { payload } }) => {
          //       // Log or perform an action when the membership status changes
          //       if (value.length > previousValue.length) {
          //         const addedProduct: CartItems = value.filter((item: CartItem) => {
          //           return !previousValue.includes(item)
          //         })
          //         if (addedProduct) {
          //           console.log('ADDED TO CART')
          //           console.log(addedProduct)
          //           const product = await payload.findByID({
          //             collection: 'products',
          //             id: addedProduct?.at(0)?.product as number,
          //           })
          //           await payload.update({
          //             collection: 'products',
          //             id: addedProduct?.at(0)?.product as number,
          //             data: {
          //               inventory: addedProduct.at(0)
          //                 ? (product?.inventory as number) - addedProduct.at(0)?.quantity!
          //                 : product?.inventory,
          //             },
          //           })
          //         }
          //       } else if (value.length < previousValue.length) {
          //         const removedProduct = previousValue.filter((item: CartItem) => {
          //           return !value.includes(item)
          //         })
          //         if (removedProduct) {
          //           console.log('ADDED TO CART')
          //           console.log(removedProduct)
          //           const product = await payload.findByID({
          //             collection: 'products',
          //             id: removedProduct?.at(0)?.product as number,
          //           })
          //           await payload.update({
          //             collection: 'products',
          //             id: removedProduct?.at(0)?.product as number,
          //             data: {
          //               inventory: removedProduct.at(0)
          //                 ? (product?.inventory as number) + removedProduct.at(0)?.quantity!
          //                 : product?.inventory,
          //             },
          //           })
          //         }
          //       }
          //       console.log('VALUE')
          //       console.log(value)
          //       console.log('PREVIOUS VALUE')
          //       console.log(previousValue)
          //     },
          //   ],
          // },
        },
      ],
    },
  ],
  timestamps: true,
}

export default Users
