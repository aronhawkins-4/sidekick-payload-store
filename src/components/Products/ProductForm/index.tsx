'use client'
import { Form, useForm } from 'react-hook-form'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Product } from '@/payload-types'
import { useToast } from '../../ui/hooks/use-toast'
import { addToCart } from '@/actions/addToCart'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/providers/Cart'
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
  const { setCartItems } = useCart()
  // const { addItemToCart } = useCart()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>()

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true)
    const quantityNum = Number(data.quantity)

    if (quantityNum > 0) {
      const response = await addToCart(product, quantityNum)
      if (response) {
        const parsedResponse = JSON.parse(response)
        console.log(parsedResponse)
        if (!parsedResponse.ok && parsedResponse.message === 'insufficient-inventory') {
          toast({
            title: 'Insufficient item inventory.',
            description:
              parsedResponse.data.available_inventory > 0
                ? `You can only add ${parsedResponse.data.available_inventory} more ${parsedResponse.data.available_inventory < 2 ? 'unit' : 'units'} of this product to your cart.`
                : 'You cannot add any more units of this product to your cart.',
          })
        } else if (parsedResponse.ok && parsedResponse.message === 'success') {
          toast({
            title: 'Successfully added to cart!',
            description: `Added ${data.quantity} ${product?.title} to your cart.`,
          })
          setCartItems(parsedResponse.data.items)
        } else if (!parsedResponse.ok && parsedResponse.message === 'no-user') {
          toast({
            title: 'You must be logged in to add items to your cart.',
            variant: 'destructive',
          })
        } else {
          toast({
            title: 'Something went wrong.',
            variant: 'destructive',
          })
        }
      }
    }
    setIsSubmitting(false)
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
