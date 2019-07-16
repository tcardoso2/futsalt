/**
 * Main HTML 5 canvas object of the application
 * @type object
 * @public
 * @since 0.1
 */
var canvas = new Canvas('main', 0, function() {
    // Clear the canvas
    this.clear()
    drawGrid(this)
});

/**
 * Context for the application. Not to be mistaken by the canvas context
 * @type object
 * @public
 * @param {object} canvas Canvas object of the application
 * @since 0.1
 */
var context = new Context(canvas)

/**
 * Initializes player factory and adds players to the context
 * @public
 * @since 0.1
 * @param {Context} context Context instance of the application
 */
initializePFactory(context)

var animationLayer = canvas.createLayer('animation', 60, function(frameDuration, totalDuration, frameNumber) {
    this.clear();
    // this.firstFrame is true when rendering the first frame, you can use this to setup the scene
    if (this.firstFrame) {
        // this.scene is an empty object that can be used as a namespace for your scene objects
        // using renderToCanvas that allows rendering something into an image and later draw it
        // on the canvas with drawImage() method
        onFirstFrame(this, context);
    }
    onDraw(this, context)
});