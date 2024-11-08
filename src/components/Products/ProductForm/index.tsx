'use client'
import { Form, useForm } from 'react-hook-form'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { CartItems, Product } from '@/payload-types'
import { useToast } from '../../ui/hooks/use-toast'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/providers/Cart'
import { useAuth } from '@/providers/Auth'
import { addToCart } from '@/actions/addToCart'

// import { useCart } from '@/providers/Cart'

interface ProductFormProps {
  product: Product
}

type ProductFormData = {
  quantity: string
}
export const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { cartItems, setCartItems, addItem, removeItem } = useCart()
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>()

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      const quantityNum = Number(data.quantity)
      if (quantityNum > 0) {
        const existingItem = cartItems?.filter((item) => {
          return (item.product as Product).id === product?.id
        })
        if (
          existingItem &&
          existingItem.at(0) &&
          (existingItem.at(0)?.quantity || 0) + (quantityNum || 0) > (product?.inventory || 0)
        ) {
          const availableInventory = (product.inventory || 0) - (existingItem.at(0)?.quantity || 0)
          toast({
            title: 'Insufficient item inventory.',
            description:
              availableInventory > 0
                ? `You can only add ${availableInventory} more ${availableInventory < 2 ? 'unit' : 'units'} of this product to your cart.`
                : 'You cannot add any more units of this product to your cart.',
          })
        } else {
          addItem({ product: product, quantity: quantityNum })
          if (user) {
            addToCart(product, quantityNum, undefined).then((res) => {
              console.log(res)
              if (!res?.ok) {
                removeItem(product.id)
                toast({
                  title: 'Error adding to cart!',
                  description: `${res?.message}`,
                  variant: 'destructive',
                })
              }
            })
          }
          toast({
            title: 'Successfully added to cart!',
            description: `Added ${data.quantity} ${product?.title} to your cart.`,
          })
        }
      }
      // const response = await addToCart(product, quantityNum, cartItems)
      // if (response) {
      // const parsedResponse = JSON.parse(response)
      // console.log(parsedResponse)
      // if (parsedResponse.ok) {
      //   switch (parsedResponse.message) {
      //     case 'insufficient-inventory':
      //       toast({
      //         title: 'Insufficient item inventory.',
      //         description:
      //           parsedResponse.data.available_inventory > 0
      //             ? `You can only add ${parsedResponse.data.available_inventory} more ${parsedResponse.data.available_inventory < 2 ? 'unit' : 'units'} of this product to your cart.`
      //             : 'You cannot add any more units of this product to your cart.',
      //       })
      //       break
      //     case 'no-user':
      //       toast({
      //         title: 'Successfully added to cart!',
      //         description: `Added ${data.quantity} ${product?.title} to your cart.`,
      //       })
      //       setCartItems(parsedResponse.data)
      //       break
      //     case 'success':
      //       toast({
      //         title: 'Successfully added to cart!',
      //         description: `Added ${data.quantity} ${product?.title} to your cart.`,
      //       })
      //       setCartItems(parsedResponse.data)
      //       break
      //   }

      // if (cartItems) {
      //   const existingProduct = cartItems?.filter((item) => {
      //     return (item.product as Product).id === product.id
      //   })
      // if (existingProduct) {
      //   setCartItems([
      //     ...cartItems.map((cartItem) => {
      //       if (cartItem?.product?.id === product.id) {
      //         return {
      //           product: cartItem?.product?.id,
      //           quantity: cartItem?.quantity || 0 + quantityNum,
      //           id: cartItem.id,
      //         }
      //       } else {
      //         return cartItem
      //       }
      //     }),
      //   ])
      // } else {

      // }
      // }
      // } else {
      //   toast({
      //     title: 'Something went wrong.',
      //     variant: 'destructive',
      //   })
      // }
      // }

      setIsSubmitting(false)
    } catch (error: any) {
      console.log(error)
      toast({
        title: 'Something went wrong.',
        variant: 'destructive',
      })
      setIsSubmitting(false)
    }
  })

  if (!product) {
    return
  }
  return (
    <form className="flex flex-col gap-2 items-stretch w-full sm:w-64" onSubmit={onSubmit}>
      <Input
        placeholder="Quantity"
        type="number"
        className="px-4 py-2 h-auto placeholder:text-gray-400"
        {...register('quantity')}
        max={product?.inventory || 0}
        min={0}
      />
      <Button
        type="submit"
        className="bg-[#dc3f35] text-white font-medium text-normal text-base tracking-wider hover:bg-white hover:text-black"
      >
        {!isSubmitting ? 'Add to Cart' : 'Adding...'}
      </Button>
    </form>
  )
}
