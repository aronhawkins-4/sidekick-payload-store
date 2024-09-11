import { Form, useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Product } from '@/payload-types'
import { useToast } from '../ui/hooks/use-toast'

interface ProductFormProps {
  product: Product | undefined | null
}

type ProductFormData = {
  quantity: number
}
export const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>()

  const onSubmit = handleSubmit((data) => {
    console.log(data.quantity)
    if (data.quantity > 0) {
      toast({
        title: 'Successfully added to cart!',
        description: `Added ${data.quantity} ${product?.title} to your cart.`,
      })
    }
  })
  return (
    <form className="flex flex-col gap-2 items-stretch w-64" onSubmit={onSubmit}>
      <Input
        placeholder="Quantity"
        type="number"
        className="px-4 py-2 h-auto"
        {...register('quantity')}
        max={product?.inventory || 0}
        min={0}
      />
      <Button
        type="submit"
        className="bg-[#dc3f35] text-white font-medium text-normal text-base tracking-wider hover:bg-white hover:text-black"
      >
        Add to Cart
      </Button>
    </form>
  )
}
