import React from 'react';

import styles from './style.module.scss';

const Control = ({ changeTool, resetCanvas, color, changeColor, undo }) => {
  return (
    <div className={styles.control}>
      <button onClick={() => changeTool('pen')}>Pen</button>
      <button onClick={() => changeTool('eraser')}>Eraser</button>
      <input type="color" value={color} onChange={changeColor} />
      <button onClick={resetCanvas}>Reset</button>
      <button onClick={undo}>undo</button>
    </div>
  );
};

export default Control;
