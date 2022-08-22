import { BrowserJsPlumbInstance, newInstance } from '@jsplumb/browser-ui'
import { FlowchartConnector } from '@jsplumb/connector-flowchart'
import { Endpoint } from '@jsplumb/core'

export let plumbIns: BrowserJsPlumbInstance

export const initJsPlumb = (wrapper: HTMLElement) => {
  plumbIns = newInstance({
    container: wrapper,
    connectionsDetachable: false,
  })
}

export const createConnect = (
  source: HTMLElement | Endpoint,
  target: HTMLElement | Endpoint
) => {
  console.log('source==>',source);
  console.log('target==>',target);
  if (plumbIns) {
    // 定义了一条连接线
    plumbIns.connect({
      // 对应上述基本概念
      source: source,
      target: target,
      anchor: ['Top', 'Bottom'],
      connector: {
        type: FlowchartConnector.type,
        options: {
          curviness: 50,
        },
      },
      overlays: [
        { type: 'PlainArrow', options: { width: 10, length: 10, location: 1 } },
        {
          type: 'Custom',
          options: {
            create: (component: any) => {
              console.log('遮罩overlayer')
              console.log('component==>', component)
              console.log('source', source)
              console.log('target', target)
              console.log(source.id)
              const addibleNodeEle = document.getElementById(
                'addibleNode-' + source.id
              )
              if(addibleNodeEle){
                addibleNodeEle.dataset.source = JSON.parse(
                  JSON.stringify(source)
                )
                addibleNodeEle.dataset.target = JSON.parse(
                  JSON.stringify(target)
                )
              }
              console.log('addibleNodeEle==>', addibleNodeEle)
              return addibleNodeEle || null
            },
            location: 0.5,
            id: 'addibleNode',
            visible: false,
          },
        },
        {
          type: 'Label',
          options: { label: 'foo', location: 0.25, id: 'myLabel' },
        },
      ],
      endpoints: ['Dot', 'Blank'],
    })
  }
}
