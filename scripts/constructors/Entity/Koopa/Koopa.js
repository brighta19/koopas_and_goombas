/* global ctx GRAVITY Entity */

function Koopa(x, y) {
    Entity.call(this, x, y, 16, 30, "Koopa");
    this.vx = (Math.random() < 0.5) ? -1 : 1;
    this.scale = 2;
    this.action = "walking";
    this.ticksPerFrame = 3;
    this.saWalking;
    this.saTurning;
    this.saDancing;
    
}
Koopa.prototype.walk = function () {
    this.action = "walking";
    this.saWalking.startFromBeginning();
};
Koopa.prototype.turn = function () {
    this.action = "turning";
    this.saTurning.startFromBeginning();
};
Koopa.prototype.dance = function () {
    if (this.action != "turning" && this.action != "dancing") {
        this.action = "dancing";
        this.saDancing.startFromBeginning();
    }
};

Koopa.prototype.update = function () {
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
    else if (this.action == "dancing") {
        this.saDancing.nextFrame();
        if (this.saDancing.isDone()) {
            this.walk();
            this.x += this.vx;
        }
    }
    this.vy += GRAVITY;
    this.y += this.vy;
};
Koopa.prototype.render = function () {
    ctx.save();
    ctx.translate(this.x + (this.width * this.scale) / 2, this.y + (this.height * this.scale));
    ctx.scale((this.vx > 0) ? -1 : 1, 1);
    
    if (this.action == "walking")
        this.saWalking.drawFrame(-(this.width * this.scale) / 2, -(this.height * this.scale),
            this.width * this.scale, this.height * this.scale);
    else if (this.action == "turning")
        this.saTurning.drawFrame(-(this.width * this.scale) / 2, -(this.height * this.scale),
            this.width * this.scale, this.height * this.scale);
    else if (this.action == "dancing")
        this.saDancing.drawFrame(-(this.width * this.scale) / 2, -(this.height * this.scale),
            this.width * this.scale, this.height * this.scale);
    
    ctx.restore();
};
