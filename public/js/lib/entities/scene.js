/**
 * Scene Entity
 * Manages the Scenes in the Game
 * Author: Tiago Cardoso
 * Created: 22Jun2019
 */

const MAIN_SCENE = "main"

class SceneManager extends Subscriber {
    constructor() {
        super()
        let scenes = { main: new Scene() }
        let currentScene = MAIN_SCENE
        this.getScene = (sceneName) => scenes[sceneName]
        this.getCurrentScene = () => scenes[currentScene]
        this.addToScene = (actor, scene = MAIN_SCENE) => this.getScene(scene).addActor(actor)
        this.addOverlay = (overlay, scene = MAIN_SCENE) => this.getScene(scene).addOverlay(overlay)
        this.getActors = () => this.getCurrentScene().getActors()
        this.getOverlays = () => this.getCurrentScene().getOverlays()
        this.newScene = (sceneName) => scenes[sceneName] = new Scene(sceneName) 
        this.sceneExists = (sceneName) => scenes[sceneName] instanceof Scene 
        this.changeTo = (sceneName) => {
            if(!this.sceneExists(sceneName)) this.newScene(sceneName)
            currentScene = sceneName
        }
    }

    //Draws the current scene
    draw(canvas, items = this.getActors(), overlays = this.getOverlays()) {
        //Make sure it draws the current scene
        // Grab the Canvas and Drawing Context
        var ctx = canvas.c
        for(let i in items){
            if(checkClip(items[i])) {
                ctx.save()
                // Create a circle
                ctx.beginPath()
                ctx.arc(items[i].pos.x(), items[i].pos.y(), items[i].clip.radius, 0, Math.PI * 2, false)
                // Clip to the current path
                ctx.clip()
            }
            canvas.drawImage(canvas.scene[items[i].obj], items[i].pos.x(), items[i].pos.y(), ALIGN.CENTER.MIDDLE, items[i].pos.rotation())
            //TODO: This is players specific, add something more appropriate to distinguish
            $(`#${items[i].obj}`).css({
                left: items[i].pos.x()-30, 
                top: items[i].pos.y()+30
            })
            // Undo any clipping
            ctx.restore()
        }
        //ctx.restore();
        //throw "test"
        //Overlays are always on top
        for(let o in overlays){
            canvas.drawImage(overlays[o], window.innerWidth/2, window.innerHeight/2, ALIGN.CENTER.MIDDLE, 0);
        }
    }
}

function checkClip(object) {
    return object.clip !== undefined
}

function alpha() {
    // Grab the Canvas and Drawing Context
    var ctx = canvas.c
    
    // Create an image element
    var img = document.createElement('IMG');
    
    // When the image is loaded, draw it
    img.onload = function () {
    
        // Save the state, so we can undo the clipping
        ctx.save();
        // Create a circle
        ctx.beginPath();
        ctx.arc(window.innerWidth/2, window.innerHeight/2, 74, 0, Math.PI * 2, false);
        // Clip to the current path
        ctx.clip();
        ctx.drawImage(img, 200, 200);
        // Undo the clipping
        ctx.restore();
    }
    
    // Specify the src to load the image
    img.src = "img/other/captain-tsubasa-tatakae-dream-team-tsubasa-oozora-fiction-captain-tsubasa.jpg";
 }

class Scene {
    constructor(sceneName = "main") {
        let name = sceneName
        let items = []
        let overlays = []
        this.addActor = (actor) => items.push(actor)
        this.addOverlay = (overlay) => overlays.push(overlay)
        this.getActors  = () => items
        this.getOverlays  = () => overlays
    }
}