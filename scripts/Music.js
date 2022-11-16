class Music {
    constructor(audio, beatsPerMinute, startLoopBeat, endLoopBeat, bahTimings) {
        this.audio = audio;
        this.beatsPerMinute = beatsPerMinute;
        this.secondsPerBeat = 60 / beatsPerMinute;
        this.startLoopBeat = startLoopBeat;
        this.endLoopBeat = endLoopBeat;
        this.bahTimings = bahTimings;
        this.volume = 1;

        this.onplay = new Function();
        this.onstop = new Function();

        this.timeMusicStarted = 0;
        this.timeMusicWillEnd = 0;
    }

    getTime() {
        return this.audio.currentTime;
    }

    setTime(time) {
        this.audio.currentTime = time;
    }

    setVolume(volume) {
        this.volume = volume;
    }

    reset() {
        this.currentTime = 0;
    }

    play() {
        this.audio.volume = this.volume;
        this.timeMusicStarted = Date.now();
        this.timeMusicWillEnd = this.timeMusicStarted +
            (this.secondsPerBeat * this.startLoopBeat * 1000) +
            (this.secondsPerBeat * this.endLoopBeat * 1000);
        this.audio.play();

        this.onplay();
    }

    update() {
        if (Date.now() > this.timeMusicWillEnd)
            this.loop();
    }

    loop() {
        this.audio.currentTime = this.secondsPerBeat * this.startLoopBeat;
        this.timeMusicStarted = Date.now();
        this.timeMusicWillEnd = this.timeMusicStarted +
            (this.secondsPerBeat * this.endLoopBeat * 1000);
    }

    stop() {
        this.audio.pause();
        this.setTime(0);

        clearTimeout(this.timeoutId);
        clearInterval(this.intervalId);

        this.onstop();
    }

    isBahTime() {
        let time = this.getTime();

        for (let i = 0; i < this.bahTimings.length; i++) {
            if (time > this.secondsPerBeat * this.bahTimings[i] && time < this.secondsPerBeat * (this.bahTimings[i] + 0.2))
                return true;
        }

        return false;
    }
}
