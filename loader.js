function loader(){
  loadFont('kafont', 'assets/sprites/ka-font.png', 20, 20, {chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ.,?':1234567890",});
  loadSprite('marks', 'assets/sprites/marksv1.png', {
    sliceX: 2,
    sliceY: 3.99,
    anims: {
      markIdle: 0,
      markHit: 1,
      blueIdle: 2,
      blueHit: 3,
      angryIdle: 4,
      angryHit: 5,
      cyborgIdle: 6,
      cyborgHit: 7,
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
    sliceY: 3,
    anims: {
      basic: {from: 0, to: 1, loop: true, speed: 7},
      wavy: {from: 2, to: 3, loop: true, speed: 7},
      triple: {from: 4, to: 5, loop: true, speed: 7},
    }
  })
  loadSprite('bullets', 'assets/sprites/bullets.png', {
    sliceX: 4,
    sliceY: 1,
  })
  loadSprite('e-bullet', 'assets/sprites/e-bullet.png', {
    sliceX: 2,
    sliceY: 1,
    anims: {
      idle: {from: 0, to: 1, loop: true, speed: 5}
    }
  })
  loadSprite('screen1', 'assets/sprites/screen1.png')
  loadSprite('screen2', 'assets/sprites/screen2.png')

  loadSound('song1', 'assets/sounds/among-the-stars.mp3');
  loadSound('song2', 'assets/sounds/far-out.mp3');
  loadSound('song3', 'assets/sounds/wormhole-ahead.mp3');
  loadSound('main-screen', 'assets/sounds/defenders.mp3');
  loadSound('death', 'assets/sounds/death.wav');
  loadSound('hurt', 'assets/sounds/hurt.wav');
  loadSound('ka-boom', 'assets/sounds/ka-boom.wav');
  loadSound('shoot', 'assets/sounds/shoot.wav');
}

export default loader;