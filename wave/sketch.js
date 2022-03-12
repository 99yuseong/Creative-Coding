const width = window.innerWidth;
const height = window.innerHeight;
const dotNum = 30;
const waves = [];

class Dot {
    constructor(index) {
        this.x = (index * width) / (dotNum - 1);
        this.y = height / 2;
        this.t = Math.PI / 60;
        this.a = height / 3;
        this.interval = index * 2;
    }

    move() {
        this.y = this.a * sin(this.t * this.interval) + height / 2;
        point(this.x, this.y);
        this.interval += 1;
    }
}

class Wave {
    constructor(color) {
        this.dots = [];
        this._color = color;

        for (let i = 0; i < dotNum; i++) {
            let newDot = new Dot(i);
            this.dots.push(newDot);
        }
    }

    waveDots() {
        for (const dot of this.dots) {
            dot.move();
        }
    }

    paintConnectedDots() {
        strokeWeight(0);
        fill(this._color);
        for (let i = 0; i < dotNum - 1; i = i + 1) {
            let dot1 = this.dots[i];
            let dot2 = this.dots[i + 1];
            quad(
                dot1.x,
                dot1.y,
                dot2.x,
                dot2.y,
                dot2.x,
                height,
                dot1.x,
                height
            );
        }
    }

    draw() {
        this.waveDots();
        this.paintConnectedDots();
    }
}

const waveRed = new Wave('rgba(255,0,0,0.1)');
const waveGreen = new Wave('rgba(0,255,0,0.1)');
const waveBlue = new Wave('rgba(0,0,255,0.1)');

setup = () => {
    createCanvas(windowWidth, windowHeight);
};

draw = () => {
    background(255);
    waveRed.draw();
    waveGreen.draw();
    waveBlue.draw();
};
