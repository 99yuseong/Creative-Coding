const ITEM_WIDTH = 200;
const ITEM_HEIGHT = 200;
const PI2 = Math.PI * 2;

class Item {
    constructor() {
        this.pos = new Point();
        this.targetPos = new Point();
        this.downPos = new Point();
        this.posToDown = new Point();
        this.prevPos = new Point();
        this.isDown = false;
        this.r = Math.random() * 255;
        this.g = Math.random() * 255;
        this.b = Math.random() * 255;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.pos.x = Math.random() * (stageWidth - ITEM_WIDTH);
        this.pos.y = Math.random() * (stageHeight - ITEM_HEIGHT);

        this.targetPos.x = this.pos.x;
        this.targetPos.y = this.pos.y;
    }

    draw(ctx) {
        if (this.pos.x !== this.targetPos.x) {
            this.pos.x += (this.targetPos.x - this.pos.x) * 0.08;
            this.pos.y += (this.targetPos.y - this.pos.y) * 0.08;
            this.dx = this.targetPos.x - this.pos.x;
            this.dx *= 0.9;
        }

        ctx.save();
        ctx.translate(
            this.pos.x + this.posToDown.x,
            this.pos.y + this.posToDown.y
        );
        ctx.rotate(this.dx * 0.001);
        ctx.translate(
            -(this.pos.x + this.posToDown.x),
            -(this.pos.y + this.posToDown.y)
        );
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, 1)`;
        ctx.fillRect(this.pos.x, this.pos.y, ITEM_WIDTH, ITEM_HEIGHT);
        ctx.restore();

        if (this.isDown) {
            this.lineTo(ctx);
        }
    }

    lineTo(ctx) {
        ctx.fillStyle = `#ff4338`;
        ctx.strokeStyle = `#ff4338`;

        ctx.moveTo(
            this.pos.x + this.posToDown.x,
            this.pos.y + this.posToDown.y
        );
        ctx.arc(
            this.pos.x + this.posToDown.x,
            this.pos.y + this.posToDown.y,
            8,
            0,
            PI2,
            false
        );
        ctx.fill();

        ctx.moveTo(this.downPos.x, this.downPos.y);
        ctx.arc(this.downPos.x, this.downPos.y, 8, 0, PI2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(
            this.pos.x + this.posToDown.x,
            this.pos.y + this.posToDown.y
        );
        ctx.lineTo(this.downPos.x, this.downPos.y);
        ctx.stroke();
        ctx.closePath();
    }

    onDown(downX, downY) {
        if (
            downX >= this.pos.x &&
            downX <= this.pos.x + ITEM_WIDTH &&
            downY >= this.pos.y &&
            downY <= this.pos.y + ITEM_HEIGHT
        ) {
            this.downPos.x = downX;
            this.downPos.y = downY;
            this.posToDown.x = downX - this.pos.x;
            this.posToDown.y = downY - this.pos.y;
            this.prevPos.x = downX;
            this.prevPos.y = downY;
            this.isDown = true;
            return this;
        } else {
            return null;
        }
    }

    onMove(moveX, moveY) {
        this.downPos.x = moveX;
        this.downPos.y = moveY;
        this.targetPos.x = moveX - this.posToDown.x;
        this.targetPos.y = moveY - this.posToDown.y;
    }

    onUp() {
        this.isDown = false;
    }
}
