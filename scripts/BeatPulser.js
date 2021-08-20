class BeatPulser {
    constructor() {
        this.pulses = [];
        this.canCreatePulse = true;
        this.beatTime = 0;
        this.timeStopped = Date.now();

        this.doingIdleAnimation = false;
        this.idleAnimationStartTime = 0;

        this.running = false;
    }

    setMusic(music) {
        this.music = music;

        this.music.onplay = () => {
            this.running = true;
            this.canCreatePulse = true;
            this.beatTime = 0;
            this.doingIdleAnimation = false;
        };

        this.music.onstop = () => {
            this.running = false;
            this.timeStopped = Date.now();
        };

        this.calculatePulseSpeed();
    }

    calculatePulseSpeed() {
        let bpms = this.music.beatsPerMinute / 60000; // beats per 60000 ms (60s, 1m)
        this.pulseSpeed = bpms / BeatPulser.FPMS;
    }

    update() {
        if (this.running) {
            this.beatTime = (this.music.getTime() % this.music.secondsPerBeat) / this.music.secondsPerBeat;

            if (this.canCreatePulse && this.beatTime < 0.5) {
                this.pulses.push(new Pulse(this.pulseSpeed));
                this.canCreatePulse = false;
            }
            else if (!this.canCreatePulse && this.beatTime >= 0.5) {
                this.canCreatePulse = true;
            }
        }
        else {
            let now = Date.now();
            if (!this.doingIdleAnimation && now - this.timeStopped >= BeatPulser.IDLE_ANIMATION_START_DELAY) {
                this.doingIdleAnimation = true;
                this.idleAnimationStartTime = now;
                this.timeStopped = now;
            }
            else if (this.doingIdleAnimation && now - this.idleAnimationStartTime >= BeatPulser.IDLE_ANIMATION_DURATION) {
                this.doingIdleAnimation = false;
                this.timeStopped = now;
            }
        }

        for (let i = this.pulses.length - 1; i >= 0; i--) {
            let pulse = this.pulses[i];

            pulse.update();
            if (pulse.delete) {
                this.pulses.splice(i, 1);
            }
        }
    }

    render() {
        for (let i = 0; i < this.pulses.length; i++) {
            this.pulses[i].render();
        }

        ctx.save();

        let y = Math.sin(this.beatTime * Math.PI) * (HEIGHT / 8);
        let radius = BeatPulser.RADIUS;
        if (this.doingIdleAnimation) {
            radius += (1 - (Math.cos((Date.now() - this.idleAnimationStartTime) / BeatPulser.IDLE_ANIMATION_DURATION * 2 * Math.PI) + 1) / 2) * BeatPulser.SCALE_AMOUNT;
        }

        ctx.beginPath();
        ctx.arc(HALF_WIDTH, HEIGHT / 4 - y, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.globalAlpha = 1;
        ctx.fillStyle = BeatPulser.COLOR;
        ctx.fill();

        ctx.restore();
    }
}
BeatPulser.FPMS = 60 / 1000; // 60 frames per 1000 ms (1s)
BeatPulser.RADIUS = 20;
BeatPulser.COLOR = "#66B";
BeatPulser.IDLE_ANIMATION_START_DELAY = 5000;
BeatPulser.IDLE_ANIMATION_DURATION = 2000;
BeatPulser.SCALE_AMOUNT = 10;
