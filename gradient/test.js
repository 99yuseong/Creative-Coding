gradientColor(ctx) {
    this.color = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.r
    );
    this.color.addColorStop(1, 'rgba(1,159,98,0)');
    this.color.addColorStop(0, '#A7D30C');
}