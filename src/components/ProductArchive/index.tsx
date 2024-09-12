import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'
import type { Category, Media, Product } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { ProductHero } from '@/heros/ProductHero'
import { ProductContent } from '@/components/ProductContent'
import Link from 'next/link'
import Image from 'next/image'

interface ProductArchiveProps {
  products: Product[]
}

export const ProductArchive: React.FC<ProductArchiveProps> = async ({ products }) => {
  return (
    <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products &&
        products.map((product) => {
          return (
            <Link
              href={`/products/${product.slug}`}
              key={product.id}
              className="flex flex-col gap-10"
            >
              <div className="relative aspect-square rounded-md overflow-hidden">
                <Image
                  src={(product.featured_image as Media).url || ''}
                  fill
                  alt={(product.featured_image as Media).alt || ''}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h3>{product.title}</h3>
                {product.category && <span>{(product.category as Category).title}</span>}
              </div>
            </Link>
          )
        })}
    </div>
  )
}
