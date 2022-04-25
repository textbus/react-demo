import React from 'react';
import './App.css';
import { TextbusEditor } from './editor/textbus-editor';
import { Toolbar } from './toolbar/toolbar';

function App() {
  const test = undefined
  return (
    <div style={{
      width: '800px',
      margin: '20px auto'
    }}>
      <TextbusEditor>
        <Toolbar/>
      </TextbusEditor>
    </div>
  )
}

export default App;
