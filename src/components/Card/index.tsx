'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Product, Media as MediaType, Category } from '@/payload-types'

import { Media } from '@/components/Media'

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: Product
  relationTo?: 'products'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, meta, title, category, featured_image, inventory } = doc || {}
  console.log(doc)
  const { description, image: metaImage } = meta || {}
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article className={cn('overflow-hidden hover:cursor-pointer', className)} ref={card.ref}>
      <div className="relative w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            resource={featured_image as MediaType}
            size="360px"
            fill
            imgClassName="object-cover"
            className="w-full pb-[100%]"
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="p-4">
          {titleToUse && (
            <div className="prose">
              <h3>
                <Link className="not-prose" href={href} ref={link.ref}>
                  {titleToUse}
                </Link>
              </h3>
            </div>
          )}
          {category && (
            <span className=" uppercase text-sm tracking-widest font-light text-muted-foreground">
              {(category as Category).title}
            </span>
          )}
          <div className="flex gap-2 items-center">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-alt opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success-alt"></span>
            </span>
            <span className="text-success-alt font-light text-lg">{inventory} Available</span>
          </div>
        </div>
      </div>
    </article>
  )
}
