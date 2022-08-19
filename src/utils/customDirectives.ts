import { computed, ref, watch } from 'vue'

interface BindingType {
  value: (...args: any[]) => any
}
export interface DeltaXY {
  deltaX: number
  deltaY: number
}

const spaceDown = ref(false)
const mouseDown = ref(false)

const delta = {
  deltaX: 0,
  deltaY: 0,
}
const spaceKeyDown = (event: KeyboardEvent) => {
  if (event.code === 'Space') {
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
    delta.deltaX = event.clientX
    delta.deltaY = event.clientY
  }
}
const mouseKeyMove = (callback: (...args: any[]) => any) => {
  return (event: MouseEvent) => {
    if (spaceDown.value && mouseDown.value) {
      console.log('space + mouse')
      delta.deltaX = event.clientX - delta.deltaX
      delta.deltaY = event.clientY - delta.deltaY
      callback(delta)
    }
  }
}

const mouseKeyUp = (event: MouseEvent) => {
  if (spaceDown.value) {
    mouseDown.value = false
    clearDelta()

  }
}
const clearDelta = () => {
  delta.deltaX = 0
  delta.deltaY = 0
}
export const mouseDownSpace = {
  mounted(el: HTMLElement, { value }: BindingType) {
    document.addEventListener('keydown', spaceKeyDown)
    document.addEventListener('keyup', spaceKeyUp)
    el.addEventListener('mousedown', mouseKeyDown)
    el.addEventListener('mousemove', mouseKeyMove(value))
    el.addEventListener('mouseup', mouseKeyUp)
    const isCapture = computed(() => {
      return spaceDown.value && mouseDown.value
    })
    watch(spaceDown, (newValue) => {
      if (newValue) {
        el.style.cursor = 'grab'
      } else {
        el.style.cursor = 'unset'
      }
    })
    watch(isCapture, (newValue) => {
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
  },
}
