class BallGroup {
    constructor(num) {
        this.ballNum = num;
        this.balls = [];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.init();
    }

    init() {
        this.balls = [];

        for (let i = 0; i < this.ballNum; i++) {
            const ball = new Ball();
            this.balls[i] = ball;
            ball.resize(this.stageWidth, this.stageHeight);
        }
    }

    animate(ctx) {
        for (let i = 0; i < this.ballNum; i++) {
            const ball = this.balls[i];
            ball.animate(ctx);
        }
    }
}
