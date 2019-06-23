/**
 * Main
 * Will initialize the HTML5 canvas
 * Author: Tiago Cardoso
 * Created: 12Jun2019
 */

//let ball = require('./lib/objects/ball');

var canvas = new Canvas('main', 0, function() {
    // Clear the canvas
    this.clear()
    drawGrid(this)
});

var context = new Context()
let match = new Match()
context.subscribe(match.addNewPlayer, match)
context.match = match //Easy accessor

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


