'use client'
import React from 'react'

import { useField } from '@payloadcms/ui'
import './index.scss'

// keep a list of default colors to choose from
const defaultColors = [
  '#333333',
  '#9A9A9A',
  '#F3F3F3',
  '#FF6F76',
  '#FDFFA4',
  '#B2FFD6',
  '#F3DDF3',
  '#00000000',
]
const baseClass = 'custom-color-picker'

export const ColorPickerSwatches = () => {
  const { path, showError, setValue, value } = useField({})
  return (
    <ul className={`${baseClass}__colors ${showError ? 'error' : ''} mt-4`}>
      {defaultColors.map((color, i) => (
        <li key={i}>
          <button
            type="button"
            key={color}
            className={`chip ${color === value ? 'chip--selected' : ''} chip--clickable`}
            style={{ backgroundColor: color }}
            aria-label={color}
            onClick={() => setValue(color)}
          />
        </li>
      ))}
    </ul>
  )
}
