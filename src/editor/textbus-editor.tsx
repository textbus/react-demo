import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { createTextbusEditor } from '../textbus/editor';
import { Injector } from '@tanbo/di';
import { NullInjector } from '@textbus/core';

export const EditorContext = createContext<Injector>(new NullInjector())

export interface EditorProps {
  children: ReactNode
}

export function TextbusEditor(props: EditorProps) {
  const editorContainer = useRef<HTMLDivElement | null>(null)
  const [injector, setInjector] = useState<Injector>(new NullInjector())
  useEffect(() => {
    const editor = createTextbusEditor(editorContainer.current!)
    editor.onReady.subscribe(() => {
      setInjector(editor.injector!)
    })
  }, [editorContainer])

  return (
    <div ref={editorContainer}>
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
