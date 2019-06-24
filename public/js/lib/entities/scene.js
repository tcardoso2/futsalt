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
        for(let i in items){
            canvas.drawImage(canvas.scene[items[i].obj], items[i].pos.x(), items[i].pos.y(), ALIGN.CENTER.MIDDLE, items[i].pos.rotation());
        }
        //Overlays are always on top
        for(let o in overlays){
            canvas.drawImage(overlays[o], window.innerWidth/2, window.innerHeight/2, ALIGN.CENTER.MIDDLE, 0);
        }
    }
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