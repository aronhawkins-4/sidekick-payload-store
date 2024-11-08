import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'
import defaultTheme from 'tailwindcss/defaultTheme'

import type { Page } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '@/components/Media'

type Props = Extract<Page['layout'][0], { blockType: 'columnsBlock' }>

export const ColumnsBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const {
    id,
    columns,
    reverseWrap,
    paddingVerticalDesktopValue: pyDesktopVal,
    paddingVerticalDesktopUnit: pyDesktopUnit,
    paddingVerticalTabletValue: pyTabletVal,
    paddingVerticalTabletUnit: pyTabletUnit,
    paddingVerticalMobileValue: pyMobileVal,
    paddingVerticalMobileUnit: pyMobileUnit,
  } = props
  const flexDirection = reverseWrap ? 'columnReverse' : 'column'
  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }
  const flexDirectionClasses = {
    column: 'flex-col',
    columnReverse: 'flex-col-reverse',
  }
  const mediaBorderRadiusClasses = {
    none: 'rounded-none',
    small: 'rounded-mediaSm',
    medium: 'rounded-mediaMd',
    large: 'rounded-mediaLg',
    xl: 'rounded-mediaXl',
    xxl: 'rounded-media2Xl',
    full: 'rounded-full',
  }
  const pyDesktop = pyDesktopVal && pyDesktopUnit ? `${pyDesktopVal}${pyDesktopUnit}` : ''
  const pyTablet = pyTabletVal && pyTabletUnit ? `${pyTabletVal}${pyTabletUnit}` : ''
  const pyMobile = pyMobileVal && pyMobileUnit ? `${pyMobileVal}${pyMobileUnit}` : ''

  return (
    <>
      <style>
        {`.columns-block-${id} {
       padding-top: ${pyMobile};
       padding-bottom: ${pyMobile};

       @media screen and (min-width: ${defaultTheme.screens.md}) {
          padding-top: ${pyTablet};
          padding-bottom: ${pyTablet};
       }
          @media screen and (min-width: ${defaultTheme.screens.lg}) {
          padding-top: ${pyDesktop};
          padding-bottom: ${pyDesktop};
       }
      }`}
      </style>
      <div className={`container columns-block-${id}`}>
        <div
          className={cn(
            `flex ${flexDirectionClasses[flexDirection]} sm:grid sm:grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16`,
          )}
        >
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, size, media, type, mediaBorderRadius } = col

              return (
                <div
                  className={cn(
                    `lg:col-span-${colsSpanClasses[size || 'full']} flex flex-col justify-center items-stretch sm:items-start gap-4`,
                    {
                      'sm:col-span-2': size !== 'full',
                    },
                  )}
                  key={index}
                >
                  {type === 'text' && (
                    <>
                      {richText && <RichText content={richText} enableGutter={false} />}
                      {enableLink && <CMSLink {...link} />}
                    </>
                  )}
                  {type === 'media' && media && (
                    <Media
                      resource={media}
                      className={cn(
                        `${mediaBorderRadiusClasses[mediaBorderRadius || 'none']} overflow-hidden`,
                      )}
                    />
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}
