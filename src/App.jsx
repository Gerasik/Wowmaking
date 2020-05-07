import React, { useState } from 'react';

import toolsConstants from 'constants.tools';
import { getPosition, compare } from 'utils';
import Canvas from 'components/Canvas';
import Control from 'components/Control';
import styles from './app.module.scss';

function App() {
  const canvasSize = 10;
  const emptyData = new ImageData(canvasSize, canvasSize);
  const [tool, setTool] = useState(toolsConstants.PEN);
  const [data, setData] = useState(emptyData);
  const [color, setColor] = useState('#fefefe');
  const [history, setHistory] = useState([emptyData]);
  const [redoHistory, setRedoHistory] = useState([]);

  const changeTool = (tool) => {
    setTool(tool);
  };

  const resetCanvas = () => {
    changeHistory(emptyData);
    setData(emptyData);
  };

  const pen = (e) => {
    const { x, y, context } = getPosition(e, canvasSize);
    context.fillStyle = color;
    context.fillRect(x, y, 1, 1);
    changeHistory(context.getImageData(0, 0, canvasSize, canvasSize));
  };

  const eraser = (e) => {
    const { x, y, context } = getPosition(e, canvasSize);
    context.clearRect(x, y, 1, 1);
    changeHistory(context.getImageData(0, 0, canvasSize, canvasSize));
  };

  const changeColor = (e) => {
    setColor(e.target.value);
  };

  const changeHistory = (imageData) => {
    if (!compare(history[history.length - 1].data, imageData.data)) {
      setHistory([...history, imageData]);
    }
  };

  const undo = () => {
    if (history.length > 1) {
      setRedoHistory([...redoHistory, history[history.length - 1]]);
      const newHistory = history.slice(0, -1);
      const lastData = history[history.length - 2];
      setHistory(newHistory);
      setData(lastData);
    } else {
      setData(history[0]);
    }
  };

  const redo = () => {
    const newHistory = redoHistory.slice(0, -1);
    const lastData = redoHistory[redoHistory.length - 1];
    console.log('redo', lastData);
    changeHistory(lastData);
    setHistory([...history, lastData]);
    setData(lastData);
    setRedoHistory(newHistory);
  };

  const toolList = {
    [toolsConstants.PEN]: pen,
    [toolsConstants.ERASER]: eraser,
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
          redo={redo}
          redoHistory={redoHistory}
        />
        <Canvas
          tool={tool}
          data={data}
          canvasSize={canvasSize}
          action={toolList[tool]}
          changeHistory={changeHistory}
        />
      </main>
    </div>
  );
}

export default App;
