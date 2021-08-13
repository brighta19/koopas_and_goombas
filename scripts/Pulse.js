class Pulse {
    constructor(speed) {
        this.speed = speed;
        this.progress = 0;
        this.delete = false;

        this.radius = Pulse.MIN_RADIUS;
        this.opacity = 1;
    }

    update() {
        if (this.progress > 1) {
            this.delete = true;
        }
        else {
            this.progress += this.speed;
        }
    }

    render() {
        let radius = Pulse.MIN_RADIUS + this.progress * (Pulse.MAX_RADIUS - Pulse.MIN_RADIUS);
        let opacity = Math.max(1 - this.progress, 0);

        ctx.save();

        ctx.beginPath();
        ctx.arc(WIDTH / 2, HEIGHT / 4, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = Pulse.COLOR;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(WIDTH / 2, HEIGHT / 4, BeatPulser.RADIUS, 0, Math.PI * 2);
        ctx.closePath();
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#FFF";
        ctx.fill();

        ctx.restore();
    }
}
Pulse.COLOR = "#AAF";
Pulse.MIN_RADIUS = 20;
Pulse.MAX_RADIUS = WIDTH / 2;
