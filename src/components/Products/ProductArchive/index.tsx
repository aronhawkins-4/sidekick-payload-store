import React, { cache } from 'react'
import type { Product } from '@/payload-types'
import { ProductCard } from '../ProductCard'

interface ProductArchiveProps {
  products: Product[]
}

export const ProductArchive: React.FC<ProductArchiveProps> = async ({ products }) => {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products &&
        products.map((product) => {
          return <ProductCard product={product} key={product.id} />
        })}
    </div>
  )
}
