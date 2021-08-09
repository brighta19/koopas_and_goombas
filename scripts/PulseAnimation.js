class PulseAnimation {
    constructor(beatsPerMinute) {
        this.delete = false;
        this.radius = this.minRadius = 20;
        this.maxRadius = WIDTH / 2;
        this.opacity = 1;
        
        var fpms = 60/1000; // 60 frames per 1000 ms (1s)
        var bpms = (1/beatsPerMinute*60)/60000; // 100 beats per 60000 ms (60s, 1m)
        this.speed = (bpms/fpms) * (this.maxRadius - this.minRadius);
    }

    update() {
        this.radius += this.speed;
        if (this.radius > this.maxRadius)
            this.delete = true;
        this.opacity = 1 - (this.radius) / (this.maxRadius);
    }

    render() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(WIDTH / 2, HEIGHT / 4, this.minRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#AAF";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(WIDTH / 2, HEIGHT / 4, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "#AAF";
        ctx.fill();
        ctx.restore();
    }
}
