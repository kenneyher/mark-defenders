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
    sliceY: 2,
    anims: {
      basic: {from: 0, to: 1, loop: true, speed: 7},
      wavy: {from: 2, to: 3, loop: true, speed: 7},
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
}

export default loader;