import { computed, ref, watch, WatchCallback, WatchStopHandle } from 'vue'

interface BindingType {
  value: (...args: any[]) => any
}
export interface StartPointXY {
  x: number
  y: number
}

export interface resultXY {
  x: number
  y: number
}
 
const spaceDown = ref(false)
const mouseDown = ref(false)

const startPoint = {
  x: 0,
  y: 0,
}

const tempPoint = {
  x: 0,
  y: 0,
}

const resultXY = {
  x: 0,
  y: 0,
}

const isGrabbing = computed(() => {
  return spaceDown.value && mouseDown.value
})

const spaceKeyDown = (event: KeyboardEvent) => {
  if (event.code === 'Space') {
    event.preventDefault() 
    spaceDown.value = true
  }
}
const spaceKeyUp = (event: KeyboardEvent) => {
  if (event.code === 'Space') {
    spaceDown.value = false
  }
}
const mouseKeyDown = (event: MouseEvent) => {
  if (spaceDown.value) {
    mouseDown.value = true
    startPoint.x = event.clientX
    startPoint.y = event.clientY
  }
}
const mouseKeyMove = (callback: (...args: any[]) => any) => {
  // 确保返回的引用保持一致 以便于 removeEventListener 的时候能够移除正确的 回调函数
  let cacheFunc = null
  if (!cacheFunc) {
    cacheFunc = (event: MouseEvent) => {
      if (isGrabbing.value) {
        console.log('space + mouse')

        resultXY.x = event.clientX - startPoint.x + tempPoint.x
        resultXY.y = event.clientY - startPoint.y + tempPoint.y
        callback(resultXY)
      }
    }
  }
  return cacheFunc
}


const mouseKeyUp = (event: MouseEvent) => {
  if (spaceDown.value) {
    mouseDown.value = false
    clearDelta()

  }
}
const clearDelta = () => {
  // 为什么要加这层判断？ 因为左键按下 -> 拖拽 -> 按住空格 -> 左键按下 -> 拖拽 -> 触发重新回到初始位置的 bug
  if(resultXY.x !== 0 || resultXY.y !== 0){
    tempPoint.x = resultXY.x
    tempPoint.y = resultXY.y  
  }
  resultXY.x = 0
  resultXY.y = 0
  startPoint.x = 0
  startPoint.y = 0
}

let stopWatchSpaceDown: WatchStopHandle
let stopWatchGrabbing: WatchStopHandle

// 鼠标左键 + 空格 拖拽视图
export const mouseDownSpace = {
  mounted(el: HTMLElement, { value }: BindingType) {
    document.addEventListener('keydown', spaceKeyDown)
    document.addEventListener('keyup', spaceKeyUp)
    el.addEventListener('mousedown', mouseKeyDown)
    el.addEventListener('mousemove', mouseKeyMove(value))
    el.addEventListener('mouseup', mouseKeyUp)
    
    stopWatchSpaceDown = watch(spaceDown, (newValue) => {
      if (newValue) {
        el.style.cursor = 'grab'
      } else {
        el.style.cursor = 'unset'
      }
    })
    stopWatchGrabbing = watch(isGrabbing, (newValue) => {
      if (newValue) {
        el.style.cursor = 'grabbing'
      } else {
        el.style.cursor = 'grab'
      }
    })
  },
  beforeUnmount(el: HTMLElement, { value }: BindingType) {
    document.removeEventListener('keydown', spaceKeyDown)
    document.removeEventListener('keyup', spaceKeyUp)
    el.removeEventListener('mousedown', mouseKeyDown)
    el.removeEventListener('mousemove', mouseKeyMove(value))
    el.removeEventListener('mouseup', mouseKeyUp)
    stopWatchSpaceDown()
    stopWatchGrabbing()
  },
}

const altDown = ref(false)

const handleAltDown = (event: KeyboardEvent)=>{
  console.log('event==>', event)
  if (event.code === 'AltLeft' || event.altKey) {
    event.preventDefault()
    altDown.value = true
  }
}
const handleAltUp = (event: KeyboardEvent) => {
  if (event.code === 'AltLeft' || event.altKey) {
    event.preventDefault()
    altDown.value = false
  }
}

let tempZoom = 1

const handleMouseWheel = (callback: (...args: any[]) => any) => {
  // 确保返回的引用保持一致 以便于 removeEventListener 的时候能够移除正确的 回调函数
  let cacheFunc = null
  if (!cacheFunc) {
    cacheFunc = (event: WheelEvent) => {
      if (altDown.value) {
        event.preventDefault()
        callback(event.deltaY / 1000)
      }
    }
  }
  return cacheFunc
}

// alt + 鼠标滚轮 放大缩小
export const mousewheelAlt = {
  mounted(el: HTMLElement, { value }: BindingType) {
    document.addEventListener('keydown', handleAltDown)
    document.addEventListener('keyup', handleAltUp)
    el.addEventListener('wheel', handleMouseWheel(value))
  },
  beforeUnmount(el: HTMLElement, { value }: BindingType) {
    document.removeEventListener('keydown', handleAltDown)
    document.removeEventListener('keyup', handleAltUp)
    el.removeEventListener('wheel', handleMouseWheel(value))
    
  },
}


