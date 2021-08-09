class Music {
    constructor(audio, beatsPerMinute, startLoopBeat, endLoopBeat, bahTimings) {
        this.audio = audio;
        this.beatsPerMinute = 60 / beatsPerMinute;
        this.startLoopBeat = startLoopBeat;
        this.endLoopBeat = endLoopBeat;
        this.bahTimings = bahTimings;
        this.volume = 1;
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
        this.audio.play();
        
        this.timeoutId = setTimeout(() => {
            this.intervalId = setInterval(() => {
                this.audio.currentTime = this.beatsPerMinute * this.startLoopBeat;
            }, (this.beatsPerMinute * this.endLoopBeat) * 1000);
        }, (this.beatsPerMinute * this.startLoopBeat) * 1000);
    }

    stop() {
        this.audio.pause();
        this.setTime(0);

        clearTimeout(this.timeoutId);
        clearInterval(this.intervalId);
    }

    isBahTime() {
        let time = this.getTime();
        
        for (let i = 0; i < this.bahTimings.length; i++) {
            if (time > this.beatsPerMinute * this.bahTimings[i] && time < this.beatsPerMinute * (this.bahTimings[i] + 0.2))
                return true;
        }

        return false;
    }
}
