import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
import loader from "./loader.js";
import spawnBullet from "./spawnBullet.js";
import spawnEnemy from "./spawnEnemy.js";
import floating from "./floating.js";
import stars from "./stars.js";

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
      bullet: 'mark',
      vel: 200,
    },
    "blue":
    {
      attributes: {health: 5, atk: 1, speed: 'NORMAL', special: 'NONE'},
      bullet: 'blue',
      vel: 200,
    },
    "angry":
    {
      attributes: {health: 2, atk: 2, speed: 'SLOW', special: 'TWO BULLETS'},
      bullet: 'angry',
      vel: 125,
    },
    "cyborg": {
      attributes: {health: 3, atk: 3, speed: 'SLUGGISH', special: 'NONE'},
      bullet: 'cyborg',
      vel: 100,
    },
    "markachu":
    {
      attributes: {health: 3, atk: 2, speed: 'NORMAL', special: 'NONE'},
      bullet: 'markachu',
      vel: 200,
    },
    "ironmark":
    {
      attributes: {health: 3, atk: 1, speed: 'FAST', special: 'DOUBLE BULLETS'},
      bullet: 'ironmark',
      vel: 250,
    },
    "notmark":
    {
      attributes: {health: 3, atk: 1, speed: 'NORMAL', special: 'THREE BULLETS'},
      bullet: 'notmark',
      vel: 200,
    },
    "bean":
    {
      attributes: {health: 5, atk: 2, speed: 'SLOW', special: 'NONE'},
      bullet: 'bean',
      vel: 125,
    },
  }
}

scene('main', () => {
  stars();
  const MAIN_MUSIC = play('main-screen', {volume: 0.35, loop: true});
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

  p.onClick(() => go('choose', MAIN_MUSIC));
})

scene('choose', (music) => {
  stars();
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
  const NAMES = ['MARK', 'BLUE MARK', 'ANGRY MARK', 'CYBORG MARK', 'MARKACHU', 'IRON MARK', 'NOT MARK', 'BEAN'];
  const INFO = ['oh hi mark.', 'hmm... you look like mark', 'just chill out mark', "who knows if he came from the future or the past", 'welp, maybe we need a pokeball', 'he is part of a music band i think', 'you should be in click the mark, also, go and try it', "he's not mark but it'll work"];
  const s = ['mark', 'blue', 'angry', 'cyborg', 'markachu', 'ironmark', 'notmark', 'bean'];

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
    m.frame = m.frame == 14 ? 0 : m.frame + 2;
    m.char = m.char == 7 ? 0 : m.char + 1;
  })
  onKeyPress('left', () => {
    m.frame = m.frame == 0 ? 14 : m.frame - 2;
    m.char = m.char == 0 ? 7 : m.char - 1;
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
    music.stop();
  })
  onKeyPress('enter', () => {
    go('play', s[m.char])
    music.stop();
  })
})

scene('play', (m) => {
  layers(['bg', 'game', 'fx', 'ui']);
  const wall1 = add([
    rect(width(), 0),
    opacity(0),
    solid(),
    area(),
    pos(0, 0),
  ])
  const wall2 = add([
    rect(width(), 10),
    opacity(0),
    solid(),
    area(),
    pos(0, height()),
  ])
  const song = choose(['song1', 'song2', 'song3']);
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
    area({scale: 0.6}),
    health(Game.chars[s].attributes.health),
    origin('center'),
    layer('game'),
    {
      up: false,
      down: false,
      w: false,
      s: false,
    }
  ])

  add([
    text('HEALTH:', {sie: 20}),
    color(255, 250, 113),
    layer('ui'),
    z(10),
    pos(width()/2 - 150, 20),
  ])

  for(let i=0; i<mark.hp(); i++){
    add([
      sprite('lilmark'),
      scale(2),
      pos(width()/2 + 40*i, 30),
      z(10),
      origin('center'),
      'lil marks',
    ])
  }

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

  loop(0.2, () => {
    stars();
  })
  // onKeyDown('up')

  loop(0.3, () => {
    if(mark.exists()){
      spawnBullet(mark.pos, Game.chars[s].bullet, 'player', Game.chars[s].attributes.special);
      play('shoot', {volume: 0.05, speed: 6})
    }
  })

  onCollide('enemy', 'bullet', (e, b) => {
    b.destroy();
    e.hurt(Game.chars[s].attributes.atk);
    // play('ka-boom', {volume: 0.35})
  })
  mark.onCollide('dangerous', (d) => {
    d.destroy();
    shake();
    mark.hurt(1);
    play('hurt', {volume: 0.2, speed: 1.5})
  })
  mark.onCollide('enemy', (e) => {
    play('hurt', {volume: 0.2, speed: 1.5})
    mark.setHP(0);
  })
  mark.onDeath(() => {
    shake(200);
    addKaboom(mark.pos);
    mark.destroy();
    play('ka-boom', {volume: 0.2})
    wait(0.8, () => music.stop());
    wait(0.8, () => go('game over', score));
  })
  on('death', 'enemy', (e) => {
    play('ka-boom', {volume: 0.2, speed: 1.5})
    addKaboom(e.pos, {scale: 0.8});
    e.destroy();
    score++;
  })

  onUpdate('enemy', (e) => {
    e.t += dt();
    if(e.is('wavy')){
      e.speedY = wave(-100, 100, time() * 1.5)
    }
    if(e.is('double')){
      if(e.t >= 1.75){
        wait(0.0000001, () => e.t = 0)
        spawnBullet(e.pos, 'hi', 'enemy', 'none', vec2(-200, 30));
        spawnBullet(e.pos, 'hi', 'enemy', 'none', vec2(-200, -30));
      }
      e.speedY = wave(-100, 100, time() * 1.5)
      // debug.log(e.speedY);
    }
    if(e.is('triple')){
      if(e.t >= 1.75){
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
    e.move(e.speed, e.speedY);
  })

  spawnEnemy();

  let l = 1.5;
  let t = 0;
  onUpdate(() => {
    mark.pushOut(wall1)
    mark.pushOut(wall2)
    t += dt();
    if(t >= l){
      spawnEnemy();
      wait(0.001, () => t = 0)
    }

    if(score > 25){
      l = 1;
    }
    if(score > 50){
      l = 0.8
    }

    if(mark.hp() < get('lil marks').length){
      get('lil marks')[0].destroy();
    }
  })
})

scene('game over', (s) => {
  play('death', {volume: 0.35, })
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

