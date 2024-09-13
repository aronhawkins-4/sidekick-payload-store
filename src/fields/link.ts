import type { Field } from 'payload'
import { icons } from 'lucide-react'
import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances = 'default' | 'outline'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
}
type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Record<string, unknown>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
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
        // required: true,
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

  // const displayTypes: Field[] = [
  //   {
  //     name: 'label',
  //     type: 'text',
  //     admin: {
  //       width: '50%',
  //       condition: (data, siblingData) => {
  //         console.log(siblingData)
  //         return siblingData?.display === 'text'
  //       },
  //     },
  //     label: 'Label',
  //     // required: true,
  //   },
  //   {
  //     name: 'icon',
  //     type: 'select',
  //     options: iconNames.map((iconName) => {
  //       return { value: iconName.toLowerCase(), label: iconName }
  //     }),

  //     admin: {
  //       width: '50%',
  //       condition: (data, siblingData) => {
  //         console.log(siblingData)
  //         return siblingData?.display === 'icon'
  //       },
  //     },
  //     label: 'Icon',
  //     // required: true,
  //   },
  //   // IconField(),
  // ]

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
    // const display: Field = {
    //   name: 'display',
    //   type: 'radio',
    //   admin: {
    //     layout: 'horizontal',
    //     width: '50%',
    //   },
    //   defaultValue: 'text',
    //   options: [
    //     {
    //       label: 'Text',
    //       value: 'text',
    //     },
    //     {
    //       label: 'Icon',
    //       value: 'icon',
    //     },
    //   ],
    // }
    // linkResult.fields.push({
    //   type: 'row',
    //   fields: [display, ...displayTypes],
    // })
  } else {
    // linkResult.fields = [...linkResult.fields, ...linkTypes, display, ...displayTypes]
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
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
