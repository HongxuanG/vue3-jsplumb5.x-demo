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
// 生成uuid
export function genUuid() {
  // return (+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0
    var v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
