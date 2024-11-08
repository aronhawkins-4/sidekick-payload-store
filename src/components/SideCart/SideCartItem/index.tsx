'use client'
import { CartItems, Category, Media, Product } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'

import React, { useState } from 'react'

import { Trash2 } from 'lucide-react'
import { removeFromCart } from '@/actions/removeFromCart'
import { useToast } from '@/components/ui/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { CartItem, useCart } from '@/providers/Cart'
import { useAuth } from '@/providers/Auth'

interface SideCartItemProps {
  cartItem: CartItem
}

type SideCartItemFormData = {
  cartItemID: string
  cartItemProductID: string
}

export const SideCartItem: React.FC<SideCartItemProps> = ({ cartItem }) => {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { removeItem, addItem } = useCart()
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SideCartItemFormData>()

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      const cartItemProductId = data.cartItemProductID
      const cartItemId = data.cartItemID

      if (cartItemProductId) {
        removeItem(Number(cartItemProductId))
        if (user) {
          removeFromCart(Number(cartItemProductId)).then((res) => {
            console.log(res)
            if (!res?.ok) {
              addItem(cartItem)
              toast({
                title: 'Error removing to cart!',
                description: `${res?.message}`,
                variant: 'destructive',
              })
            }
          })
        }
        toast({
          title: 'Removed from cart!',
          description: `Removed ${product?.title} from your cart.`,
        })
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
        <input type="hidden" {...register('cartItemID')} value={cartItem?.id || undefined} />
        <button type="submit">
          <Trash2 size={16} />
        </button>
      </form>
    </div>
  )
}
