/* global audio*/

function AthleticMusic() {
    this.audio = audio.athleticMusic;
    this.bpm = 60 / 113; // 113 bpm
    
    var bah = [
        2.75, 6.75, 10.75, 14.75, 54,
        54.75, 94, 94.75, 102, 102.75,
        110, 110.75, 128, 130, 132
    ];
    
    var time = (t) => (t != undefined) ? this.audio.currentTime = t : this.audio.currentTime;
    
    this.play = function (volume) {
        this.audio.volume = volume || 1;
        this.audio.currentTime = (this.bpm * 0);
        this.audio.play();
        
        this.sid = setInterval(() => {
            this.audio.currentTime = this.bpm * 0;
        }, (this.bpm * 136) * 1000);
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
