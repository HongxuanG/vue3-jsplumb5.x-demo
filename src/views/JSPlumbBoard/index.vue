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
import draggable from 'vuedraggable'
import { createConnect, initJsPlumb } from './jsPlumb'
const wrapper = ref<HTMLElement>()

const jsplumbInit = () => {
  initJsPlumb(wrapper.value!)
}

const drawFlowGraph = () => {
  // 画图
  defaultFlowGraph.forEach((node) => {
    const prevNodeRef = refsList.find((item) => item.id === node.stepId)
    const nextNodeRef = refsList.find((item) => item.id === node.nextStepId)
    console.log('prevNodeRef',prevNodeRef);
    console.log('nextNodeRef',nextNodeRef);
    if (prevNodeRef) {
      if (nextNodeRef) {
        createConnect(prevNodeRef.$el, nextNodeRef.$el)
      }
    }
  })
}

onMounted(() => {
  // 初始化
  jsplumbInit()

  ready(() => {
    drawFlowGraph()
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

// 设置画布的left 和 top 偏移量
const handleSpaceMouseMove = (resultPoint: resultXY) => {
  wrapperPosition.left = resultPoint.x
  wrapperPosition.top = resultPoint.y
}
// 设置画布的缩放比例
const handleScale = (zoom: number) => {
  scale.value += zoom
}

const getWrapperStyle = computed(() => {
  return {
    backgroundSize: `${20 * scale.value}px ${20 * scale.value}px`,
  }
})

const handleFlowMoveItem = (event: any) => {
  console.log('handleFlowMoveItem==>', event)
}
const handleFlowMoveStart = (event: any) => {
  console.log('handleFlowMoveStart==>', event)
}
const handleFlowMoveEnd = (event: any) => {
  console.log('handleFlowMoveEnd==>', event)
}
const refsList: InstanceType<typeof BaseNode>[] = []
const getRefs = (el: any) => {
  console.log('el==>', el)
  refsList.push(el)
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
      <draggable
        class="menuItem"
        :list="NodeConfig"
        item-key="id"
        :group="{ name: 'node', pull: 'clone', put: false }"
        :move="handleFlowMoveItem"
        @start="handleFlowMoveStart"
        @end="handleFlowMoveEnd"
        :sort="false"
      >
        <template #item="{ element }">
          <div class="menuItem-template">
            <BaseNode
              :type="element.type"
              :width="element.width"
              :height="element.height"
              :ref="element.ref"
              left="50px"
              top="50px"
              style="position: static"
            ></BaseNode>
          </div>
        </template>
      </draggable>
    </div>
    <div
      class="flowWrapper"
      :style="getWrapperStyle"
      v-mousedownspace="handleSpaceMouseMove"
      v-mousewheelalt="handleScale"
    >
      <div class="zoomTool">
        <div class="zoom-button zoomIn" @click="handleScale(0.1)">
          <i class="fa-solid fa-plus"></i>
        </div>
        <div class="zoom-button zoomOut" @click="handleScale(-0.1)">
          <i class="fa-solid fa-minus"></i>
        </div>
      </div>
      <div
        :style="flowWrapperStyle"
        class="flowWrapper-container"
        ref="wrapper"
      >
        <template v-for="node in defaultFlowGraph" :key="node.stepId">
          <draggable
            class="node-addible"
            :id="'addibleNode-' + node.stepId"
            :group="{ name: 'node', pull: false, put: true }"
          >
            <template #item> </template>
          </draggable>
          <BaseNode
            :id="node.stepId"
            :ref="getRefs"
            :width="node.width"
            :height="node.height"
            :type="node.type"
            :left="node.left"
            :top="node.top"
          ></BaseNode>
        </template>
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
  position: relative;
  flex: 1 1 auto;
  box-sizing: border-box;
  background: url('@/assets/image/point.png') repeat;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform-origin: top left;
  // transition: all 0.3s linear;
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

.zoomTool {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  .zoom-button {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    background-color: #87ceeb;
    text-align: center;
    color: #fff;
    cursor: pointer;
    &:hover {
      background-color: #3fb1df;
    }
  }
}

// 加号
.node-addible {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px dashed #c2c2c2;
  position: relative;
  &:after {
    content: '+';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #c2c2c2;
  }
}
</style>
