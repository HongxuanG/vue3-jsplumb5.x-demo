import {GetStringifyStyle} from './typeTool'

export const getStyle = <T extends Record<string, any>>(
  styleObj: T
) => {

  const styleStr = Object.keys(styleObj).reduce(
    (style, key) => {
      const value = styleObj[key]
      if (typeof value === 'string') {
        return `${style}${key}: ${value};`
      } else {
        return `${style}${key}: ${JSON.stringify(value)};`
      }
    },
    ''
  )
  return styleStr as GetStringifyStyle<T>
}
