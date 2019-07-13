class BaseObject {
    
    constructor(canvas, name, img) {
        this.name = name
        this.canvas = canvas
        this.img = img
        this.returnObject = {}
        this.extensions = {}
    }

    renderObject(canvas = this.canvas, img = this.img) {
        let self = this
        canvas.scene[this.name] = canvas.renderToCanvas(50, 50, 0, function() {
            // build a proxy to the image being loaded
            canvas.beginRadialGradient(0, 0, 10, 0, 0, 25, {
                0.0: 'rgba(0, 255, 0, 0)',
                1.0: 'rgba(0, 255, 0, 0.5)'
            });
            canvas.fillCircle(0, 0, 25)
            canvas.endGradient()    
            canvas.fillColor('#FFFFFF')
            canvas.font('10px Courier')
            canvas.fillText("loading", 25, 25, ALIGN.CENTER.MIDDLE)
            
            if(img) {
                canvas.loadImage(`img/${img}`, function(image) {
                    // image has loaded, replace proxy canvas with it, equivalent to image.onload
                    canvas.scene[self.name] = image //image is the DOM object
                },
                function(image) {
                    alert(`Error: Loading image ${image.src} failed for ${self.name}`)
                });
            }
        });

        //Must return the object name so that we know what to draw
        if(!this.renderObjectExists()) {
            this.initRenderObject()
        }
        return this.returnObject
    }
    
    renderObjectExists() {
        return (typeof this.returnObject.obj === 'string' || this.returnObject.obj instanceof String)
    }

    initRenderObject() {
        this.returnObject = {
            obj: this.name,
            //TODO: Consider having a separate object define this
            pos: {
                x: this.x,
                y: this.y,
                rotation: this.rotation
            },
            attr: {}
        }
        for (let key in this.extensions) {
            this.returnObject[key] = this.extensions[key]
        }
    }

    //Extends the object returned by "renderObject", overrides if existing
    extend(key, value) {
        this.extensions[key] = value
    }

    x() {
        throw new Error('Not implemented')
    }

    y() {
        throw new Error('Not implemented')
    }

    rotation() {
        throw new Error('Not implemented')
    }
}