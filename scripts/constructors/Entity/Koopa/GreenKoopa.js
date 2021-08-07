/* global images SpriteAnimation Koopa */

function GreenKoopa(x, y) {
    Koopa.call(this, x, y);
    this.saWalking = new SpriteAnimation(images.greenKoopaWalking, 16, this.width, this.height, this.ticksPerFrame);
    this.saTurning = new SpriteAnimation(images.greenKoopaTurning, 3, this.width, this.height, this.ticksPerFrame+1);
    this.saDancing = new SpriteAnimation(images.greenKoopaDancing, 5, this.width, this.height, this.ticksPerFrame+1);
}
GreenKoopa.prototype = Object.create(Koopa.prototype);
GreenKoopa.prototype.constructor = GreenKoopa;
