import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'

import { ProductArchive } from '@/components/Products/ProductArchive'
import { Column, Table } from '@payloadcms/ui'
import { getMeUser } from '@/utilities/getMeUser'
import { Separator } from '@/components/ui/separator'
import { SideCartItem } from '@/components/SideCart/SideCartItem'
import { Product } from '@/payload-types'
import { CartTable } from '@/components/Cart/CartTable'

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

const columnData = [
  {
    accessor: 'title',
    active: true,
    Label: 'Title',
    components: {
      Heading: <h3></h3>,
    },
  },
]

export default async function Page({ params }) {
  const { slug = 'cart' } = await params
  return (
    <div className="max-w-7xl m-auto px-5 md:px-10 py-20 md:py-24 z-10 relative text-white">
      <CartTable />
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
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayloadHMR({ config: configPromise })
  const result = await payload.find({
    collection: 'products',
    draft,
    overrideAccess: true,
  })

  return result.docs || null
})
