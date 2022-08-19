<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { ready, newInstance, BrowserJsPlumbInstance } from '@jsplumb/browser-ui'
import {
  StateMachineConnector,
  BezierConnector,
} from '@jsplumb/connector-bezier'
import { NodeConfig } from '@/config/btnConfig'
import { defaultFlowGraph } from '@/config/defaultFlow'
import BaseNode from '@/components/BaseNode'
import { resultXY } from '@/utils/customDirectives'

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
    source: nodeRefs.value[0].$el,
    target: nodeRefs.value[1].$el,
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
  const ep1 = plumbIns.addEndpoint(nodeRefs.value[2].$el, { endpoint: 'Dot' })
  const ep2 = plumbIns.addEndpoint(nodeRefs.value[3].$el, {
    endpoint: 'Rectangle',
  })
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
onMounted(() => {
  jsplumbInit()

  ready(() => {
    simpleConnection()
    connection1()
  })
})

const scale = ref(1)

const wrapperPosition = reactive({
  left: 0,
  top: 0,
})

const flowWrapperStyle = computed(() => {
  return {
    transform: `scale(${scale.value})`,
    left: wrapperPosition.left + 'px',
    top: wrapperPosition.top + 'px',
  }
})

const nodeRefs = ref<InstanceType<typeof BaseNode>[]>([])

const handleSpaceMouseMove = (resultPoint: resultXY) => {
  console.log('delta', resultPoint)
  wrapperPosition.left = resultPoint.x
  wrapperPosition.top = resultPoint.y
  console.log('space + left mouse move')
}
const handleScale = (zoom: number) => {
  console.log('zoom==>', zoom)
  scale.value += zoom
}
</script>
<script lang="ts">
export default {
  name: 'JSPlumb',
}
</script>
<template>
  <div class="wrapper">
    <div class="menuWrapper">
      <div
        class="menuItem"
        v-for="(menuItem, index) in NodeConfig"
        :key="index"
      >
        <div class="menuItem-template">
          <BaseNode
            :type="menuItem.type"
            :width="menuItem.width"
            :height="menuItem.height"
            left="50px"
            top="50px"
            style="position: static"
          ></BaseNode>
        </div>
        <h3 class="menuItem-name">{{ menuItem.name }}</h3>
      </div>
    </div>

    <div
      class="flowWrapper"
      v-mousedownspace="handleSpaceMouseMove"
      v-mousewheelalt="handleScale"
    >
      <div
        :style="flowWrapperStyle"
        class="flowWrapper-container"
        ref="wrapper"
      >
        <BaseNode
          v-for="node in defaultFlowGraph"
          ref="nodeRefs"
          :key="node.id"
          :width="node.width"
          :height="node.height"
          :type="node.type"
          :left="node.left"
          :top="node.top"
        ></BaseNode>
      </div>
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
    &-name {
      text-align: center;
    }
    &-template {
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
  box-sizing: border-box;
  background: url('@/assets/image/point.png') repeat;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform-origin: top left;
  transition: all 0.3s linear;
  &-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
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
