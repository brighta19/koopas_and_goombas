const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");
const WIDTH = cvs.width = window.innerWidth - 12;
const HEIGHT = cvs.height;

const numOfImages = 11;
let numOfImagesLoaded = 0;
let imagesCompleted = false;
let images = {
    redKoopaWalking: "sprites/koopa/red/walking.png",
    redKoopaTurning: "sprites/koopa/red/turning.png",
    redKoopaDancing: "sprites/koopa/red/dancing.png",
    greenKoopaWalking: "sprites/koopa/green/walking.png",
    greenKoopaTurning: "sprites/koopa/green/turning.png",
    greenKoopaDancing: "sprites/koopa/green/dancing.png",
    blueKoopaWalking: "sprites/koopa/blue/walking.png",
    blueKoopaTurning: "sprites/koopa/blue/turning.png",
    blueKoopaDancing: "sprites/koopa/blue/dancing.png",
    goombaWalking: "sprites/goomba/walking.png",
    goombaTurning: "sprites/goomba/turning.png",
};

const numOfAudio = 3;
let numOfAudioLoaded = 0;
let audioCompleted = false;
let audio = {
    overworldMusic: "audio/overworld.mp3",
    athleticMusic: "audio/athletic.mp3",
    undergroundMusic: "audio/underground.mp3",
};

for (let i in images) {
    let img = new Image();
    img.src = images[i];
    img.onload = function () {
        if (++numOfImagesLoaded == numOfImages)
            imagesCompleted = true;
    };
    images[i] = img;
}
for (let i in audio) {
    let aud = new Audio(audio[i]);
    aud.oncanplay = function () {
        if (++numOfAudioLoaded == numOfAudio)
            audioCompleted = true;
    };
    audio[i] = aud;
}

const GRAVITY = 0.3;
