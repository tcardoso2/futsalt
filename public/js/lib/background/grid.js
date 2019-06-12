function drawGrid(canvas) {
    // Expensive grid drawing, would not work fast drawing it every frame
    canvas.strokeStyle('#333333');
    canvas.grid(10, 10);
    canvas.strokeStyle('rgb(0, 128, 0)');
    canvas.grid(50, 50);
}