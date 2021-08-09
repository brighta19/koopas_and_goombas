class RedKoopa extends Koopa {
    constructor(x, y) {
        super(x, y);

        this.sprites = {
            walking: new Sprite(images.redKoopaWalking, 16, this.width, this.height, 3),
            turning: new Sprite(images.redKoopaTurning, 3, this.width, this.height, 4),
            dancing: new Sprite(images.redKoopaDancing, 5, this.width, this.height, 4)
        };
    }
}
