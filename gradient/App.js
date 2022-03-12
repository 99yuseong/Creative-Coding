class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.ballGroup = new BallGroup(30);

        document.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;

        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.ctx.globalCompositeOperation = 'saturation';
        this.ballGroup.resize(this.stageWidth, this.stageHeight);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.ballGroup.animate(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
};
