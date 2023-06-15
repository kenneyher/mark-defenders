import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

kaboom({
  width: window.innerWidth,
  height: window.innerHeight,
  crisp: true,
  // canvas: document.getElementById('kaboom'),
  background: [0,0,0],
  global: true,
})

loadSprite("construction", "/assets/sprites/construction_ahead.png");
loadFont("sink", "/assets/kitchen_sink.ttf");

scene("default", () => {
  add([
    sprite("construction"),
    anchor("center"),
    pos(width()/2, height()/3),
    scale(2),
  ])
  
  add([
    text("Ooops! We're cleaning some stuff over \nhere... wait a bit!", {font: "sink", align: "center"}),
    anchor("center"),
    pos(width()/2, height()/1.5),
  ]);
})

go('default');