'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'

import { Page } from '@/payload-types'
import { Gutter } from '@payloadcms/ui'
import { Blocks } from 'lucide-react'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export const PagePreview: React.FC<{ page: Page | null | undefined }> = ({ page }) => {
  const { data } = useLivePreview({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    depth: 2,
    initialData: page,
  })

  return (
    <main>
      <Gutter>
        <h1 className="text-red-400">{data?.title}</h1>
        {data?.layout && <RenderBlocks blocks={data?.layout} />}
      </Gutter>
    </main>
  )
}
