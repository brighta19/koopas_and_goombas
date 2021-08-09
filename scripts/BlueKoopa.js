class BlueKoopa extends Koopa {
    constructor(x, y) {
        super(x, y);

        this.sprites = {
            walking: new Sprite(images.blueKoopaWalking, 16, this.width, this.height, 3),
            turning: new Sprite(images.blueKoopaTurning, 3, this.width, this.height, 4),
            dancing: new Sprite(images.blueKoopaDancing, 5, this.width, this.height, 4)
        };
    }
}
