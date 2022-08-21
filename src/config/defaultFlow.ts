import { EnumNode } from "./btnConfig";

export const defaultFlowGraph = [
  {
    stepId: 'e164f7f0-340f-4710-8e9d-90e538f95dc6',
    name: '正方形',
    type: EnumNode.SQUARE,
    width: '100px',
    height: '100px',
    top: '100px',
    left: '100px',
    nextStepId: '7edf6f19-50ab-4047-aba0-bff0f1112450',
  },
  {
    stepId: '7edf6f19-50ab-4047-aba0-bff0f1112450',
    name: '三角形',
    type: EnumNode.DELTA,
    width: '100px',
    height: '100px',
    top: '210px',
    left: '100px',
    nextStepId: '811f5778-334c-4426-bc7c-012409f0d031',
  },
  {
    stepId: '811f5778-334c-4426-bc7c-012409f0d031',
    name: '圆形',
    type: EnumNode.CIRCLE,
    width: '100px',
    height: '100px',
    top: '450px',
    left: '100px',
    nextStep: 'fae270c9-a657-4859-94f3-fba25cf962b6',
  },
  {
    stepId: 'fae270c9-a657-4859-94f3-fba25cf962b6',
    name: '圆角矩形',
    type: EnumNode.ROUNDRECT,
    width: '100px',
    height: '40px',
    top: '610px',
    left: '100px',
    nextStep: null,
  },
]
