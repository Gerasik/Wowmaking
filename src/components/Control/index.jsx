import React from 'react';
import classNames from 'classnames';

import toolsConstants from 'constants.tools';
import penSvg from 'assets/pen-solid.svg';
import trashSvg from 'assets/trash-solid.svg';
import eraserSvg from 'assets/eraser-solid.svg';
import undoSvg from 'assets/undo-solid.svg';
import styles from './style.module.scss';

const Control = ({
  tool,
  changeTool,
  resetCanvas,
  color,
  changeColor,
  undo,
  redo,
  redoHistory,
}) => {
  return (
    <div className={styles.control}>
      <button
        onClick={() => changeTool(toolsConstants.PEN)}
        className={classNames(styles.pen, { [styles.active]: tool === toolsConstants.PEN })}
      >
        <img src={penSvg} alt="pen" width="20" />
      </button>
      <button
        onClick={() => changeTool(toolsConstants.ERASER)}
        className={classNames(styles.eraser, { [styles.active]: tool === toolsConstants.ERASER })}
      >
        <img src={eraserSvg} alt="eraser" width="20" />
      </button>
      <input type="color" value={color} onChange={changeColor} className={styles.color} />
      <button onClick={resetCanvas} className={styles.reset}>
        <img src={trashSvg} alt="trash" width="20" />
      </button>
      <button onClick={undo} className={styles.undo}>
        <img src={undoSvg} alt="undo" width="20" />
      </button>
      <button onClick={redo} className={styles.redo} disabled={!redoHistory.length}>
        <img src={undoSvg} alt="redo" width="20" />
      </button>
    </div>
  );
};

export default Control;
