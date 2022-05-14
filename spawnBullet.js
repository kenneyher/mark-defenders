function spawnBullet(p, f, obj, opts, vel){
  if(obj == 'player'){
    if(opts.toLowerCase() == 'none'){
      add([
        sprite('bullets', {anim: f}),
        scale(2),
        pos(p),
        origin('center'),
        cleanup(),
        move(RIGHT, 350),
        area(),
        layer('fx'),
        "bullet"
      ])
    }else if(opts.toLowerCase() == 'two bullets'){
      add([
        sprite('bullets', {anim: f}),
        scale(2),
        pos(p),
        layer('fx'),
        area(),
        origin('center'),
        cleanup(),
        move(vec2(100, -30), 350),
        "bullet"
      ])
      add([
        sprite('bullets', {anim: f}),
        scale(2),
        pos(p),
        area(),
        layer('fx'),
        origin('center'),
        cleanup(),
        move(vec2(100, 30), 350),
        "bullet"
      ])
    }else if(opts == 'THREE BULLETS'){
      add([
        sprite('bullets', {anim: f}),
        scale(2),
        pos(p),
        area(),
        layer('fx'),
        origin('center'),
        cleanup(),
        move(vec2(100, -30), 350),
        "bullet"
      ])
      add([
        sprite('bullets', {anim: f}),
        scale(2),
        pos(p),
        area(),
        layer('fx'),
        origin('center'),
        cleanup(),
        move(vec2(100, 0), 350),
        "bullet"
      ])
      add([
        sprite('bullets', {anim: f}),
        scale(2),
        pos(p),
        area(),
        origin('center'),
        cleanup(),
        layer('fx'),
        move(vec2(100, 30), 350),
        "bullet"
      ])
    }else if(opts == 'DOUBLE BULLETS'){
      add([
        sprite('bullets', {anim: f}),
        scale(2),
        pos(p.x, p.y + 10),
        area(),
        layer('fx'),
        origin('center'),
        cleanup(),
        move(vec2(100, 0), 350),
        "bullet"
      ])
      add([
        sprite('bullets', {anim: f}),
        scale(2),
        pos(p.x, p.y - 10),
        area(),
        origin('center'),
        cleanup(),
        layer('fx'),
        move(vec2(100, 0), 350),
        "bullet"
      ])
    }
  }else if(obj == 'enemy'){
    add([
      sprite('e-bullet', {anim: 'idle'}),
      scale(2),
      pos(p),
      layer('fx'),
      origin('center'),
      cleanup(),
      move(vel, 350),
      area(),
      "dangerous",
    ])
  }
  else if(obj == 'boss'){
    if(opts == 'seven'){
      const angles = [60, 40, 20, 0,  -20, -40, -60]
      for(let i=0; i<7; i++){
        add([
          sprite('e-bullet', {anim: 'idle'}),
          scale(2),
          pos(p),
          layer('fx'),
          origin('center'),
          cleanup(),
          move(vec2(-100, angles[i]), 250),
          area(),
          "dangerous",
        ])
      }
    }else if(opts == 'rand'){
      for(let i=0; i<12; i++){
        add([
          sprite('e-bullet', {anim: 'idle'}),
          scale(2),
          pos(p),
          layer('fx'),
          origin('center'),
          cleanup(),
          move(vec2(-100, randi(80, -80)), randi(300, 80)),
          area(),
          "dangerous",
        ])
      }
    }else if(opts == 'bubbles'){
      // const angles = [-40, -15, -50, 0, 20, 35, 46];
      for(let i=0; i<randi(5, 15); i++){
        add([
          sprite('e-bullet', {anim: 'idle'}),
          scale(2),
          pos(p),
          layer('fx'),
          origin('center'),
          cleanup(),
          move(vec2(-100, randi(-100, 100)), randi(350, 50)),
          area(),
          "dangerous",
        ])
      }
    }
  }
}

export default spawnBullet;