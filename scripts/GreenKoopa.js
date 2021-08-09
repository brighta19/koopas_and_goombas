class GreenKoopa extends Koopa {
    constructor(x, y) {
        super(x, y);

        this.sprites = {
            walking: new Sprite(images.greenKoopaWalking, 16, this.width, this.height, 3),
            turning: new Sprite(images.greenKoopaTurning, 3, this.width, this.height, 4),
            dancing: new Sprite(images.greenKoopaDancing, 5, this.width, this.height, 4)
        };
    }
}
