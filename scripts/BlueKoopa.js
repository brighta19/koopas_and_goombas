/* global images SpriteAnimation Koopa */

function BlueKoopa(x, y) {
    Koopa.call(this, x, y);
    this.saWalking = new SpriteAnimation(images.blueKoopaWalking, 16, this.width, this.height, this.ticksPerFrame);
    this.saTurning = new SpriteAnimation(images.blueKoopaTurning, 3, this.width, this.height, this.ticksPerFrame+1);
    this.saDancing = new SpriteAnimation(images.blueKoopaDancing, 5, this.width, this.height, this.ticksPerFrame+1);
}
BlueKoopa.prototype = Object.create(Koopa.prototype);
BlueKoopa.prototype.constructor = BlueKoopa;
