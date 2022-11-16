ctx.imageSmoothingEnabled = false;

const music = {
    overworld: new Music(audio.overworldMusic, 100, 4, 136, [
        3.5, 10.25, 11, 18.25, 19, 58.25, 59, 98.25,
        99, 105, 106, 106.75, 113, 114, 114.75, 121,
        122, 122.75, 138.25, 139
    ]),
    athletic: new Music(audio.athleticMusic, 113, 0, 136, [
        2.75, 6.75, 10.75, 14.75, 54, 54.75, 94, 94.75,
        102, 102.75, 110, 110.75, 128, 130, 132
    ]),
    underground: new Music(audio.undergroundMusic, 100, 0, 96, [
        15, 23, 31, 39, 47, 63, 71, 79, 87
    ])
};
const beatPulser = new BeatPulser();
const platform = new Platform(0, HEIGHT - 40, WIDTH, 40);
const entities = [];
let currentMusic;
let musicPlaying = false;

function addEntity(type) {
    switch (type) {
        case "Goomba":
            entities.push(new Goomba(Math.floor(HALF_WIDTH), Math.floor(HALF_HEIGHT)));
            break;
        case "Green Koopa":
            entities.push(new GreenKoopa(Math.floor(HALF_WIDTH), Math.floor(HALF_HEIGHT)));
            break;
        case "Red Koopa":
            entities.push(new RedKoopa(Math.floor(HALF_WIDTH), Math.floor(HALF_HEIGHT)));
            break;
        case "Blue Koopa":
            entities.push(new BlueKoopa(Math.floor(HALF_WIDTH), Math.floor(HALF_HEIGHT)));
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
        currentMusic.stop();
        musicPlaying = false;
        e.innerHTML = "Play Overworld Music";
    }
    else {
        currentMusic = music.overworld;
        beatPulser.setMusic(currentMusic);
        currentMusic.play();
        musicPlaying = true;
        e.innerHTML = "Stop Overworld Music";
    }
}
function toggleAthleticMusic(e) {
    if (musicPlaying) {
        currentMusic.stop();
        musicPlaying = false;
        e.innerHTML = "Play Athletic Music";
    }
    else {
        currentMusic = music.athletic;
        beatPulser.setMusic(currentMusic);
        currentMusic.play();
        musicPlaying = true;
        e.innerHTML = "Stop Athletic Music";
    }
}
function toggleUndergroundMusic(e) {
    if (musicPlaying) {
        currentMusic.stop();
        musicPlaying = false;
        e.innerHTML = "Play Underground Music";
    }
    else {
        currentMusic = music.underground;
        beatPulser.setMusic(currentMusic);
        currentMusic.play();
        musicPlaying = true;
        e.innerHTML = "Stop Underground Music";
    }
}


function update() {
    requestAnimationFrame(update);

    if (loading)
        return;

    if (musicPlaying)
        currentMusic.update();

    beatPulser.update();

    for (let e = 0; e < entities.length; e++) {
        let entity = entities[e];
        entity.update();

        if ((entity.x < 0 ||
        entity.x + (entity.width * entity.scale) > WIDTH) &&
        entity.action == "walking") {
            entity.turn();
        }

        if (musicPlaying && currentMusic.isBahTime()) {
            entity.dance();
        }

        platform.collision(entity);
    }

    render();
}

function render() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    if (loading) {
        renderLoading();
        return;
    }

    beatPulser.render();

    for (let e = 0; e < entities.length; e++)
        entities[e].render();

    platform.render();
}

function renderLoading() {
    ctx.fillStyle = "#8F8";
    ctx.fillRect(0, 0, ((numOfImagesLoaded + numOfAudioLoaded) / (numOfImages + numOfAudio)) * WIDTH, 5);
    ctx.fillText("Loading ...", 10, 20);
}

update();
