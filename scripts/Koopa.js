class Koopa extends Entity {
    constructor(x, y) {
        super(x, y, 16, 30, "Koopa");

        this.vx = (Math.random() < 0.5) ? -1 : 1;
        this.scale = 2;
        this.action = "walking";
    }

    walk() {
        this.action = "walking";
        this.sprites.walking.startFromBeginning();
    }

    turn() {
        this.action = "turning";
        this.sprites.turning.startFromBeginning();
    }

    dance() {
        if (this.action != "turning" && this.action != "dancing" && this.onGround) {
            this.action = "dancing";
            this.sprites.dancing.startFromBeginning();
        }
    }

    update() {
        if (this.action == "walking") {
            this.sprites.walking.nextFrame();
            if (this.sprites.walking.isDone())
                this.sprites.walking.startFromBeginning();
            this.x += this.vx;
        }
        else if (this.action == "turning") {
            this.sprites.turning.nextFrame();
            if (this.sprites.turning.isDone()) {
                this.walk();
                this.vx *= -1;
                this.x += this.vx;
            }
        }
        else if (this.action == "dancing") {
            this.sprites.dancing.nextFrame();
            if (this.sprites.dancing.isDone()) {
                this.walk();
                this.x += this.vx;
            }
        }
        this.vy += GRAVITY;
        this.y += this.vy;
    }

    render() {
        ctx.save();
        ctx.translate(this.x + (this.width * this.scale) / 2, this.y + (this.height * this.scale));
        ctx.scale((this.vx > 0) ? -1 : 1, 1);

        let frame;
        if (this.action === "walking") {
            frame = this.sprites.walking.getCurrentFrame();
        }
        else if (this.action === "turning") {
            frame = this.sprites.turning.getCurrentFrame();
        }
        else if (this.action === "dancing") {
            frame = this.sprites.dancing.getCurrentFrame();
        }

        if (frame) {
            ctx.drawImage(frame.image, frame.x, frame.y, frame.width, frame.height,
                -(this.width * this.scale) / 2,
                -(this.height * this.scale),
                this.width * this.scale,
                this.height * this.scale
            );
        }

        ctx.restore();
    }
}
