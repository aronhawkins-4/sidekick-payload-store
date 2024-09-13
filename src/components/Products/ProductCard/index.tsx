import { Category, Media, Product } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'

import React from 'react'

interface ProductCardProps {
  product: Product
}
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/products/${product.slug}`} className="flex flex-col gap-6">
      <div className="relative aspect-square rounded-md overflow-hidden">
        <Image
          src={(product.featured_image as Media).url || ''}
          fill
          alt={(product.featured_image as Media).alt || ''}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl">{product.title}</h3>
        {product.category && (
          <span className=" uppercase text-sm tracking-widest font-light text-gray-400 ">
            {(product.category as Category).title}
          </span>
        )}
        <div className="flex gap-2 items-center">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
          </span>
          <span className="text-green-500 font-light text-lg">{product.inventory} Available</span>
        </div>
      </div>
    </Link>
  )
}
