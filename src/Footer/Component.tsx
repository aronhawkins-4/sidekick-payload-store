import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer, Media } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import Image from 'next/image'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer')()

  const navItems = footer?.navItems || []
  const footerLogoId = footer?.logo || undefined
  const payload = await getPayloadHMR({ config: configPromise })
  const footerLogo = await payload.findByID({
    collection: 'media',
    draft: false,
    id: (footerLogoId as number) || '',
  })
  return (
    <footer className="border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        {footerLogo && typeof footerLogo === 'object' && (
          <Link className="flex items-center relative max-w-[12rem]" href="/">
            <Image
              alt={footerLogo?.alt || ''}
              className="w-full h-auto object-contain"
              src={footerLogo?.url || ''}
              width={196}
              height={100}
            />
          </Link>
        )}

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
