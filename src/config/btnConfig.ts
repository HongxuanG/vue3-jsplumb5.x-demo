export enum EnumNode {
  SQUARE = 'square',
  DELTA = 'delta',
  CIRCLE = 'circle',
  ELLIPSE = 'ellipse',
  ROUNDRECT = 'roundrect',
}
export const NodeConfig = [
  {
    name: '正方形',
    type: EnumNode.SQUARE,
    width: '100px',
    height: '100px',
  },
  {
    name: '三角形',
    type: EnumNode.DELTA,
    width: '100px',
    height: '100px',
  },
  {
    name: '圆形',
    type: EnumNode.CIRCLE,
    width: '100px',
    height: '100px',
  },
  {
    name: '椭圆形',
    type: EnumNode.ELLIPSE,
    width: '100px',
    height: '40px',
  },
  {
    name: '圆角矩形',
    type: EnumNode.ROUNDRECT,
    width: '100px',
    height: '40px',
  },
]
