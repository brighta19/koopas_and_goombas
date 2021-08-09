function GreenKoopa(x, y) {
    Koopa.call(this, x, y);
    
    this.sprites = {
        walking: new Sprite(images.greenKoopaWalking, 16, this.width, this.height, this.ticksPerFrame),
        turning: new Sprite(images.greenKoopaTurning, 3, this.width, this.height, this.ticksPerFrame+1),
        dancing: new Sprite(images.greenKoopaDancing, 5, this.width, this.height, this.ticksPerFrame+1)
    };
}
GreenKoopa.prototype = Object.create(Koopa.prototype);
GreenKoopa.prototype.constructor = GreenKoopa;
