import { cn } from 'src/utilities/cn'
import React, { Fragment } from 'react'
import RichText from '@/components/RichText'

import type { Page, ContainerBlock as ContainerBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { ArchiveBlock } from '../ArchiveBlock/Component'
import { ColumnsBlock } from '../ColumnsBlock/Component'
import { CallToActionBlock } from '../CallToAction/Component'
import { FormBlock } from '../Form/config'
import { MediaBlock } from '../MediaBlock/config'

const blockComponents = {
  archive: ArchiveBlock,
  columnsBlock: ColumnsBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
}
export const ContainerBlock: React.FC<{
  blocks: ContainerBlockProps['blocks']
  backgroundColor: string
}> = (props) => {
  const { backgroundColor, blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <div style={{ backgroundColor: backgroundColor || '' }}>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error */}
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </div>
    )
  }
  return <div style={{ backgroundColor: backgroundColor || '' }} className="p-4"></div>
}
