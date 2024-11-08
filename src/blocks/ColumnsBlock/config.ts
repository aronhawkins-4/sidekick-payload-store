import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { fields } from '../Form/fields'

const validateHexColor = (value: string = ''): true | string => {
  return (
    value.match(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/) !== null ||
    `Please give a valid hex color`
  )
}

const columnFields: Field[] = [
  {
    name: 'type',
    type: 'radio',
    defaultValue: 'text',
    options: [
      {
        label: 'Text',
        value: 'text',
      },
      {
        label: 'Media',
        value: 'media',
      },
    ],
    admin: {
      layout: 'vertical',
    },
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    admin: {
      condition: (_, siblingData) => {
        return siblingData.type === 'media' ? false : true
      },
    },
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    admin: {
      condition: (_, siblingData) => {
        return siblingData.type === 'media' ? false : true
      },
    },
  },
  link({
    enumName: 'pb_columns_block_content_columns_link_appearance',
    overrides: {
      admin: {
        condition: (_, { enableLink, type }) => {
          if (Boolean(enableLink) && type === 'text') {
            return true
          }
          return false
        },
      },
    },
  }),
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_, siblingData) => {
        return siblingData.type === 'media' ? true : false
      },
    },
  },
  {
    name: 'mediaBorderRadius', // required
    label: 'Border Radius',
    enumName: 'p_blocks_columns_block_content_columns_media_border_radius',
    type: 'select', // required
    defaultValue: 'none',
    options: [
      {
        label: 'None',
        value: 'none',
      },
      {
        label: 'Small',
        value: 'small',
      },
      {
        label: 'Medium',
        value: 'medium',
      },
      {
        label: 'Large',
        value: 'large',
      },
      {
        label: 'XL',
        value: 'xl',
      },
      {
        label: '2XL',
        value: 'xxl',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
    admin: {
      condition: (_, siblingData) => {
        return siblingData.type === 'media' ? true : false
      },
    },
  },
]

export const ColumnsBlock: Block = {
  slug: 'columnsBlock',
  interfaceName: 'ColumnsBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: columnFields,
    },

    {
      type: 'collapsible',
      label: 'Styles',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          label: 'Desktop',
          type: 'collapsible',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'paddingVerticalDesktopValue', // required
                  label: 'Vertical Padding',
                  type: 'number', // required
                },
                {
                  name: 'paddingVerticalDesktopUnit',
                  enumName: 'pb_columns_block_style_group_pad_vert_desktop_unit',
                  label: 'Unit',
                  type: 'select',
                  defaultValue: 'rem',
                  options: [
                    {
                      value: 'rem',
                      label: 'rem',
                    },
                    {
                      value: 'px',
                      label: 'px',
                    },
                    {
                      value: '%',
                      label: '%',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Tablet',
          type: 'collapsible',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'paddingVerticalTabletValue', // required
                  label: 'Vertical Padding',
                  type: 'number', // required
                },
                {
                  name: 'paddingVerticalTabletUnit',
                  enumName: 'pb_columns_block_style_group_pad_vert_tablet_unit',
                  label: 'Unit',
                  type: 'select',
                  defaultValue: 'rem',
                  options: [
                    {
                      value: 'rem',
                      label: 'rem',
                    },
                    {
                      value: 'px',
                      label: 'px',
                    },
                    {
                      value: '%',
                      label: '%',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Mobile',
          type: 'collapsible',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'reverseWrap', // required
              label: 'Reverse Wrap',
              type: 'checkbox', // required
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'paddingVerticalMobileValue', // required
                  label: 'Vertical Padding',
                  type: 'number', // required
                },
                {
                  name: 'paddingVerticalMobileUnit',
                  enumName: 'pb_columns_block_style_group_pad_vert_mobile_unit',
                  label: 'Unit',
                  type: 'select',
                  defaultValue: 'rem',
                  options: [
                    {
                      value: 'rem',
                      label: 'rem',
                    },
                    {
                      value: 'px',
                      label: 'px',
                    },
                    {
                      value: '%',
                      label: '%',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
