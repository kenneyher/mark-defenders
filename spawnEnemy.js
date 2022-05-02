function spawnEnemy(){
  let type = choose(['basic', 'wavy']);
  if(type == 'basic'){
    add([
      sprite('aliens', {anim: 'basic', flipX: true}),
      origin('center'),
      area({scale: 0.8}),
      scale(2),
      pos(width() - 20, rand(50, height() - 50)),
      health(5),
      "enemy",
    ])
  }else if('wavy'){
    add([
      sprite('aliens', {anim: 'wavy', flipX: true}),
      origin('center'),
      area({scale: 0.8}),
      scale(2),
      pos(width() - 20, rand(100, height() - 100)),
      health(5),
      "enemy",
      'wavy',
    ])
  }
}

export default spawnEnemy;