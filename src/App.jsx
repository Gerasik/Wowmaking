import React, { useState, useEffect } from 'react';

import Canvas from './components/Canvas';
import Control from './components/Control';
import styles from './app.module.scss';

function App() {
  const [tool, setTool] = useState('pen');
  const [canvasSize, setCanvasSize] = useState(10);
  const [data, setData] = useState(new ImageData(canvasSize, canvasSize));
  // const [history, setHistory] =

  // useEffect(
  //   () => {
  //     console.log(tool);
  //   },
  //   [tool],
  //   data
  // );

  const changeTool = (tool) => {
    setTool(tool);
  };

  const resetCanvas = () => {
    setData(new ImageData(100, 100));
  };

  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <Control changeTool={changeTool} resetCanvas={resetCanvas} />
        <Canvas tool={tool} data={data} canvasSize={canvasSize} />
      </main>
    </div>
  );
}

export default App;
