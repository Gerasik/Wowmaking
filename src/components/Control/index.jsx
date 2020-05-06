import React from 'react';

import penSvg from '../../assets/pen-solid.svg';
import trashSvg from '../../assets/trash-solid.svg';
import eraserSvg from '../../assets/eraser-solid.svg';
import undoSvg from '../../assets/undo-solid.svg';
import styles from './style.module.scss';

const Control = ({ tool, changeTool, resetCanvas, color, changeColor, undo }) => {
  const activeStyle = {
    boxShadow: 'inset 0px 0px 5px 0px black',
  };

  return (
    <div className={styles.control}>
      <button onClick={() => changeTool('pen')} style={tool === 'pen' ? activeStyle : null}>
        <img src={penSvg} alt="pen" width="20" />
      </button>
      <button onClick={() => changeTool('eraser')} style={tool === 'eraser' ? activeStyle : null}>
        <img src={eraserSvg} alt="eraser" width="20" />
      </button>
      <input type="color" value={color} onChange={changeColor} />
      <button onClick={resetCanvas}>
        <img src={trashSvg} alt="trash" width="20" />
      </button>
      <button onClick={undo}>
        <img src={undoSvg} alt="undo" width="20" />
      </button>
    </div>
  );
};

export default Control;
