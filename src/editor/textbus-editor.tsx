import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { createTextbusEditor } from '../textbus/editor';
import { Injector } from '@tanbo/di';
import { Commander, NullInjector } from '@textbus/core';

export const EditorContext = createContext<Injector>(new NullInjector())

export interface EditorProps {
  children: ReactNode
}

export function TextbusEditor(props: EditorProps) {
  const editorContainer = useRef<HTMLDivElement | null>(null)
  const [injector, setInjector] = useState<Injector>(new NullInjector())
  useEffect(() => {
    if (editorContainer.current) {
      const editor = createTextbusEditor(editorContainer.current!)
      editor.onReady.subscribe(() => {
        setInjector(editor)
      })
    }
  }, [editorContainer])

  return (
    <div>
      <div>
        <button type="button" onClick={() => {
          const commander = injector.get(Commander)
          commander.insert('xxx')
        }}>insert
        </button>

        <span onClick={() => {
          const commander = injector.get(Commander)
          commander.insert('aaa')
        }}>insert</span>
      </div>
      <div ref={editorContainer}/>
      {
        // @ts-ignore
        injector instanceof NullInjector ? false : <EditorContext.Provider value={injector}>{
          props.children
        }
        </EditorContext.Provider>
      }
    </div>
  )
}
