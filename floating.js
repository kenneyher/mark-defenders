function floating(d, speed = 10){
  let limit = {max: 0, min: 0}
  let dir = 1;
  d = d ?? 10;
  return {
    id: 'floating',
    require: ['pos',],
    add(){
      limit.max = this.pos.y + d;
      limit.min = this.pos.y - d;
    },
    update(){
      if(this.pos.y < limit.min){
        dir = 1;
      }
      if(this.pos.y > limit.max){
        dir = -1;
      }
      this.move(0, speed*dir)
    }
  }
}

export default floating;