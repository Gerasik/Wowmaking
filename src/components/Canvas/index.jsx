import React, { useEffect, useRef } from 'react';

import styles from './style.module.scss';

const Canvas = ({ data, canvasSize, action, background }) => {
  const element = useRef(document.createElement('canvas'));

  useEffect(() => {
    const canvas = element.current;
    const context = canvas.getContext('2d');
    context.putImageData(data, 0, 0);
  }, [data]);

  function event(e) {
    const target = e.target;
    target.addEventListener('mousemove', action);
    target.addEventListener('mouseleave', () => target.removeEventListener('mousemove', action));
    window.addEventListener('mouseup', () => target.removeEventListener('mousemove', action));
  }

  return (
    <canvas
      ref={element}
      width={canvasSize}
      height={canvasSize}
      onClick={action}
      onMouseMove={background}
      onMouseDown={event}
      className={styles.canvas}
    />
  );
};

export default Canvas;
