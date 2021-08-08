/* global ctx images SpriteAnimation Entity */

function Goomba(x, y) {
    Entity.call(this, x, y, 17, 19, "Goomba");
    this.vx = (Math.random() < 0.5) ? -1 : 1;
    this.scale = 2;
    this.action = "walking";
    this.ticksPerFrame = 4;
    this.saWalking = new SpriteAnimation(images.goombaWalking, 8, this.width, this.height, this.ticksPerFrame);
    this.saTurning = new SpriteAnimation(images.goombaTurning, 3, this.width, this.height, this.ticksPerFrame/2);
}
Goomba.prototype = Object.create(Entity.prototype);
Goomba.prototype.constructor = Goomba;

Goomba.prototype.walk = function () {
    this.action = "walking";
    this.saWalking.startFromBeginning();
};
Goomba.prototype.turn = function () {
    this.action = "turning";
    this.saTurning.startFromBeginning();
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
        this.saWalking.nextFrame();
        if (this.saWalking.isDone())
            this.saWalking.startFromBeginning();
        this.x += this.vx;
    }
    else if (this.action == "turning") {
        this.saTurning.nextFrame();
        if (this.saTurning.isDone()) {
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
    
    if (this.action == "walking")
        this.saWalking.drawFrame(-(this.width * this.scale) / 2, -(this.height * this.scale),
            this.width * this.scale, this.height * this.scale);
    else if (this.action == "turning")
        this.saTurning.drawFrame(-(this.width * this.scale) / 2, -(this.height * this.scale),
            this.width * this.scale, this.height * this.scale);
    
    ctx.restore();
};
