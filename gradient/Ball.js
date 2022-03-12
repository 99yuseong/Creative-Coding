class Ball {
    constructor() {
        const colors = [
            {
                // blue
                r: 45,
                g: 74,
                b: 277,
            },
            {
                // yellow
                r: 250,
                g: 255,
                b: 89,
            },
            {
                // pupple
                r: 255,
                g: 104,
                b: 248,
            },
            {
                // skyblue
                r: 44,
                g: 209,
                b: 252,
            },
            {
                //green
                r: 54,
                g: 233,
                b: 84,
            },
        ];

        this.x;
        this.y;
        this.r;
        this.direcX = Math.random() - Math.random();
        this.direcY = Math.random() - Math.random();
        this.speed = 10;
        this.vx = this.direcX * this.speed;
        this.vy = this.direcY * this.speed;
        this.vr = 3;

        this.color;
        this.colorObj = colors[Math.floor(Math.random() * 5)];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.init();
    }

    init() {
        this.x = Math.random() * this.stageWidth;
        this.y = Math.random() * this.stageHeight;
        this.r = this.stageWidth * (4 / 5);
        this.minR = this.stageWidth * (3 / 5);
        this.maxR = this.stageWidth * (5 / 5);
    }

    gradientColor(ctx) {
        const gColor = ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.r
        );

        gColor.addColorStop(
            0,
            `rgba(${this.colorObj.r}, ${this.colorObj.g}, ${this.colorObj.b}, 1)`
        );

        gColor.addColorStop(
            0.4,
            `rgba(${this.colorObj.r}, ${this.colorObj.g}, ${this.colorObj.b}, 0)`
        );

        gColor.addColorStop(
            1,
            `rgba(${this.colorObj.r}, ${this.colorObj.g}, ${this.colorObj.b}, 0)`
        );

        this.color = gColor;
    }

    animate(ctx) {
        this.x += this.vx;
        this.y += this.vy;
        this.r += this.vr;

        if (this.r < this.minR || this.r > this.maxR) {
            this.vr *= -1;
        }

        if (this.x < 0 || this.x > this.stageWidth) {
            this.vx *= -1;
        }
        if (this.y < 0 || this.y > this.stageHeight) {
            this.vy *= -1;
        }

        this.gradientColor(ctx);

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);

        ctx.fill();
    }
}
