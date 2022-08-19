import { EnumNode } from "./btnConfig";

export const defaultFlowGraph = [
  {
    id: 1,
    name: '正方形',
    type: EnumNode.SQUARE,
    width: '100px',
    height: '100px',
    top: '50px',
    left: '50px',
  },
  {
    id: 2,
    name: '三角形',
    type: EnumNode.DELTA,
    width: '100px',
    height: '100px',
    top: '150px',
    left: '150px',
  },
  {
    id: 3,
    name: '圆形',
    type: EnumNode.CIRCLE,
    width: '100px',
    height: '100px',
    top: '150px',
    left: '250px',
  },
  {
    id: 4,
    name: '圆角矩形',
    type: EnumNode.ROUNDRECT,
    width: '100px',
    height: '40px',
    top: '250px',
    left: '350px',
  },
]
