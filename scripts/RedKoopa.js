function RedKoopa(x, y) {
    Koopa.call(this, x, y);
    
    this.sprites = {
        walking: new Sprite(images.redKoopaWalking, 16, this.width, this.height, this.ticksPerFrame),
        turning: new Sprite(images.redKoopaTurning, 3, this.width, this.height, this.ticksPerFrame+1),
        dancing: new Sprite(images.redKoopaDancing, 5, this.width, this.height, this.ticksPerFrame+1)
    };
}
RedKoopa.prototype = Object.create(Koopa.prototype);
RedKoopa.prototype.constructor = RedKoopa;
