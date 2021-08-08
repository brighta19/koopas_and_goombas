/* global */

function Entity(x, y, w, h, t) {
    this.type = t;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.width = w;
    this.height = h;
    this.onGround = false;
}
