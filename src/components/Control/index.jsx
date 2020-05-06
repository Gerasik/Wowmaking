import React from 'react';

import styles from './style.module.scss';

const Control = ({ changeTool, resetCanvas }) => {
  return (
    <div className={styles.control}>
      <button onClick={() => changeTool('pen')}>P</button>
      <button onClick={() => changeTool('eraser')}>E</button>
      <input type="color" />
      <button onClick={resetCanvas}>R</button>
    </div>
  );
};

export default Control;
