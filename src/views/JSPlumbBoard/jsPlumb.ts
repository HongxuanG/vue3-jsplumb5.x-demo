import { BrowserJsPlumbInstance, newInstance } from "@jsplumb/browser-ui"
import {FlowchartConnector} from '@jsplumb/connector-flowchart'

let plumbIns: BrowserJsPlumbInstance

export const initJsPlumb = (wrapper: HTMLElement) => {
  plumbIns = newInstance({
    container: wrapper,
  })
}

export const createConnect = (source: HTMLElement, target: HTMLElement) => {
  if(plumbIns) {
    // 定义了一条连接线
    plumbIns.connect({
      // 对应上述基本概念
      source: source,
      target: target,
      anchor: 'AutoDefault',
      connector: {
        type: FlowchartConnector.type,
        options: {
          curviness: 50,
        },
      },
      overlays: [
        { type: 'Arrow', options: { location: 1 } },
        {
          type: 'Label',
          options: { label: 'foo', location: 0.25, id: 'myLabel' },
        },
      ],
      endpoints: ['Dot', 'Blank'],
    })
  }
}
