import { EnumNode } from "./btnConfig";

export const defaultFlowGraph = [
  {
    id: 1,
    name: '正方形',
    type: EnumNode.SQUARE,
    top: '50px',
    left: '50px',
  },
  {
    id: 2,
    name: '三角形',
    type: EnumNode.DELTA,
    top: '150px',
    left: '150px',
  },
  {
    id: 1,
    name: '圆形',
    type: EnumNode.CIRCLE,
    top: '150px',
    left: '250px',
  },
  {
    id: 1,
    name: '圆角矩形',
    type: EnumNode.ROUNDRECT,
    top: '250px',
    left: '350px',
  },
]
