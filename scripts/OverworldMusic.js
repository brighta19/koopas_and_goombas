/* global audio */

function OverworldMusic() {
    this.audio = audio.overworldMusic;
    this.bpm = 60 / 100; // 100 bpm
    
    var bah = [
        3.5, 10.25, 11, 18.25, 19,
        58.25, 59, 98.25, 99, 105,
        106, 106.75, 113, 114, 114.75,
        121, 122, 122.75, 138.25, 139
    ];
    
    var time = (t) => (t) ? this.audio.currentTime = t : this.audio.currentTime;
    
    this.play = function (volume) {
        this.audio.volume = volume || 1;
        this.audio.currentTime = (this.bpm * 0);
        this.audio.play();


        this.tid = setTimeout(() => {
            this.sid = setInterval(() => {
                this.audio.currentTime = this.bpm * 4;
            }, (this.bpm * 136) * 1000);
        }, (this.bpm * 4) * 1000);
    };
    this.stop = function () {
        this.audio.pause();

        clearTimeout(this.tid);
        clearInterval(this.sid);
    };
    this.playBah = function () {
        for (let i = 0; i < bah.length; i++) {
            if (time() > this.bpm * bah[i] && time() < this.bpm * (bah[i] + 0.2))
                return true;
        }
            
        return false;
    };
}
