import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post, Product, Category } from '@/payload-types'

import { Media } from '@/components/Media'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const { category, meta: { image: metaImage } = {}, publishedAt, title } = product
  return (
    // <div className="relative flex items-end py-20 px-5 sm:px-10">
    <div>
      <div className="max-w-7xl m-auto px-5 md:px-10 py-20 md:py-24 z-10 relative text-white">
        <div className="">
          <div className=" flex flex-col gap-4">
            {category && typeof category === 'object' && (
              <div className="text-sm">
                <Breadcrumb>
                  <BreadcrumbList className="sm:gap-1 gap-1 text-lg font-light">
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href={`/products/${category.title.toLowerCase()}`}>
                        {category.title}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
