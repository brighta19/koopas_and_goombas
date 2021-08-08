/* global audio*/

function UndergroundMusic() {
    this.audio = audio.undergroundMusic;
    this.bpm = 60 / 100; // 100 bpm
    
    var bah = [
        15, 23, 31, 39, 47,
        63, 71, 79, 87
    ];
    
    var time = (t) => (t != undefined) ? this.audio.currentTime = t : this.audio.currentTime;
    
    this.play = function (volume) {
        this.audio.volume = volume || 1;
        this.audio.currentTime = (this.bpm * 0);
        this.audio.play();
        
        this.sid = setInterval(() => {
            this.audio.currentTime = this.bpm * 0;
        }, (this.bpm * 96) * 1000);
    };
    this.stop = function () {
        this.audio.pause();

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
