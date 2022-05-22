function loader(){
  loadFont('kafont', 'assets/sprites/ka-font.png', 20, 20, {chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ.,?':1234567890",});
  loadSprite('marks', 'assets/sprites/marksv4.png', {
    sliceX: 3,
    sliceY: 11,
    anims: {
      markIdle: {from: 0, to: 1, loop: true, speed: 6},
      markHit: 2,
      blueIdle: {from: 3, to: 4, loop: true, speed: 6},
      blueHit: 5,
      angryIdle: {from: 6, to: 7, loop: true, speed: 6},
      angryHit: 8,
      cyborgIdle: {from: 9, to: 10, loop: true, speed: 6},
      cyborgHit: 11,
      markachuIdle: {from: 12, to: 13, loop: true, speed: 6},
      markachuHit: 14,
      ironmarkIdle: {from: 15, to: 16, loop: true, speed: 6},
      ironmarkHit: 17,
      notmarkIdle: {from: 18, to: 19, loop: true,speed: 6},
      notmarkHit: 20,
      beanIdle: {from: 21, to: 22, loop: true, speed: 6},
      beanHit: 23,
      ninjaIdle: {from: 24, to: 25, loop: true, speed: 6},
      ninjaHit: 26,
      shadowIdle: {from: 27, to: 28, loop: true, speed: 6},
      shadowHit: 29,
      cowboyIdle: {from: 30, to: 31, loop: true, speed: 6},
      cowboyHit: 32,
    }
  })
  loadSprite('boom', 'assets/sprites/boom.png', {
    sliceX: 3,
    sliceY: 2,
    anims: {
      explode: {from: 0, to: 3},
    }
  })
  loadSprite('aliens', 'assets/sprites/enemies.png', {
    sliceX: 2,
    sliceY: 4,
    anims: {
      basic: {from: 0, to: 1, loop: true, speed: 7},
      wavy: {from: 2, to: 3, loop: true, speed: 7},
      triple: {from: 4, to: 5, loop: true, speed: 7},
      double: {from: 6, to: 7, loop: true, speed: 7},
    }
  })
  loadSprite('bullets', 'assets/sprites/bullets.png', {
    sliceX: 6,
    sliceY: 6,
    anims: {
      mark: {from: 0, to: 2, loop: true, speed: 7},
      blue: {from: 3, to: 5, loop: true, speed: 7},
      angry: {from: 6, to: 8, loop: true, speed: 7},
      cyborg: {from: 9, to: 11, loop: true, speed: 7},
      markachu: {from: 12, to: 14, loop: true, speed: 7},
      ironmark: {from: 15, to: 17, loop: true, speed: 7},
      notmark: {from: 18, to: 20, loop: true, speed: 7},
      bean: {from: 21, to: 23, loop: true, speed: 7},
      ninja: {from: 24, to:  26, loop: true, speed: 7},
      shadow: {from: 27, to: 29, loop: true, speed: 7},
      cowboy: {from: 30, to: 32, loop: true, speed: 7},
    }
  })
  loadSprite('e-bullet', 'assets/sprites/e-bullet.png', {
    sliceX: 2,
    sliceY: 1,
    anims: {
      idle: {from: 0, to: 1, loop: true, speed: 5}
    }
  })
  loadSprite('boss', 'assets/sprites/boss1.png', {
    sliceX: 2,
    sliceY: 1,
    anims: {
      idle: {from: 0, to: 1, loop: true, speed: 5}
    }
  })
  loadSprite('screen1', 'assets/sprites/screen1.png')
  loadSprite('screen2', 'assets/sprites/screen2.png')
  loadSprite('lilmark', 'assets/sprites/lifes.png')

  loadSound('song1', 'assets/sounds/lost-in-space.wav');
  loadSound('song2', 'assets/sounds/far-out.mp3');
  loadSound('song3', 'assets/sounds/wormhole-ahead.wav');
  loadSound('main-screen', 'assets/sounds/defenders.wav');
  loadSound('death', 'assets/sounds/death.wav');
  loadSound('hurt', 'assets/sounds/hurt.wav');
  loadSound('ka-boom', 'assets/sounds/ka-boom.wav');
  loadSound('shoot', 'assets/sounds/shoot.wav');
  loadSound('boss', 'assets/sounds/lost-in-the-void.mp3');
}

export default loader;