/* global images SpriteAnimation Koopa */

function RedKoopa(x, y) {
    Koopa.call(this, x, y);
    this.saWalking = new SpriteAnimation(images.redKoopaWalking, 16, this.width, this.height, this.ticksPerFrame);
    this.saTurning = new SpriteAnimation(images.redKoopaTurning, 3, this.width, this.height, this.ticksPerFrame+1);
    this.saDancing = new SpriteAnimation(images.redKoopaDancing, 5, this.width, this.height, this.ticksPerFrame+1);
}
RedKoopa.prototype = Object.create(Koopa.prototype);
RedKoopa.prototype.constructor = RedKoopa;
