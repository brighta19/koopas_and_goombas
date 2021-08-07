/* global ctx WIDTH HEIGHT numOfImages numOfImagesLoaded numOfAudio numOfAudioLoaded imagesCompleted audioCompleted PulseAnimation OverworldMusic AthleticMusic UndergroundMusic Platform Goomba RedKoopa GreenKoopa BlueKoopa */

ctx.imageSmoothingEnabled = false;

var music;
var musicPlaying = false;
var platform = new Platform(0, HEIGHT - 40, WIDTH, 40);
var pulses = [];
var entities = [];

function addEntity(type) {
    switch (type) {
        case "Goomba":
            entities.push(new Goomba(WIDTH / 2, HEIGHT /2));
            break;
        case "Green Koopa":
            entities.push(new GreenKoopa(WIDTH / 2, HEIGHT /2));
            break;
        case "Red Koopa":
            entities.push(new RedKoopa(WIDTH / 2, HEIGHT /2));
            break;
        case "Blue Koopa":
            entities.push(new BlueKoopa(WIDTH / 2, HEIGHT /2));
            break;
    }
}
function turnEntities() {
    for (let i = 0; i < entities.length; i++)
        entities[i].turn();
}
function danceEntities() {
    for (let e = 0; e < entities.length; e++)
        entities[e].dance();
}
function toggleOverworldMusic(e) {
    if (musicPlaying) {
        music.stop();
        musicPlaying = false;
        e.innerHTML = "Play Overworld Music";
    }
    else {
        music = new OverworldMusic();
        music.play();
        musicPlaying = true;
        e.innerHTML = "Stop Overworld Music";
    }
}
function toggleAthleticMusic(e) {
    if (musicPlaying) {
        music.stop();
        musicPlaying = false;
        e.innerHTML = "Play Athletic Music";
    }
    else {
        music = new AthleticMusic();
        music.play();
        musicPlaying = true;
        e.innerHTML = "Stop Athletic Music";
    }
}
function toggleUndergroundMusic(e) {
    if (musicPlaying) {
        music.stop();
        musicPlaying = false;
        e.innerHTML = "Play Underground Music";
    }
    else {
        music = new UndergroundMusic();
        music.play();
        musicPlaying = true;
        e.innerHTML = "Stop Underground Music";
    }
}


function update() {
    if (musicPlaying && music.audio.currentTime % music.bpm < 0.1 && pulses.length == 0)
        pulses.push(new PulseAnimation(music.bpm));
        
    for (let p = pulses.length - 1; p >= 0; p--) {
        pulses[p].update();
        if (pulses[p].delete)
            pulses.splice(p, 1);
    }
    
    for (let e = 0; e < entities.length; e++) {
        let entity = entities[e];
        entity.update();
        
        if ((entity.x < 0 ||
        entity.x + (entity.width * entity.scale) > WIDTH) &&
        entity.action == "walking") {
            entity.turn();
        }
        
        if (musicPlaying && music.playBah()) {
            entity.dance();
        }
        
        platform.collision(entity);
    }
}

function render() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    for (let p = pulses.length - 1; p >= 0; p--) {
        pulses[p].render();
    }
    
    for (let e = 0; e < entities.length; e++)
        entities[e].render();
        
    platform.render();
}

setInterval(function () {
    if (imagesCompleted && audioCompleted) {
        update();
        render();
    }
    else {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        
        ctx.fillStyle = "#8F8";
        ctx.fillRect(0, 0, ((numOfImagesLoaded + numOfAudioLoaded) / (numOfImages + numOfAudio)) * WIDTH, 5);
        ctx.fillText("Loading ...", 10, 20);
    }
}, 1000 / 60); // 60 fps
