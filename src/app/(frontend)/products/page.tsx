import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'

import { ProductArchive } from '@/components/Products/ProductArchive'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return products.docs?.map(({ slug }) => slug)
}

export default async function Page({ params: { slug = '' } }) {
  //   const url = '/products/'
  const products = await queryProducts()
  //   if (!product) return <PayloadRedirects url={url} />

  return (
    <div className="max-w-7xl m-auto px-5 md:px-10 py-20 md:py-24 z-10 relative text-white">
      {/* Allows redirects for valid pages too */}
      {/* <PayloadRedirects disableNotFound url={url} /> */}
      <ProductArchive products={products} />
    </div>
  )
}

// export async function generateMetadata({
//   params: { slug },
// }: {
//   params: { slug: string }
// }): Promise<Metadata> {
//   const product = await queryProductBySlug({ slug })

//   return generateMeta({ doc: product })
// }

const queryProducts = cache(async () => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })
  const result = await payload.find({
    collection: 'products',
    draft,
    overrideAccess: true,
  })

  return result.docs || null
})
