function Goomba(x, y) {
    Entity.call(this, x, y, 17, 19, "Goomba");
    this.vx = (Math.random() < 0.5) ? -1 : 1;
    this.scale = 2;
    this.action = "walking";
    this.ticksPerFrame = 4;

    this.sprites = {
        walking: new Sprite(images.goombaWalking, 8, this.width, this.height, this.ticksPerFrame),
        turning: new Sprite(images.goombaTurning, 3, this.width, this.height, this.ticksPerFrame/2)
    };
}
Goomba.prototype = Object.create(Entity.prototype);
Goomba.prototype.constructor = Goomba;

Goomba.prototype.walk = function () {
    this.action = "walking";
    this.sprites.walking.startFromBeginning();
};
Goomba.prototype.turn = function () {
    this.action = "turning";
    this.sprites.turning.startFromBeginning();
};
Goomba.prototype.dance = function () {
    if (this.onGround) {
        this.onGround = false;
        this.vy = -3;
        this.y += this.vy;
    }
};
Goomba.prototype.update = function () {
    if (this.action == "walking") {
        this.sprites.walking.nextFrame();
        if (this.sprites.walking.isDone())
            this.sprites.walking.startFromBeginning();
        this.x += this.vx;
    }
    else if (this.action == "turning") {
        this.sprites.turning.nextFrame();
        if (this.sprites.turning.isDone()) {
            this.walk();
            this.vx *= -1;
            this.x += this.vx;
        }
    }
    this.vy += GRAVITY;
    this.y += this.vy;
};
Goomba.prototype.render = function () {
    ctx.save();
    ctx.translate(this.x + (this.width * this.scale) / 2, this.y + (this.height * this.scale));
    ctx.scale((this.vx > 0) ? -1 : 1, 1);
    
    var frame;
    if (this.action === "walking") {
        frame = this.sprites.walking.getCurrentFrame();
    }
    else if (this.action === "turning") {
        frame = this.sprites.turning.getCurrentFrame();
    }
    
    if (frame) {
        ctx.drawImage(frame.image, frame.x, frame.y, frame.width, frame.height,
            -(this.width * this.scale) / 2,
            -(this.height * this.scale),
            this.width * this.scale,
            this.height * this.scale
        );
    }
    
    ctx.restore();
};
