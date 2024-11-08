import type { Block } from 'payload'
import { CallToAction } from '../CallToAction/config'
import { ColumnsBlock } from '../ColumnsBlock/config'
import { MediaBlock } from '../MediaBlock/config'
import { Archive } from '../ArchiveBlock/config'
import { FormBlock } from '../Form/config'

const validateHexColor = (value: string = ''): true | string => {
  return (
    value.match(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/) !== null ||
    `Please give a valid hex color`
  )
}

export const ContainerBlock: Block = {
  slug: 'container',
  interfaceName: 'ContainerBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'blocks',
              type: 'blocks',
              blocks: [CallToAction, ColumnsBlock, MediaBlock, Archive, FormBlock],
              // required: true,
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'backgroundColor',
              type: 'text',
              label: 'Background Color',
              // validate: validateHexColor,
              admin: {
                components: {
                  afterInput: ['@/fields/ColorPicker/Component.client#ColorPickerSwatches'],
                },
              },
            },
          ],
          label: 'Style',
        },
      ],
    },
  ],
}
