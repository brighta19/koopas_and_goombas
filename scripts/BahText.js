class BahText {
    constructor(x, y, rotation, color) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.primaryColor = color.primary;
        this.secondaryColor = color.secondary;
        this.remove = false;
        this.opacity = 1;
    }

    constructColor(color) {
        return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${this.opacity})`;
    }

    update() {
        if (this.remove)
            return;

        if (this.opacity > 0)
            this.opacity -= BahText.FADE_OUT_SPEED;
        else
            this.remove = true;
    }

    render() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.font = "50px sans-serif";
        ctx.textBaseline = "top";
        ctx.textAlign = "center";
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.constructColor(this.secondaryColor);
        ctx.fillStyle = this.constructColor(this.primaryColor);
        ctx.fillText("BAH!", 0, 0);
        ctx.restore();
    }
}
BahText.TEXT_RGB_COLOR = [0xff, 0x55, 0x00];
BahText.RECT_RGB_COLOR = [0xff, 0xff, 0xff];
BahText.FADE_OUT_SPEED = 0.01;
