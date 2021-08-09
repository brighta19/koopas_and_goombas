class Sprite {
    constructor(image, numberOfFrames, frameWidth, frameHeight, numberOfTicks) {
        this.image = image;
        this.numberOfFrames = numberOfFrames;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.numberOfTicks = numberOfTicks;

        this.frameIndex = 0;
        this.ticks = -1;
    }

    isDone() {
        return this.frameIndex >= this.numberOfFrames || this.frameIndex === -1;
    }

    startFromBeginning() {
        this.frameIndex = 0;
    }

    startFromEnd() {
        this.frameIndex = this.numberOfFrames - 1;
    }

    nextFrame() {
        this.ticks++;
        if (this.ticks >= this.numberOfTicks) {
            this.ticks = 0;
            this.frameIndex++;
        }
    }

    previousFrame() {
        this.ticks++;
        if (this.ticks >= this.numberOfTicks) {
            this.ticks = 0;
            this.frameIndex--;
        }
    }

    getCurrentFrame() {
        return {
            image: this.image,
            x: this.frameIndex * this.frameWidth,
            y: 0,
            width: this.frameWidth,
            height: this.frameHeight,
        };
    }
}
