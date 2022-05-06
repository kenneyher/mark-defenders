function spawnEnemy(){
  let type = choose(['basic', 'wavy', 'triple']);
  if(type == 'basic'){
    add([
      sprite('aliens', {anim: 'basic', flipX: true}),
      origin('center'),
      area({scale: 0.8}),
      scale(2),
      pos(width() - 20, rand(50, height() - 50)),
      health(4),
      "enemy",
      {
        t: 0,
        speed: 120,
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
      "enemy",
      'wavy',
      {
        t: 0,
        speed: 120,
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
      "enemy",
      "triple",
      {
        t: 0,
        speed: 70
      }
    ])
  }
}

export default spawnEnemy;