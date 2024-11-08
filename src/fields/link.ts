import type { Field } from 'payload'
import { icons } from 'lucide-react'
import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances = 'default' | 'outline' | 'link'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
  link: {
    label: 'Link',
    value: 'link',
  },
}
type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Record<string, unknown>
  enumName?: string
}) => Field

export const link: LinkType = ({
  appearances,
  disableLabel = false,
  overrides = {},
  enumName,
} = {}) => {
  const linkResult: Field = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        name: 'label',
        type: 'text',
        admin: {
          width: '50%',
        },
        label: 'Label',
      },
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },

          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
        width: '100%',
      },
      label: 'Document to link to',
      maxDepth: 1,
      relationTo: ['pages'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
        width: '100%',
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
      },
    }))
    linkResult.fields.push({
      type: 'row',
      fields: [...linkTypes],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.outline,
      appearanceOptions.link,
    ]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }
    enumName
      ? linkResult.fields.push({
          name: 'appearance',
          type: 'select',
          enumName: enumName,
          admin: {
            description: 'Choose how the link should be rendered.',
          },
          defaultValue: 'default',
          options: appearanceOptionsToUse,
        })
      : linkResult.fields.push({
          name: 'appearance',
          type: 'select',
          admin: {
            description: 'Choose how the link should be rendered.',
          },
          defaultValue: 'default',
          options: appearanceOptionsToUse,
        })
  }

  return deepMerge(linkResult, overrides)
}
