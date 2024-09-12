'use client'
import Image from 'next/image'
import { Product, Media } from '@/payload-types'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Form, useForm } from 'react-hook-form'
import { ProductForm } from '../ProductForm'
import { Separator } from '../ui/separator'
import { useEffect, useState } from 'react'
import { useAuth } from '@/providers/Auth'

export const ProductContent: React.FC<{ product: Product }> = ({ product }) => {
  const featuredImage = product.featured_image as Media
  const { user } = useAuth()

  const [activeImage, setActiveImage] = useState<Media>(featuredImage)

  return (
    <div className="px-5 md:px-10 py-20 md:py-24 z-10 relative text-white bg-[#1d1d1d]">
      <div className="max-w-7xl m-auto flex flex-col gap-16 sm:flex-row">
        <div className="w-full flex flex-col-reverse sm:flex-row gap-2">
          <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-40 max-w-full overflow-scroll">
            <button
              className="w-full h-auto aspect-square rounded-lg relative overflow-hidden"
              onClick={() => {
                setActiveImage(featuredImage)
              }}
            >
              <Image
                src={featuredImage?.url || ''}
                alt={featuredImage?.alt || ''}
                fill
                className="object-cover"
              />
            </button>
            {product.image_gallery &&
              product.image_gallery.map((imageObj) => {
                const image = imageObj as Media
                return (
                  <button
                    key={image?.id}
                    className="w-full h-auto aspect-square rounded-lg relative overflow-hidden"
                    onClick={() => {
                      setActiveImage(image)
                    }}
                  >
                    <Image
                      src={image?.url || ''}
                      alt={image?.alt || ''}
                      fill
                      className="object-cover"
                    />
                  </button>
                )
              })}
          </div>
          <div className="w-full">
            <Image
              src={activeImage?.url || ''}
              alt={activeImage?.alt || ''}
              width={activeImage?.width || 500}
              height={activeImage?.height || 500}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-10">
          <div className="flex gap-2 items-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
            </span>
            <span className="text-green-500 font-light text-lg">{product.inventory} Available</span>
          </div>
          <ProductForm product={product} />
          <Separator className="h-[2px]" />
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold">Rental Rate</h3>
            <div className="flex flex-col gap-2 px-4">
              <h4 className="font-semibold text-lg text-gray-400">Daily</h4>
              <span className="font-semibold text-xl">${product.price}</span>
            </div>
          </div>
          <Separator className="h-[2px]" />
        </div>
      </div>
    </div>
  )
}
