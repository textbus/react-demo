import React from 'react';
import './App.css';
import { TextbusEditor } from './editor/textbus-editor';
import { Toolbar } from './toolbar/toolbar';

function App() {
  const test = undefined
  return (
    <TextbusEditor>
      <Toolbar/>
    </TextbusEditor>
  )
}

export default App;
