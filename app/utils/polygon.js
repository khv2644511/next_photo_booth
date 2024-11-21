const PI2 = Math.PI * 2;

const COLORS = [
  '#E57272', // 빨강
  '#E5B772', // 주황
  '#CEE572', // 노랑
  '#89E572', // 초록
  '#72E5A0', // 청록
  '#72C3E5', // 파랑
  '#8972E5', // 보라
  '#E57272', // 반복: 빨강
  '#E5B772', // 주황
  '#CEE572', // 노랑
  '#89E572', // 초록
  '#72E5A0', // 청록
  '#72C3E5', // 파랑
  '#8972E5', // 보라
  '#E57272', // 반복: 빨강
];

export class Polygon {
  constructor(x, y, radius, sides) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sides = sides;
    this.rotate = 0;
  }

  animate(ctx, moveX) {
    ctx.save();
    ctx.fillStyle = '#000';
    // ctx.beginPath();

    const angle = PI2 / this.sides;
    const angle2 = PI2 / 4;

    ctx.translate(this.x, this.y);

    this.rotate += moveX * 0.008;
    ctx.rotate(this.rotate);

    for (let i = 0; i < this.sides; i++) {
      const x = this.radius * Math.cos(angle * i);
      const y = this.radius * Math.sin(angle * i);

      ctx.save();
      ctx.fillStyle = COLORS[i];
      ctx.translate(x, y);
      ctx.rotate((((360 / this.sides) * i + 45) * Math.PI) / 180);
      ctx.beginPath();

      for (let j = 0; j < 4; j++) {
        const x2 = 160 * Math.cos(angle2 * j);
        const y2 = 160 * Math.sin(angle2 * j);
        j == 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
      }

      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }

    // ctx.fill();
    // ctx.closePath();
    ctx.restore();
  }
}
