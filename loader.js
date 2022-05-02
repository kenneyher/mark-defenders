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
}

export default loader;