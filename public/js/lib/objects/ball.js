function renderBall(canvas) {
    canvas.scene.ball = canvas.renderToCanvas(50, 50, 0, function() {
        // build a proxy to the image being loaded
        canvas.beginRadialGradient(0, 0, 10, 0, 0, 25, {
            0.0: 'rgba(0, 255, 0, 0)',
            1.0: 'rgba(0, 255, 0, 0.5)'
        });
        canvas.fillCircle(0, 0, 25);

        canvas.endGradient();

        canvas.fillColor('#FFFFFF');
        canvas.font('10px Courier');
        canvas.fillText("loading", 25, 25, ALIGN.CENTER.MIDDLE);
    });

    // imitate some loading time
    window.setTimeout(function() {
        // load a ball image
        canvas.loadImage('img/ball.png', function(image) {
            // image has loaded, replace the ball proxy canvas with it
            canvas.scene.ball = image;
        },
        function(image) {
            alert('Error: Loading image "' + image.src + '" failed');
        });
    }, 0);
    //Must return the object name so that we know what to draw
    return {
        obj: "ball",
        pos: {
            x: () => canvas.mouse.x,
            y: () => canvas.mouse.y,
            rotation: () => canvas.mouse.x * 2
        }
    }
}