import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'
import type { Product } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { ProductHero } from '@/heros/ProductHero'
import { ProductContent } from '@/components/Products/ProductContent'

// export async function generateStaticParams() {
//   const payload = await getPayloadHMR({ config: configPromise })
//   const products = await payload.find({
//     collection: 'products',
//     draft: false,
//     limit: 1000,
//     overrideAccess: false,
//   })

//   return products.docs?.map(({ slug }) => slug)
// }

export default async function Product({ params: { slug = '' } }) {
  const url = '/products/' + slug
  const product = await queryProductBySlug({ slug })

  if (!product) return <PayloadRedirects url={url} />

  return (
    <div className="">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />
      <ProductHero product={product} />
      <ProductContent product={product} />
    </div>
  )
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = await queryProductBySlug({ slug })

  return generateMeta({ doc: product })
}

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
