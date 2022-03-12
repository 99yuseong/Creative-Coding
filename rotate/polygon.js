class polygon {
    constructor(height) {
        this.points = 24;
        this.angle = (Math.PI * 2) / this.points;
        this.rotate = 0;
        this.color = [
            '#ca00d5',
            '#ef3e2f',
            '#b05af2',
            '#e8c476',
            '#e8bcf4',
            '#615118',
            '#fca6dd',
            '#ddccbd',
            '#e6cbeb',
            '#81156a',
            '#eba118',
            '#7956ed',
            '#ca00d5',
            '#ef3e2f',
            '#b05af2',
            '#e8c476',
            '#e8bcf4',
            '#615118',
            '#fca6dd',
            '#ddccbd',
            '#e6cbeb',
            '#81156a',
            '#eba118',
            '#7956ed',
        ];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.centerX = stageWidth / 2;
        this.centerY = stageHeight / 2;

        this.squareWidth = 300;
        this.squareHeight = 300;
        this.r = stageHeight * (3 / 2);
    }

    animate(ctx, moveX) {
        ctx.save();
        ctx.translate(this.centerX, this.stageHeight * (13 / 6));
        this.rotate -= moveX * 0.005;
        ctx.rotate(this.rotate);

        for (let i = 1; i <= this.points; i++) {
            this.x = this.r * -Math.sin(this.angle * i);
            this.y = this.r * Math.cos(this.angle * i);

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle * i - (3 / 2) * Math.PI);

            ctx.fillStyle = this.color[i - 1];
            ctx.fillRect(
                0,
                -this.squareWidth / 2,
                this.squareHeight,
                this.squareWidth
            );
            ctx.restore();
        }
        ctx.restore();
    }
}
