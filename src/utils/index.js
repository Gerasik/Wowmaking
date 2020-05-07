export const getPosition = (e, canvasSize) => {
  const context = e.target.getContext('2d');
  try {
    const position = {
      x: Math.floor(((e.offsetX || e.nativeEvent.offsetX) * canvasSize) / 500),
      y: Math.floor(((e.offsetY || e.nativeEvent.offsetY) * canvasSize) / 500),
      context,
    };
    return position;
  } catch (e) {
    console.error(e);
  }
  return {
    x: -1,
    y: -1,
    context,
  };
};

export const compare = (a1, a2) => {
  return a1.every((v, i) => v === a2[i]);
};
