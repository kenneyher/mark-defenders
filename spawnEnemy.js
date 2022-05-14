function spawnEnemy(){
  let type = choose(['basic', 'wavy', 'triple', 'double']);
  if(type == 'basic'){
    add([
      sprite('aliens', {anim: 'basic', flipX: true}),
      origin('center'),
      area({scale: 0.8}),
      scale(2),
      pos(width() - 20, rand(50, height() - 50)),
      health(4),
      layer('game'),
      "enemy",
      'basic',
      {
        t: 0,
        speed: -120,
        speedY: 0,
      }
    ])
  }else if(type == 'wavy'){
    add([
      sprite('aliens', {anim: 'wavy', flipX: true}),
      origin('center'),
      area({scale: 0.8}),
      scale(2),
      pos(width() - 20, rand(100, height() - 100)),
      health(4),
      layer('game'),
      "enemy",
      'wavy',
      {
        t: 0,
        speed: -120,
        speedY: 0,
      }
    ])
  }else if(type == 'triple'){
    add([
      sprite('aliens', {anim: 'triple', flipX: true}),
      origin('center'),
      area({scale: 0.8}),
      scale(2),
      pos(width() - 20, rand(50, height() - 50)),
      health(7),
      layer('game'),
      "enemy",
      "triple",
      {
        t: 0,
        speed: -70,
        speedY: 0,
      }
    ])
  }else if(type == 'double'){
    add([
      sprite('aliens', {anim: 'double', flipX: true}),
      origin('center'),
      area({scale: 0.8}),
      scale(2),
      layer('game'),
      pos(width() - 20, rand(50, height() - 50)),
      health(7),
      "enemy",
      "double",
      {
        t: 0,
        speed: -120,
        speedY: 0,
      }
    ])
  }

  // wait(rand(0.2, 0.8), () => spawnEnemy);
}

export default spawnEnemy;