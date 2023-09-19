import { ViewComponentProps } from '@textbus/adapter-react';
import {
  Commander,
  ContentType,
  createVNode,
  defineComponent,
  onBreak,
  Selection,
  Slot,
  useContext,
  useSelf
} from '@textbus/core';
import { useContext as useReactContext } from 'react'
import { AdapterContext } from '../adapter-context';

// 创建 Textbus 段落组件
export const paragraphComponent = defineComponent({
  name: 'ParagraphComponent',
  type: ContentType.BlockComponent,
  validate(initData) {
    return {
      slots: [
        initData?.slots?.[0] || new Slot([
          ContentType.Text,
          ContentType.InlineComponent
        ])
      ]
    }
  },
  setup() {
    const context = useContext()
    const commander = useContext(Commander)
    const selection = useContext(Selection)
    const self = useSelf()

    onBreak(ev => {
      ev.preventDefault()
      const nextContent = ev.target.cut(ev.data.index)
      const p = paragraphComponent.createInstance(context, {
        slots: [nextContent]
      })
      commander.insertAfter(p, self)
      selection.selectFirstPosition(p)
    })
  }
})

export function ParagraphView(props: ViewComponentProps<typeof paragraphComponent>) {
  const slot = props.component.slots.first
  const adapter = useReactContext(AdapterContext)
  return (
    adapter.slotRender(slot, children => {
      return createVNode('p', { ref: props.rootRef }, children)
    })
  )
}

