import kaboom from "./kaboom.mjs";
import loader from "./loader.js";
import spawnBullet from "./spawnBullet.js";
import spawnEnemy from "./spawnEnemy.js";
import floating from "./floating.js";

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
  layers: ['bg', 'game', 'fx', 'ui'],
  highscore: 0,
  chars:{
    "mark":
    {
      attributes: {health: 3, atk: 1, speed: 'NORMAL', special: 'NONE'},
      bullet: 0,
      vel: 200,
    },
    "blue":
    {
      attributes: {health: 5, atk: 1, speed: 'NORMAL', special: 'NONE'},
      bullet: 1,
      vel: 200,
    },
    "angry":
    {
      attributes: {health: 2, atk: 2, speed: 'SLOW', special: 'TWO BULLETS'},
      bullet: 2,
      vel: 125,
    },
    "cyborg": {
      attributes: {health: 2, atk: 3, speed: 'SLUGGISH', special: 'NONE'},
      bullet: 3,
      vel: 100,
    }
  }
}

scene('main', () => {
  layers(Game.layers);
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
    color(255, 250, 113),
    layer('ui'),
  ])
  
  add([
    sprite('screen1'),
    scale(10),
    pos(160, height()/2),
    origin('center'),
    layer('bg'),
    floating(),
  ])
  add([
    sprite('screen2'),
    scale(10),
    pos(width() - 160, height()/2),
    origin('center'),
    layer('bg'),
    floating(),
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
    color(255, 250, 113),
    layer('ui'),
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
    text(`[HEALTH: ${Game.chars[s[m.char]].attributes.health}].green
[ATTACK: ${Game.chars[s[m.char]].attributes.atk}].red
          [SPEED: ${Game.chars[s[m.char]].attributes.speed}].blue
          [SPECIAL: ${Game.chars[s[m.char]].attributes.special}].yellow`,
          {
            size: 20, width: width() - 50, 
            letterSpacing: -6,
            styles: {
              "green": { color: rgb(147, 250, 113)},
              "red": { color: rgb(255, 32, 90)},
              "blue": { color: rgb(53, 160, 255)},
              "yellow": { color: rgb(255, 214, 66)},
            }
          }),
    pos(width()/2, height()/1.2),
    origin('center'),
  ])
  onUpdate(() => {
    i.text = INFO[m.char].toUpperCase();
    n.text = NAMES[m.char];
    a.text = `[HEALTH: ${Game.chars[s[m.char]].attributes.health}].green
    [ATTACK: ${Game.chars[s[m.char]].attributes.atk}].red
    [SPEED: ${Game.chars[s[m.char]].attributes.speed}].blue
    [SPECIAL: ${Game.chars[s[m.char]].attributes.special}].yellow`
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
    color(96, 250, 113),
  ])

  p.onClick(() => {
    go('play', s[m.char])
  })
  onKeyPress('enter', () => {
    go('play', s[m.char])
  })
})

scene('play', (m) => {
  const song = choose(['song1', 'song2']);
  const music = play(song, {volume: 0.3, loop: true,})
  let score = 0;
  const s = m.toLowerCase();
  const SPEED = Game.chars[s].vel;

  const scoreLabel = add([
    text(`${score}`, {letterSpacing: -6, size: 25 ,}),
    pos(width() - 60, 20),
    layer('ui'),
    z(100),
    origin('center'),
    fixed(),
  ])
  scoreLabel.onUpdate(() => {
    scoreLabel.text = score;
  })

  onKeyPress('f', () => {
    fullscreen(!isFullscreen())
  })

  let mark = add([
    sprite('marks', {anim: `${s}Idle`}),
    pos(50, height()/2),
    scale(2),
    area({scale: 0.8}),
    health(Game.chars[s].attributes.health),
    origin('center'),
    {
      up: false,
      down: false,
      w: false,
      s: false,
    }
  ])

  onKeyDown('up', () => {
    if(isKeyDown('w')){
      mark.move(0, -SPEED)
    }else {
      mark.move(0, -SPEED)
    }
  })
  onKeyDown('w', () => {
    if(isKeyDown('up')){
      mark.move(0, -SPEED)
    }else {
      mark.move(0, -SPEED)
    }
  })
  onKeyDown('down', () => {
    if(isKeyDown('s')){
      mark.move(0, SPEED)
    }else {
      mark.move(0, SPEED)
    }
  })
  onKeyDown('s', () => {
    if(isKeyDown('down')){
      mark.move(0, SPEED)
    }else {
      mark.move(0, SPEED)
    }
  })
  // onKeyDown('up')

  loop(0.4, () => {
    if(mark.exists()){
      spawnBullet(mark.pos, Game.chars[s].bullet, 'player', Game.chars[s].attributes.special)
    }
  })

  onCollide('enemy', 'bullet', (e, b) => {
    b.destroy();
    e.hurt(Game.chars[s].attributes.atk);
  })
  mark.onCollide('dangerous', (d) => {
    d.destroy();
    mark.hurt(1);
  })
  mark.onDeath(() => {
    addKaboom(mark.pos);
    mark.destroy();
    wait(0.8, () => music.stop());
    wait(0.8, () => go('game over', score));
  })
  on('death', 'enemy', (e) => {
    addKaboom(e.pos, {scale: 0.8});
    e.destroy();
    score++;
  })

  onUpdate('enemy', (e) => {
    let speedY = 0;
    e.t += dt();
    if(e.is('wavy')){
      speedY = wave(-100, 100, time() * 1.5)
    }
    if(e.is('triple')){
      if(e.t >= 1.5){
        wait(0.0000001, () => e.t = 0)
        spawnBullet(e.pos, 'hi', 'enemy', 'none', vec2(-200, 30))
        spawnBullet(e.pos, 'hi', 'enemy', 'none', vec2(-200, 0));
        spawnBullet(e.pos, 'hi', 'enemy', 'none', vec2(-200, -30));
      }
    }else {
      if(e.t >= 1.75){
        wait(0.0000001, () => e.t = 0)
        spawnBullet(e.pos, 'hi', 'enemy', 'none', vec2(-100, 0))
      }
    }
    e.move(-100, speedY)
  })

  let t = 0;
  onUpdate(() => {
    t += dt();
    if(t >= 1.5){
      spawnEnemy();
      wait(0.001, () => t = 0)
    }
  })
})

scene('game over', (s) => {
  const newhs = s > Game.highscore ? true : false;
  Game.highscore = s > Game.highscore ? s : Game.highscore;
  const PHRASES = {low: ["HMM... THAT'S KINDA DISSAPOINTING BRO", "YEAP, EARTH IS LOST", "MY GRANDMA CAN DO MORE DUDE", "SORRY MARK"], mid: ["I THINK YOU CAN DO MORE", 'YEAH, ALIENS ARE COOLER THO', "IS THAT YOUR BEST?", "WE'RE GETTING READY NOW", "THAT'S WHAT I WAS TALKING ABOUT"], high: ["MARK IS SO PROUD OF YOU", "MARK SAYS YOU'RE COOL", "BE AFRAID ALIENS", "YOU SHALL NOT PASS", "AWESOME DUDE"]}
  let c;
  let l;
  if(s < 25){
    l = 'low';
    c = rgb(255, 0, 64)
  }else if(s >= 25 && s <= 50){
    l = 'mid';
    c = rgb(0, 139, 180)
  }else if(s > 50){
    l = 'high'
    c = rgb(0, 255, 173)
  }
  const p = choose(PHRASES[l]);
  add([
    text('GAME OVER', {
      letterSpacing: -6,
      transform: (idx, chr) => ({
        angle: wave(-9, 9, time() * 3 + idx),
      })
    }),
    scale(2),
    pos(width()/2, height()/6),
    origin('center'),
    color(255, 64, 64),
  ])
  let score = add([
    text('YOUR SCORE: ' + s, {
      letterSpacing: -6,
    }),
    scale(1.5),
    pos(width()/2, height()/4),
    origin('right'),
    // color(255, 64, 64),
  ])
  let highscore = add([
    text('YOUR HIGHSCORE: ' + Game.highscore, {
      letterSpacing: -6,
    }),
    scale(1.5),
    pos(width()/2, height()/2),
    origin('center'),
    color(255, 230, 105),
  ])
  if(newhs){
    add([
      text('NEW HIGHSCORE', {
        letterSpacing: -2,
        size: 10,
        transform: (idx, ch) => ({
          color: hsl2rgb(wave(0, 1, time() * 1.5 + idx), wave(0.5, 1, time() * 3 + idx), wave(0.5, 0.8, time() * 2 + idx)),
          pos: vec2(0, wave(-3, 3, time() * 1.2 + idx))
        })
      }),
      scale(1.5),
      pos(highscore.pos.x - 100, highscore.pos.y - 30),
      origin('center'),
      // color(155, 230, 105),
    ])
  }
  let phrase = add([
    text(p, {
      letterSpacing: -2,
      size: 18,
      width: width() - 50
    }),
    // scale(1.5),
    pos(width()/2, height()/3),
    origin('center'),
    color(c),
  ])

  onKeyPress('enter', () => go('main'));
  let m = add([
    text('MAIN MENU', {
      letterSpacing: -6,
      size: 40,
      transform: (idx, ch) => ({
        angle: wave(-9, 9, time() * 3 + idx),
        pos: vec2(0, wave(-2, 2, time() * 3 + idx * 0.5)),
      })
    }),
    pos(width() - 200, height() - 50),
    origin('center'),
    area(),
    // color(96, 250, 113),
  ])

  m.onClick(() => {
    go('main')
  })

})

go('main')

