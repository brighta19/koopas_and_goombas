function BlueKoopa(x, y) {
    Koopa.call(this, x, y);

    this.sprites = {
        walking: new Sprite(images.blueKoopaWalking, 16, this.width, this.height, this.ticksPerFrame),
        turning: new Sprite(images.blueKoopaTurning, 3, this.width, this.height, this.ticksPerFrame+1),
        dancing: new Sprite(images.blueKoopaDancing, 5, this.width, this.height, this.ticksPerFrame+1)
    }
}
BlueKoopa.prototype = Object.create(Koopa.prototype);
BlueKoopa.prototype.constructor = BlueKoopa;
