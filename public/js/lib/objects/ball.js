function renderBall(canvas) {
    var ball = new baseObject(canvas, "ball", "ball.png");
    ball.x = () => canvas.mouse.x;
    ball.y = () => canvas.mouse.y;
    ball.rotation = () => canvas.mouse.x * 2;
    return ball.renderObject();
}