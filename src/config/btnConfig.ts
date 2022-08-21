export enum EnumNode {
  SQUARE = 'square',
  DELTA = 'delta',
  CIRCLE = 'circle',
  ELLIPSE = 'ellipse',
  ROUNDRECT = 'roundrect',
}
export const NodeConfig = [
  {
    id: '1',
    name: '正方形',
    type: EnumNode.SQUARE,
    ref: 'square',
    width: '100px',
    height: '100px',
  },
  {
    id: '2',
    name: '三角形',
    ref: 'delta',
    type: EnumNode.DELTA,
    width: '100px',
    height: '100px',
  },
  {
    id: '3',
    name: '圆形',
    ref: 'circle',
    type: EnumNode.CIRCLE,
    width: '100px',
    height: '100px',
  },
  {
    id: '4',
    name: '椭圆形',
    ref: 'ellipse',
    type: EnumNode.ELLIPSE,
    width: '100px',
    height: '40px',
  },
  {
    id: '5',
    name: '圆角矩形',
    ref: 'roundrect',
    type: EnumNode.ROUNDRECT,
    width: '100px',
    height: '40px',
  },
]
