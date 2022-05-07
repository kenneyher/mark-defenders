function stars(){
  const SIZE = randi(1, 5);
  const SCALE = randi(1, 5);
  const c = [randi(150, 255), randi(100, 255), randi(50, 255)];
  const LIFE = randi(0.5, 5)
  add([
    rect(SIZE, SIZE),
    scale(SCALE),
    color(c[0], c[1], c[2]),
    pos(randi(10, width() - 10), randi(10, height() - 10)),
    lifespan(LIFE, {fade: LIFE/2}),
    layer('bg'),
  ]);

  // wait(randi(0.5, 2), () => stars)
}

export default stars;