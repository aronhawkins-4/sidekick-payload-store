import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'
import type { Product } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { ProductHero } from '@/heros/ProductHero'
import { ProductContent } from '@/components/Products/ProductContent'
import { notFound } from 'next/navigation'
import { ProductCard } from '@/components/Products/ProductCard'
import { ProductArchive } from '@/components/Products/ProductArchive'
import { CategoryHero } from '@/heros/CategoryHero'

// export async function generateStaticParams() {
//   const payload = await getPayloadHMR({ config: configPromise })
//   const categories = await payload.find({
//     collection: 'categories',
//     draft: false,
//     limit: 1000,
//     overrideAccess: false,
//   })

//   return categories.docs?.map(({ slug }) => slug)
// }

export default async function Category({ params: { slug } }) {
  const products = await queryProductsByCategory({ slug })
  const category = await queryCategoryBySlug({ slug })
  if (!products || products.length === 0) {
    notFound()
  }
  if (!category) {
    notFound()
  }

  return (
    <>
      <CategoryHero category={category} />
      <div className="bg-[#1d1d1d]">
        <div className=" max-w-7xl m-auto px-5 md:px-10 py-20 md:py-24 z-10 relative text-white ">
          <ProductArchive products={products} />
        </div>
      </div>
    </>
  )
}

// export async function generateMetadata({
//   params: { slug },
// }: {
//   params: { slug: string }
// }): Promise<Metadata> {
//   const product = await queryProductsByCategory({ slug })

//   return generateMeta({ doc: product })
// }

const queryProductsByCategory = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft,
    overrideAccess: true,
    where: {
      'category.slug': {
        equals: slug,
      },
    },
  })

  return result.docs || null
})

const queryCategoryBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'categories',
    draft,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs[0] || null
})
