import React, { useEffect, useRef } from 'react';

import styles from './style.module.scss';

const Canvas = ({ tool, data, canvasSize, action }) => {
  const element = useRef(document.createElement('canvas'));
  const canvas = element.current;

  useEffect(() => {
    console.log(data);
    canvas.getContext('2d').putImageData(data, 0, 0);
  }, [data, canvas]);

  function updateCanvas() {
    console.log(element.current);
    console.dir(element.current);

    const ctx = element.current.getContext('2d');
    ctx.fillRect(0, 0, 100, 100);
  }

  function event(e) {
    // console.log(e.target);
    const target = e.target;
    const fn = tool === 'pen' ? draw : eraser;
    target.addEventListener('mousemove', fn);
    window.addEventListener('mouseup', () => target.removeEventListener('mousemove', fn));
  }

  const eraser = (e) => {
    const x = Math.floor((e.offsetX * canvasSize) / 500);
    const y = Math.floor((e.offsetY * canvasSize) / 500);
    const ctx = element.current.getContext('2d');
    ctx.clearRect(x, y, 1, 1);
  };

  const draw = (e) => {
    // if (isDrawing === true) {
    //   drawLine(context, x, y, e.offsetX, e.offsetY);
    //   x = e.offsetX;
    //   y = e.offsetY;
    // }
    const x = Math.floor((e.offsetX * canvasSize) / 500);
    const y = Math.floor((e.offsetY * canvasSize) / 500);
    const ctx = element.current.getContext('2d');
    // console.dir(ctx);
    console.log(ctx.getImageData(0, 0, 100, 100));
    ctx.fillRect(x, y, 1, 1);
    // console.log((e.offsetX * 100) / 500, (e.offsetY * 100) / 500);
  };

  function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  }

  return (
    <canvas
      ref={element}
      width={canvasSize}
      height={canvasSize}
      // onClick={updateCanvas}
      onMouseDown={event}
      className={styles.canvas}
    />
  );
};

export default Canvas;
