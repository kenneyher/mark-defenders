function spawnBullet(p, f, obj, opts, vel){
  if(obj == 'player'){
    if(opts.toLowerCase() == 'none'){
      add([
        sprite('bullets', {frame: f}),
        scale(2),
        pos(p),
        origin('center'),
        cleanup(),
        move(RIGHT, 350),
        area(),
        "bullet"
      ])
    }else if(opts.toLowerCase() == 'two bullets'){
      add([
        sprite('bullets', {frame: f}),
        scale(2),
        pos(p),
        area(),
        origin('center'),
        cleanup(),
        move(vec2(100, -30), 350),
        "bullet"
      ])
      add([
        sprite('bullets', {frame: f}),
        scale(2),
        pos(p),
        area(),
        origin('center'),
        cleanup(),
        move(vec2(100, 30), 350),
        "bullet"
      ])
    }
  }else if(obj == 'enemy'){
    add([
      sprite('e-bullet', {anim: 'idle'}),
      scale(2),
      pos(p),
      origin('center'),
      cleanup(),
      move(vel, 350),
      area(),
      "dangerous",
    ])
  }
}

export default spawnBullet;