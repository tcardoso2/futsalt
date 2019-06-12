function renderField(canvas) {
    canvas.scene.field = canvas.renderToCanvas(50, 50, 0, function() {
        // build a proxy to the image being loaded
        canvas.beginRadialGradient(0, 0, 10, 0, 0, 25, {
            0.0: 'rgba(0, 255, 0, 0)',
            1.0: 'rgba(0, 255, 0, 0.5)'
        });
        canvas.fillRect(0, 0, 700, 490);

        canvas.endGradient();

        canvas.fillColor('#FFFFFF');
        canvas.font('10px Courier');
        canvas.fillText("loading", 25, 25, ALIGN.CENTER.MIDDLE);
    });

    // imitate some loading time
    window.setTimeout(function() {
        // load a ball image
        canvas.loadImage('img/soccer-field.jpg', function(image) {
            // image has loaded, replace the field proxy canvas with it
            canvas.scene.field = image;
        },
        function(image) {
            alert('Error: Loading image "' + image.src + '" failed');
        });
    }, 0);
    //Must return the object name so that we know what to draw
    return {
        obj: "field",
        pos: {
            x: () => 650,
            y: () => 350,
            rotation: () => 0
        }
    }
}