class Vector {
  x: number
  y: number

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  copy() {
    return new Vector(this.x, this.y)
  }
}

export const enum Direction {
  Up,
  Down,
  Left,
  Right
}

const distance = (a: Vector, b: Vector) =>  Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
const rand = (max) =>  Math.floor((Math.random() * max) + 1);
const collide = (a: Vector, b: Vector) => {
  if (a.x === b.x && a.y === b.y) {
    return true
  }
  return false
}

export class Food {
  scale: number
  position: Vector

  constructor(position: Vector) {
    this.scale = 10
    this.position = position 
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#e74c3c'
    ctx.fillRect(this.position.x, this.position.y, this.scale, this.scale);
    ctx.stroke();
  }
}

export class Snake {
  scale: number
  snake: Array<Vector> = []
  direction: Direction
  foods: Array<Food> = []
  stepSize: number
  level: number
  constraints

  constructor(constraints: { width: number, height: number }, scale) {
    this.scale = scale
    this.direction = Direction.Right
    this.snake.push(new Vector(0, 0))
    this.constraints = constraints
    this.level = 1;
    this.stepSize = 3;

    // spawn amount relative to size
    this.spawnFood();
  }

  spawnFood() {
    let x = rand(this.constraints.width)
    let y = rand(this.constraints.height)
    x = x - (x % this.scale)
    y = y - (y % this.scale)
    this.foods.push(new Food(new Vector(x, y)))
  }

  setDirection(dir: Direction) {
    if (this.direction === Direction.Right && dir === Direction.Left) {
      return
    }
    if (this.direction === Direction.Up && dir === Direction.Down) {
      return
    }
    if (this.direction === Direction.Left && dir === Direction.Right) {
      return
    }
    this.direction = dir;
  }

  grow() {
    const head = this.getHead() 
    const newItem = new Vector(head.x + this.scale, head.y + this.scale)
    this.snake.push(newItem);
  }

  getHead() {
    return this.snake[0];
  }

  collidesWithFood() {
    for (const [index, food] of this.foods.entries()) {
      if (distance(food.position, this.getHead()) - this.scale <= 0) {
        this.foods.splice(index, 1);
        return true;
      }
    }
    return false;
  }

  death() {
    // add out of bound check
    // this happens when the head hits one of its tails
    const head = this.getHead();
    for (var index = 2; index < this.snake.length; index++) {
      const part = this.snake[index];
      if (distance(head, part) < this.stepSize) {
        return true;
      }
    }
    return false;
  }

  move() {
    const head = this.getHead();
    const newHead = new Vector(head.x, head.y);
    if (this.direction === Direction.Up) {
      newHead.y -= this.stepSize
    }

    if (this.direction === Direction.Right) {
      newHead.x += this.stepSize
    }

    if (this.direction === Direction.Left) {
      newHead.x -= this.stepSize
    }

    if (this.direction === Direction.Down) {
      newHead.y += this.stepSize
    }
    
    this.snake.unshift(newHead);

    if (this.collidesWithFood()) {
      this.grow();
      this.spawnFood();
    }

    this.snake.pop();
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const part of this.snake) {
      ctx.fillStyle = '#ecf0f1'
      ctx.fillRect(part.x, part.y, this.scale, this.scale);
      ctx.stroke();
    }

    for (const food of this.foods) {
      food.draw(ctx);
    }
  }
}
