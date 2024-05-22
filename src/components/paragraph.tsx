import { ViewComponentProps } from '@textbus/adapter-react';
import {
  Commander,
  ContentType,
  createVNode,
  Component,
  onBreak,
  Selection,
  Slot,
  useContext,
  Textbus, ComponentStateLiteral, Registry
} from '@textbus/core';
import { useContext as useReactContext } from 'react'
import { AdapterContext } from '../adapter-context'

export interface ParagraphComponentState {
  slot: Slot
}

// 创建 Textbus 段落组件
export class ParagraphComponent extends Component<ParagraphComponentState> {
  static componentName = 'ParagraphComponent'
  static type = ContentType.BlockComponent

  static fromJSON(textbus: Textbus, state: ComponentStateLiteral<ParagraphComponentState>) {
    const registry = textbus.get(Registry)
    return new ParagraphComponent(textbus, {slot: registry.createSlot(state.slot)})
  }

  setup() {
    const context = useContext()
    const commander = useContext(Commander)
    const selection = useContext(Selection)

    onBreak(ev => {
      ev.preventDefault()
      const nextContent = ev.target.cut(ev.data.index)
      const p = new ParagraphComponent(context, {
        slot: nextContent
      })
      commander.insertAfter(p, this)
      this.textbus.nextTick(() => {
        selection.selectFirstPosition(p)
      })
    })
  }
}

export function ParagraphView(props: ViewComponentProps<ParagraphComponent>) {
  const slot = props.component.state.slot
  const adapter = useReactContext(AdapterContext)
  return (
    adapter.slotRender(slot, children => {
      return createVNode('p', {ref: props.rootRef, 'data-component': ParagraphComponent.componentName}, children)
    })
  )
}

