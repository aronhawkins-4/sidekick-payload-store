import { CartItems, Category, Media, Product } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'

import React, { useEffect, useState } from 'react'
import { addToCart } from '@/actions/addToCart'
import { Trash2 } from 'lucide-react'
import { removeFromCart } from '@/actions/removeFromCart'
import { useToast } from '@/components/ui/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { CartItem } from '@/providers/Cart'

interface SideCartItemProps {
  cartItem: CartItem
  cartItems: CartItems
  setCartItems: (cartItems: CartItems) => void
  removeItem: (productId: number) => void
}

type SideCartItemFormData = {
  cartItemProductID: string
}

export const SideCartItem: React.FC<SideCartItemProps> = ({
  cartItem,
  cartItems,
  setCartItems,
  removeItem,
}) => {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SideCartItemFormData>()

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      const cartItemProductId = data.cartItemProductID

      if (cartItemProductId) {
        removeItem(Number(cartItemProductId))
        toast({
          title: 'Removed from cart!',
          description: `Removed ${product?.title} from your cart.`,
        })
        // const response = await removeFromCart(cartItemProductId)
        // if (response) {
        //   const parsedResponse = JSON.parse(response)
        //   console.log(parsedResponse)
        //   if (parsedResponse.ok && parsedResponse.message === 'success' && parsedResponse.data) {
        //     switch (parsedResponse.message) {
        //       case 'no-user':
        //       case 'success':
        //         toast({
        //           title: 'Removed from cart!',
        //           description: `Removed ${product?.title} from your cart.`,
        //         })
        //         const updatedCartItems = cartItems?.filter((cartItem) => {
        //           return (cartItem.product as Product)?.id !== product.id
        //         })
        //         setCartItems(updatedCartItems || [])
        //         break
        //     }
        //   } else {
        //     toast({
        //       title: 'Something went wrong.',
        //       variant: 'destructive',
        //     })
        //   }
        // }
      }
      setIsSubmitting(false)
    } catch (error: any) {
      console.log(error)
      toast({
        title: 'Something went wrong.',
        variant: 'destructive',
      })
    }
  })

  useEffect(() => {
    console.log(product)
  }, [])

  if (!cartItem.product) {
    return
  }
  const product = cartItem.product as Product
  return (
    <div className="flex gap-6 items-center">
      <div className="relative aspect-square rounded-md overflow-hidden w-16">
        <Image
          src={(product.featured_image as Media)?.url || ''}
          fill
          alt={(product.featured_image as Media)?.alt || ''}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-base">{product.title}</h3>
        </Link>
        {product.category && (
          <span className="text-sm font-light text-gray-400 ">Quantity: {cartItem.quantity}</span>
        )}
      </div>
      <form onSubmit={onSubmit} className="justify-self-end ml-auto">
        <input
          type="hidden"
          {...register('cartItemProductID')}
          value={(cartItem.product as Product)?.id || undefined}
        />
        <button type="submit">
          <Trash2 size={16} />
        </button>
      </form>
    </div>
  )
}
