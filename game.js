import kaboom from "./kaboom.mjs";
import loader from "./loader.js";

const boomOpts = {
  width: 720,
  height: 400,
  canvas: document.getElementById('kaboom'),
  crisp: true,
  background: [0,0,0],
  global: true,
  font: 'kafont',
}

kaboom(boomOpts);
loader();

const Game = {
  chars:{
    "mark":
    {
      attributes: {health: 3, atk: 1, speed: 5}
    },
    "blue":
    {
      attributes: {health: 5, atk: 1, speed: 5}
    },
    "angry":
    {
      attributes: {health: 3, atk: 2, speed: 2}
    },
    "cyborg": {
      attributes: {health: 5, atk: 3, speed: 1}
    }
  }
}

scene('main', () => {
  onKeyPress('f', () => {
    fullscreen(!isFullscreen())
  })
  add([
    text('MARK DEFENDERS', {
      letterSpacing: -6,
      transform: (idx, chr) => ({
        angle: wave(-9, 9, time() * 3 + idx),
      })
    }),
    scale(2),
    pos(width()/2, height()/6),
    origin('center'),
    color(255, 250, 113)  
  ])

  let p = add([
    text('PLAY', {
      letterSpacing: -6,
      size: 40,
      transform: (idx, chr) => ({
        angle: wave(-9, 9, time() * 3 + idx),
        pos: vec2(0, wave(-2, 2, time() * 3 + idx)),
      })
    }),
    pos(width()/2, height()/2),
    origin('center'),
    area(),
    color(255, 250, 113)
  ])

  p.onClick(() => go('choose'));
})

scene('choose', () => {
  onKeyPress('f', () => {
    fullscreen(!isFullscreen())
  })
  add([
    text('CHOOSE YOUR MARK', {
      letterSpacing: -6,
      transform: (idx, chr) => ({
        pos: vec2(0, wave(-3, 3, time() * 3 + idx)),
      })
    }),
    scale(2),
    pos(width()/2, height()/7),
    origin('center'),
    color(255, 250, 113),
  ])
  const NAMES = ['MARK', 'BLUE MARK', 'ANGRY MARK', 'CYBORG MARK'];
  const INFO = ['oh hi mark.', 'hmm... you look like mark', 'just chill out mark', "oh no, are you looking for mark connors?"];
  const s = ['mark', 'blue', 'angry', 'cyborg'];

  let m = add([
    sprite('marks', {frame: 0}),
    pos(width()/2, height()/2.5),
    scale(5),
    origin('center'), 
    {
      char: 0,
    }
  ])

  onKeyPress('right', () => {
    m.frame = m.frame == 6 ? 0 : m.frame + 2;
    m.char = m.char == 3 ? 0 : m.char + 1;
  })
  onKeyPress('left', () => {
    m.frame = m.frame == 0 ? 6 : m.frame - 2;
    m.char = m.char == 0 ? 3 : m.char - 1;
  })

  let i = add([
    text(INFO[m.char].toUpperCase(), {size: 20, width: width() - 50, letterSpacing: -6}),
    pos(width()/2, height()/1.5),
    origin('center'),
    color(255, 250, 113),
  ])
  let n = add([
    text(NAMES[m.char], {size: 30, width: width() - 50, letterSpacing: -6}),
    pos(width()/2, height()/1.7),
    origin('center'),
  ])
  let a = add([
    text(` [HEALTH: ${Game.chars[s[m.char]].attributes.health}].green\n [ATTACK: ${Game.chars[s[m.char]].attributes.atk}].red\n [SPEED: ${Game.chars[s[m.char]].attributes.speed}].blue`,
          {
            size: 20, width: width() - 50, 
            letterSpacing: -6,
            styles: {
              "green": { color: rgb(147, 250, 113)},
              "red": { color: rgb(255, 32, 90)},
              "blue": { color: rgb(53, 160, 255)},
            }
          }),
    pos(width()/2, height()/1.2),
    origin('center'),
  ])
  onUpdate(() => {
    i.text = INFO[m.char].toUpperCase();
    n.text = NAMES[m.char];
    a.text = `[HEALTH: ${Game.chars[s[m.char]].attributes.health}].green\n [ATTACK: ${Game.chars[s[m.char]].attributes.atk}].red\n [SPEED: ${Game.chars[s[m.char]].attributes.speed}].blue`
  })

  let p = add([
    text('GO', {
      letterSpacing: -6,
      size: 40,
      transform: (idx, ch) => ({
        angle: wave(-9, 9, time() * 3 + idx),
        pos: vec2(0, wave(-2, 2, time() * 3 + idx * 0.5)),
      })
    }),
    pos(width() - 50, height() - 50),
    origin('center'),
    area(),
    color(96, 250, 113)
  ])

  p.onClick(() => {
    go('play', s[m.char])
  })
})

scene('play', (m) => {
  onKeyPress('f', () => {
    fullscreen(!isFullscreen())
  })
  const s = m.toLowerCase();
  let mark = add([
    sprite('marks', {anim: `${s}Idle`}),
    pos(50, height()/2),
    scale(2),
    area(),
    origin('center')
  ])
})

go('main')

