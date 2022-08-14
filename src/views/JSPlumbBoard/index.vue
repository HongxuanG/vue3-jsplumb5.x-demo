<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ready, newInstance, BrowserJsPlumbInstance } from '@jsplumb/browser-ui'
import {
  StateMachineConnector,
  BezierConnector,
} from '@jsplumb/connector-bezier'
const wrapper = ref<Element>()
const item1 = ref<Element>()
const item2 = ref<Element>()
const item3 = ref<Element>()
const item4 = ref<Element>()

let plumbIns: BrowserJsPlumbInstance
const jsplumbInit = () => {
  plumbIns = newInstance({
    container: wrapper.value,
  })
}
const simpleConnection = () => {
  // 定义了一条连接线
  plumbIns.connect({
    // 对应上述基本概念
    source: item1.value,
    target: item2.value,
    anchor: 'AutoDefault',
    connector: {
      type: StateMachineConnector.type,
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
const connection1 = () => {
  const ep1 = plumbIns.addEndpoint(item3.value!, { endpoint: 'Dot' })
  const ep2 = plumbIns.addEndpoint(item4.value!, { endpoint: 'Rectangle' })
  plumbIns.connect({
    source: ep1,
    target: ep2,
    anchors: ['Bottom', 'Top'],
    connector: BezierConnector.type,
    overlays: [
      { type: 'Arrow', options: { location: 1 } },
      { type: 'Label', options: { label: 'Connection 1', location: 0.5 } },
    ],
  })
}
const connection2 = () => {
  plumbIns.connect({
    source: item4.value,
    target: item2.value,
    anchor:"Continuous",
    connector: BezierConnector.type,
    overlays:[
       { type:"Label", options:{label:"Connection 2", location:0.5}},
       { type:"Arrow", options:{location:1}}
    ]
  })
}
onMounted(() => {
  console.log('wrapper==>', wrapper.value)
  jsplumbInit()
  console.log('plumbIns==>', item1.value)
  console.log('plumbIns==>', item2.value)

  ready(() => {
    simpleConnection()
    connection1()
    connection2()
  })
})
</script>
<script lang="ts">
export default {
  name: 'JSPlumb',
}
</script>
<template>
  <div id="wrapper" ref="wrapper">
    <div class="line-wrap" style="margin-left: 70px">
      <div id="item-1" ref="item1" class="state-item" style="left: 0px; top: 0px">State 1</div>
      <div id="item-2" ref="item2" class="state-item" style="left: 100px; top: 0px">State 2</div>
      <div id="item-3" ref="item3" class="state-item">State 3</div>
    </div>
    <div class="line-wrap">
      <div id="item-4" ref="item4" class="state-item">State 4</div>
      <div id="item-5" class="state-item">State 5</div>
      <div id="item-6" class="state-item">State 6</div>
      <div id="item-7" class="state-item">State 7</div>
    </div>
    <div class="line-wrap" style="margin-left: 215px">
      <div id="item-8" class="state-item">State 8</div>
      <div id="item-9" class="state-item">State 9</div>
    </div>
  </div>
</template>

<style scoped>
#wrapper {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 60px 80px;
}
.state-item {
  position: absolute;
  width: 80px;
  height: 40px;
  color: #606266;
  background: #f6f6f6;
  border: 2px solid rgba(0, 0, 0, 0.05);
  text-align: center;
  line-height: 40px;
  font-family: sans-serif;
  border-radius: 4px;
  margin-right: 60px;
}
.line-wrap {
  display: flex;
  margin-bottom: 40px;
}
</style>
