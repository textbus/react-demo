import { BrowserModule } from '@textbus/platform-browser'
import { Textbus } from '@textbus/core'
import { createRoot } from 'react-dom/client'
import { Adapter } from '@textbus/adapter-react'


import './index.css'
import { rootComponent, RootComponentView } from './components/root';
import { paragraphComponent, ParagraphView } from './components/paragraph';
import { AdapterContext } from './adapter-context';
import { createPortal } from 'react-dom';


// 实例化 React 适配器
const adapter = new Adapter({
  // 添加渲染组件映射关系
  [rootComponent.name]: RootComponentView,
  [paragraphComponent.name]: ParagraphView
}, (host, root) => {
  // 使用 React 渲染 Textbus 视图
  const app = createRoot(host)
  app.render(<AdapterContext.Provider value={adapter}>{root}</AdapterContext.Provider>)
  return () => {
    app.unmount()
  }
})
// 实例化浏览器模块
const browserModule = new BrowserModule({
  adapter, // 添加 React 适配器
  renderTo(): HTMLElement {
    return document.getElementById('root')!
  }
})
// 实例化 Textbus
const textbus = new Textbus({
  imports: [
    browserModule
  ],
  components: [
    rootComponent,
    paragraphComponent
  ]
})

// 创建根组件实例
const rootModel = rootComponent.createInstance(textbus)

// 使用 Textbus 启动渲染
textbus.render(rootModel)
