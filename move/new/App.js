class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.downPos = new Point();
        this.movePos = new Point();
        this.items = [];
        this.totalItems = 10;
        for (let i = 0; i < this.totalItems; i++) {
            const item = new Item();
            this.items[i] = item;
        }

        document.body.addEventListener(
            'pointerdown',
            this.onDown.bind(this),
            false
        );
        document.body.addEventListener(
            'pointermove',
            this.onMove.bind(this),
            false
        );
        document.body.addEventListener(
            'pointerup',
            this.onUp.bind(this),
            false
        );

        document.body.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.pixelRatio = window.devicePixelRatio;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;

        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        for (let i = 0; i < this.totalItems; i++) {
            this.items[i].resize(this.stageWidth, this.stageHeight);
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 3;
        this.ctx.shadowBlur = 6;
        this.ctx.shadowColor = `rgba(0,0,0,0.5)`;

        this.ctx.lineWidth = 2;

        for (let i = 0; i < this.totalItems; i++) {
            this.items[i].draw(this.ctx);
        }

        requestAnimationFrame(this.animate.bind(this));
    }

    onDown(e) {
        this.downPos.x = e.clientX;
        this.downPos.y = e.clientY;

        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i].onDown(this.downPos.x, this.downPos.y);

            if (item) {
                this.currentItem = item;
                this.items.push(this.items.splice(i, 1)[0]);
                break;
            }
        }
    }

    onMove(e) {
        this.movePos.x = e.clientX;
        this.movePos.y = e.clientY;
        if (this.currentItem) {
            this.currentItem.onMove(this.movePos.x, this.movePos.y);
        }
    }

    onUp() {
        if (this.currentItem) {
            this.currentItem.onUp();
        }
        this.currentItem = null;
    }
}

window.onload = () => {
    new App();
};
