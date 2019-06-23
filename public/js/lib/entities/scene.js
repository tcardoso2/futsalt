/**
 * Scene Entity
 * Manages the Scenes in the Game
 * Author: Tiago Cardoso
 * Created: 22Jun2019
 */

class SceneManager extends Subscriber {
    constructor() {
        super()
        let scenes = { main: new Scene() }
        let currentScene = "main"
        this.getCurrentScene = () => scenes[currentScene]
        this.addToScene = (actor) => this.getCurrentScene().addActor(actor)
        this.getActors = () => this.getCurrentScene().getActors()
    }

    changeTo(sceneName) {
        //TODO
    }


    //Draws the current scene
    draw(canvas, items, overlays) {
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
    constructor() {
        let items = []
        let overlays = []
        this.addActor = (actor) => items.push(actor)
        this.getActors  = () => items
    }
}