import { ViewComponentProps } from '@textbus/adapter-react';
import {
  ContentType,
  createVNode,
  Component,
  onContentInsert,
  Selection,
  Slot,
  useContext,
  Textbus, ComponentStateLiteral, Registry
} from '@textbus/core';
import { useContext as useReactContext } from 'react'

import { ParagraphComponent } from './paragraph';
import { AdapterContext } from '../adapter-context';

export function RootComponentView(props: ViewComponentProps<RootComponent>) {
  const slot = props.component.state.slot
  const adapter = useReactContext(AdapterContext)
  return (
    <div ref={props.rootRef as any} data-component={RootComponent.componentName}>
      {
        adapter.slotRender(slot, children => {
          return createVNode('div', null, children)
        })
      }
    </div>
  )
}

export interface RootComponentState {
  slot: Slot
}

// 创建 Textbus 根组件
export class RootComponent extends Component<RootComponentState> {
  static componentName = 'RootComponent'
  static type = ContentType.BlockComponent

  static fromJSON(textbus: Textbus, state: ComponentStateLiteral<RootComponentState>) {
    const registry = textbus.get(Registry)
    return new RootComponent(textbus, {slot: registry.createSlot(state.slot)})
  }

  setup() {
    const selection = useContext(Selection)
    const textbus = useContext()
    // 监听内容插入事件

    onContentInsert(ev => {
      // 当插入的内容是一个字符串或行内组件时，我们将创建新的段落
      if (typeof ev.data.content === 'string' || ev.data.content.type !== ContentType.BlockComponent) {
        // 创建新的插槽，并把内容插入在新插槽内
        const slot = new Slot([
          ContentType.Text,
          ContentType.InlineComponent
        ])
        slot.insert(ev.data.content)

        // 创建新的段落组件，并把插槽传给段落组件
        const p = new ParagraphComponent(textbus, {
          slot
        })
        // 在 rootComponent 的插槽内插入新段落
        ev.target.insert(p)
        // 设置光标为段落组件插槽的索引位置
        selection.setPosition(slot, slot.index)
        // 阻止默认的插入事件
        ev.preventDefault()
      }
    })
  }
}
