import React, { useEffect, useRef } from 'react';

import styles from './style.module.scss';

const Canvas = ({ data, canvasSize, action }) => {
  const element = useRef(document.createElement('canvas'));

  useEffect(() => {
    const canvas = element.current;
    const context = canvas.getContext('2d');
    context.putImageData(data, 0, 0);
  }, [data]);

  const event = (e) => {
    const target = e.target;
    target.addEventListener('mousemove', action);
    window.addEventListener('mouseup', () => target.removeEventListener('mousemove', action));
  };

  return (
    <canvas
      ref={element}
      width={canvasSize}
      height={canvasSize}
      onClick={action}
      onMouseDown={event}
      className={styles.canvas}
    />
  );
};

export default Canvas;
