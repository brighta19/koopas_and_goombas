class BeatPulser {
    constructor() {
        this.pulses = [];
        this.canCreatePulse = true;

        this.running = false;
    }

    setMusic(music) {
        this.music = music;

        this.music.onplay = () => {
            this.running = true;
            this.canCreatePulse = true;
        };

        this.music.onstop = () => {
            this.running = false;
        };

        this.calculatePulseSpeed();
    }

    calculatePulseSpeed() {
        var fpms = 60 / 1000; // 60 frames per 1000 ms (1s)
        var bpms = this.music.beatsPerMinute / 60000; // beats per 60000 ms (60s, 1m)
        this.pulseSpeed = (bpms/fpms);
    }

    update() {
        if (this.running) {
            if (this.canCreatePulse) {
                if ((this.music.getTime() % this.music.calculatedBPM) / 0.6 <= BeatPulser.SENSITIVITY) {
                    this.pulses.push(new Pulse(this.pulseSpeed));
                    this.canCreatePulse = false;
                }
            }
            else {
                if ((this.music.getTime() % this.music.calculatedBPM) / 0.6 > BeatPulser.SENSITIVITY) {
                    this.canCreatePulse = true;
                }
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
        ctx.save();

        for (let i = 0; i < this.pulses.length; i++) {
            this.pulses[i].render();
        }

        ctx.beginPath();
        ctx.arc(WIDTH / 2, HEIGHT / 4, BeatPulser.RADIUS, 0, Math.PI * 2);
        ctx.closePath();
        ctx.globalAlpha = 1;
        ctx.fillStyle = BeatPulser.COLOR;
        ctx.fill();

        ctx.restore();
    }
}
BeatPulser.SENSITIVITY = 0.05;
BeatPulser.RADIUS = 20;
BeatPulser.COLOR = "#66B";
