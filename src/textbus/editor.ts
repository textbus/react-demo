import {
  createEditor,
  defaultComponentLoaders,
  Toolbar,
  defaultTools,
  LinkJumpTipPlugin
} from '@textbus/editor';
import '@textbus/editor/bundles/textbus.min.css'
import { alertComponentLoader } from './components/alert/alert.component';
import { alertTool } from './components/alert/alert.tool';
import { AtPlugin } from './components/at/at.plugin';


defaultComponentLoaders.push(alertComponentLoader)
defaultComponentLoaders.unshift(alertComponentLoader)
defaultTools.push([alertTool])
export function createTextbusEditor(host: HTMLElement) {
  return createEditor(host, {
    plugins: [
      new AtPlugin(),
      new LinkJumpTipPlugin(),
      new Toolbar(defaultTools)
    ]
  })
}
