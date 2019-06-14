class BaseObject {
    
    constructor(canvas, name, img) {
        this.name = name;
        this.canvas = canvas;
        this.img = img;
    }

    renderObject(canvas = this.canvas) {
        canvas.scene[this.name] = canvas.renderToCanvas(50, 50, 0, function() {
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

        var self = this;
        // imitate some loading time
        window.setTimeout(function() {
            // load a  image
            self.canvas.loadImage(`img/${self.img}`, function(image) {
                // image has loaded, replace proxy canvas with it
                self.canvas.scene[self.name] = image;
            },
            function(image) {
                alert(`Error: Loading image ${image.src} failed for ${self.name}`);
            });
        }, 0);
        //Must return the object name so that we know what to draw
        return {
            obj: this.name,
            //TODO: Consider having a separate object define this
            pos: {
                x: this.x,
                y: this.y,
                rotation: this.rotation
            }
        }
    }
    
    x() {
        throw new Error('Not implemented');
    }

    y() {
        throw new Error('Not implemented');
    }

    rotation() {
        throw new Error('Not implemented');
    }
}