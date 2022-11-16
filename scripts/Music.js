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

    doesBahTimingMatch(time, bahTiming) {
        return time > this.secondsPerBeat * bahTiming
            && time < this.secondsPerBeat * (bahTiming + Music.BAH_DETECTION_THRESHOLD);
    }

    getBahIndex() {
        let time = this.getTime();

        for (let i = 0; i < this.bahTimings.length; i++) {
            if (this.doesBahTimingMatch(time, this.bahTimings[i]))
                return i;
        }
        return -1;
    }

    isBahTime() {
        return this.getBahIndex() > -1;
    }

    getBahType() {
        let bahIndex = this.getBahIndex();
        let currentBah = this.bahTimings[bahIndex];

        if (bahIndex > 0) {
            let leftBah = this.bahTimings[bahIndex - 1];
            let leftPairDistance = currentBah - leftBah;

            if (leftPairDistance < 1)
                return Music.BAH_TYPE.SECOND_OF_PAIR;
        }

        if (bahIndex < this.bahTimings.length - 1) {
            let rightBah = this.bahTimings[bahIndex + 1];
            let rightPairDistance = rightBah - currentBah;

            if (rightPairDistance < 1)
                return Music.BAH_TYPE.FIRST_OF_PAIR;
        }

        return Music.BAH_TYPE.SOLO;
    }
}
Music.BAH_TYPE = {
    SOLO: "solo",
    FIRST_OF_PAIR: "first of pair",
    SECOND_OF_PAIR: "second of pair",
};
Music.BAH_DETECTION_THRESHOLD = 0.1;
