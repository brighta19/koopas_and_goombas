class Entity {
    constructor(x, y, width, height, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.vx = 0;
        this.vy = 0;
        this.onGround = false;
    }
}
