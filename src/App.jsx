import React, { useState } from 'react';

import Canvas from './components/Canvas';
import Control from './components/Control';
import styles from './app.module.scss';

function App() {
  const canvasSize = 10;
  const [tool, setTool] = useState('pen');
  const [data, setData] = useState(new ImageData(canvasSize, canvasSize));
  const [color, setColor] = useState('#fefefe');
  const [history, setHistory] = useState([new ImageData(canvasSize, canvasSize)]);

  const changeTool = (tool) => {
    setTool(tool);
  };

  const resetCanvas = () => {
    const emptyData = new ImageData(canvasSize, canvasSize);
    changeHistory(emptyData);
    setData(emptyData);
  };

  const pen = (e) => {
    const context = e.target.getContext('2d');
    const x = Math.floor(((e.offsetX || e.nativeEvent.offsetX) * canvasSize) / 500);
    const y = Math.floor(((e.offsetY || e.nativeEvent.offsetY) * canvasSize) / 500);
    context.fillStyle = color;
    context.fillRect(x, y, 1, 1);
    changeHistory(context.getImageData(0, 0, canvasSize, canvasSize));
  };

  const eraser = (e) => {
    const context = e.target.getContext('2d');
    const x = Math.floor(((e.offsetX || e.nativeEvent.offsetX) * canvasSize) / 500);
    const y = Math.floor(((e.offsetY || e.nativeEvent.offsetY) * canvasSize) / 500);
    context.clearRect(x, y, 1, 1);
    changeHistory(context.getImageData(0, 0, canvasSize, canvasSize));
  };

  const changeColor = (e) => {
    setColor(e.target.value);
  };

  const compare = (a1, a2) => {
    return a1.every((v, i) => v === a2[i]);
  };

  const changeHistory = (imageData) => {
    if (!compare(history[history.length - 1].data, imageData.data)) {
      setHistory([...history, imageData]);
    }
  };

  const undo = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      const lastData = history[history.length - 2];
      setHistory(newHistory);
      setData(lastData);
    } else {
      setData(history[0]);
    }
  };

  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <Control
          changeTool={changeTool}
          resetCanvas={resetCanvas}
          color={color}
          changeColor={changeColor}
          undo={undo}
          tool={tool}
        />
        <Canvas
          tool={tool}
          data={data}
          canvasSize={canvasSize}
          action={tool === 'pen' ? pen : eraser}
          changeHistory={changeHistory}
        />
      </main>
    </div>
  );
}

export default App;
