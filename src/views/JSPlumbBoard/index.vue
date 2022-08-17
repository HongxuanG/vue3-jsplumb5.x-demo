<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ready, newInstance, BrowserJsPlumbInstance } from '@jsplumb/browser-ui'
import {
  StateMachineConnector,
  BezierConnector,
} from '@jsplumb/connector-bezier'
import { NodeConfig } from '@/config/btnConfig';

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
    anchor: 'Continuous',
    connector: BezierConnector.type,
    overlays: [
      { type: 'Label', options: { label: 'Connection 2', location: 0.5 } },
      { type: 'Arrow', options: { location: 1 } },
    ],
  })
}
onMounted(() => {
  jsplumbInit()

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
  <div class="wrapper">
    <div class="menuWrapper">
      <div class="menuItem" v-for="(menuItem,index) in NodeConfig" :key="index">
        <div class="menuItem-template">
          <BaseNode :type="menuItem.type" :width="menuItem.width" :height="menuItem.height" left="50px" top="50px" style="position: static;"></BaseNode>

        </div>
        <h3 class="menuItem-name">{{menuItem.name}}</h3>
      </div>
    </div>

    <div class="flowWrapper" ref="wrapper">
      <BaseNode type="square" left="50px" top="top: 50px"></BaseNode>
      <BaseNode type="circle" left="150px" top="top: 250px"></BaseNode>
      <div
        id="item-1"
        ref="item1"
        class="state-item jtk-node"
        style="left: 50px; top: 50px"
      ></div>
      <div
        id="item-2"
        ref="item2"
        class="state-item"
        style="left: 150px; top: 250px"
      ></div>
      <div
        id="item-3"
        ref="item3"
        class="state-item"
        style="left: 200px; top: 200px"
      >
        State 3
      </div>
      <div
        id="item-4"
        ref="item4"
        class="state-item"
        style="left: 300px; top: 300px"
      >
        State 4
      </div>
      <div id="item-5" class="state-item">State 5</div>
      <div id="item-6" class="state-item">State 6</div>
      <div id="item-7" class="state-item">State 7</div>
      <div id="item-8" class="state-item">State 8</div>
      <div id="item-9" class="state-item">State 9</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  background-color: #f6f6f6;
}
.menuWrapper {
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  width: 300px;
  height: 100%;
  background-color: #fff;
  .menuItem {
    &-name{
      text-align: center;
    }
    &-template{
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 100px;
    }
  }
}
.flowWrapper {
  flex: 1 1 auto;
  position: relative;
  box-sizing: border-box;
  background: url('@/assets/image/point.png') repeat;
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
</style>
