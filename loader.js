function loader(){
  loadFont('kafont', 'assets/sprites/ka-font.png', 20, 20, {chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ.,?':1234567890",});
  loadSprite('marks', 'assets/sprites/marksv3.png', {
    sliceX: 2,
    sliceY: 10,
    anims: {
      markIdle: 0,
      markHit: 1,
      blueIdle: 2,
      blueHit: 3,
      angryIdle: 4,
      angryHit: 5,
      cyborgIdle: 6,
      cyborgHit: 7,
      markachuIdle: 8,
      markachuHit: 9,
      ironmarkIdle: 10,
      ironmarkHit: 11,
      notmarkIdle: 12,
      notmarkHit: 13,
      beanIdle: 14,
      beanHit: 15,
      ninjaIdle: 16,
      ninjaHit: 17,
      shadowIdle: 18,
      shadowHit: 19,
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
    sliceX: 4,
    sliceY: 5,
    anims: {
      mark: {from: 0, to: 1, loop: true, speed: 7},
      blue: {from: 2, to: 3, loop: true, speed: 7},
      angry: {from: 4, to: 5, loop: true, speed: 7},
      cyborg: {from: 6, to: 7, loop: true, speed: 7},
      markachu: {from: 8, to: 9, loop: true, speed: 7},
      ironmark: {from: 10, to: 11, loop: true, speed: 7},
      notmark: {from: 12, to: 13, loop: true, speed: 7},
      bean: {from: 14, to: 15, loop: true, speed: 7},
      ninja: {from: 16, to:  17, loop: true, speed: 7},
      shadow: {from: 18, to: 19, loop: true, speed: 7},
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

  loadSound('song1', 'assets/sounds/among-the-stars.mp3');
  loadSound('song2', 'assets/sounds/far-out.mp3');
  loadSound('song3', 'assets/sounds/wormhole-ahead.mp3');
  loadSound('main-screen', 'assets/sounds/defenders.wav');
  loadSound('death', 'assets/sounds/death.wav');
  loadSound('hurt', 'assets/sounds/hurt.wav');
  loadSound('ka-boom', 'assets/sounds/ka-boom.wav');
  loadSound('shoot', 'assets/sounds/shoot.wav');
  loadSound('boss', 'assets/sounds/lost-in-the-void.mp3');
}

export default loader;