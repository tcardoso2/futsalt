import Canvas from './lib/canvas/canvas-1.2.dev'
import Context from './lib/entities/context'
//Should not be required after migrating to react
import movePlayers from './draw'
import onDraw from './draw'
import onFirstFrame from './firstFrame'
import initializePFactory from './lib/entities/playerFactory'

var context
var canvas

export function drawMainCanvas(callback) {
/**
 * Main HTML 5 canvas object of the application.
 * Accessible from the /public/js/main.js file but it is recomended to treat it as solely a private variable.
 * @type object
 * @private
 * @since 0.10
 */
    canvas = new Canvas('main', 0, function() {
        // Clear the canvas
        this.clear()
        //Draw grid
        // Expensive grid drawing, would not work fast drawing it every frame
        this.strokeStyle('#333333');
        this.grid(10, 10);
        this.strokeStyle('rgb(0, 128, 0)');
        this.grid(50, 50);
    });

/**
 * Context for the application. Not to be mistaken by the canvas context
 * Accessible from the /public/js/main.js file but it is recomended to treat it as solely a private variable.
 * @type object
 * @public
 * @param {object} canvas Canvas object of the application
 * @since 0.10
 * @see Context
 */

    context = new Context(canvas)
    initializePFactory(context)

    var animationLayer = canvas.createLayer('animation', 60, function(frameDuration, totalDuration, frameNumber) {
        this.clear();
        // this.firstFrame is true when rendering the first frame, you can use this to setup the scene
        if (this.firstFrame) {
            // this.scene is an empty object that can be used as a namespace for your scene objects
            // using renderToCanvas that allows rendering something into an image and later draw it
            // on the canvas with drawImage() method
            onFirstFrame(this, context)
        }
        //movePlayers(context)
        onDraw(this, context)
        if (callback) callback(context)
    })
}

export default drawMainCanvas