import { EnumNode } from '@/config/btnConfig'
import { getStyle } from '@/utils/common'
import { computed, defineComponent, h, PropType, VNode } from 'vue'

export default defineComponent({
  props: {
    type: {
      type: String as PropType<EnumNode>,
      default: EnumNode.SQUARE,
    },
    width: {
      type: [String, Number],
      default: null,
    },
    height: {
      type: [String, Number],
      default: null,
    },
    top: {
      type: [String, Number],
      default: '150px',
    },
    left: {
      type: [String, Number],
      default: '150px',
    },
  },
  setup(props, { slots }) {
    console.log(props)
    const normalizeStyleValue = (value: string | number) => {
      const defaultUnit = 'px'
      if (typeof value === 'number') {
        return value + defaultUnit
      }
      return value
    }
    const nodeStyle = computed(() => {
      return getStyle({
        width: normalizeStyleValue(props.width),
        height: normalizeStyleValue(props.height),
        top: normalizeStyleValue(props.top),
        left: normalizeStyleValue(props.left),
      })
    })
    const BaseRenderer = () => h(
      'div',
      { class: `node node-${props.type}`, style: nodeStyle.value },
      [h('div', { class: 'node-content' }, slots.default?.())]
    )
    const DeltaRenderer = () => {
      const x = parseFloat(props.width + '')
      const y = parseFloat(props.height + '')
      return h(
        'svg',
        {
          width: normalizeStyleValue(props.width),
          height: normalizeStyleValue(props.height),
          style: `position: absolute; top: ${props.top}; left: ${props.left};`,
        },
        [
          h('polygon', {
            points: `${x},${y} ${x / 2},0 0,${y}`,
            style: 'fill: #ffffff; stroke: #000; stroke-width: 1',
          }),
        ]
      )
    }

    let renderer: VNode

    if (props.type === EnumNode.DELTA) {
      renderer = DeltaRenderer()
    } else {
      renderer = BaseRenderer()
    }

    return () => renderer
  },
})
