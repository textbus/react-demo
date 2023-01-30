import React from 'react';
import './App.css';
import { TextbusEditor } from './editor/textbus-editor';
import { Toolbar } from './toolbar/toolbar';

function Test(a: any, b: any, c: any) {
  console.log([a, b, c])
  return (
    <div>
      <div>fdsafads</div>
      <div>333333333333</div>
    </div>
  )
}

function App() {
  return (
    <div style={{
      width: '800px',
      margin: '20px auto'
    }}>
      <Test aaa="aaaa">
        <div>============</div>
      </Test>
      <TextbusEditor>
        <Toolbar/>
      </TextbusEditor>
    </div>
  )
}

export default App;
