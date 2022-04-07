import React, { useEffect, useRef } from 'react';
import './App.css';
import { createTextbusEditor } from './textbus/editor';
import { boldFormatter, Editor } from '@textbus/editor';
import { Commander } from '@textbus/core';

function App() {
  const editorHost = useRef<any>()

  let editor: Editor

  useEffect(() => {
    editor = createTextbusEditor(editorHost.current!)
    editor.onChange.subscribe(() => {
      console.log(editor.getJSON().content)
    })
    return () => {
      editor.destroy()
    }
  })
  return (
    <div className="App">
      <div className="toolbar">
        <button type="button" onClick={() => {
          const commander = editor.injector!.get(Commander)
          commander.insert('xxx')
        }}>插入字符</button>

        <button type="button" onClick={() => {
          const commander = editor.injector!.get(Commander)
          commander.applyFormat(boldFormatter, true)
        }}>加粗</button>
      </div>
      <div style={{
        width: '600px',
        margin: '0 auto'
      }} ref={editorHost}/>
    </div>
  );
}

export default App;
