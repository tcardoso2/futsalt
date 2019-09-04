import context from './lib/entities/context'
import { playersFactory } from './lib/entities/playerFactory'
import settings from './etc/settings'
import Field from './lib/entities/field'
import Ball from './lib/entities/ball'
import renderField from './lib/objects/field'
import renderFieldPlayer from './lib/objects/fieldPlayer'
import renderBall from './lib/objects/ball'
import renderImage from './lib/objects/image'

/**
 * Gets called when the first frame of canvas runs
 * @public
 * @since 0.10
 * @param {object} canvas canvas of the application
 * @param {Context} ctx the context of the application
 */
function onFirstFrame(canvas, ctx = context) {
    createMainScene(canvas, ctx)
    createVSScene(canvas, ctx)
}
/**
 * Creates the main scene: Players, stamina bars, Field, Ball and other elements in the game.
 * Subscribes to match Observer pattern to receive updates when a goal is scored
 * and updates score on UI
 * @public
 * @since 0.10
 * @param {object} canvas canvas of the application
 * @param {Context} ctx the context of the application
 * @todo Earlier version (PoC hard-codes only 2 player names, this will be done via web service in future and for whole team)
 */
let createMainScene = (canvas, ctx = context) => {
    //Generate the entities
    var player1 = playersFactory().create("Tsubasa", 10)
    var player2 = playersFactory().create("Hyuga", 10, { speed: 60 })
    //Assign as opponent sides
    player1.assignLeftField()
    player2.assignRightField()
    //Create the stamina gauges
    //TODO: To replace by React
    /*$(settings().game.html.staminaBars).append(`<li id="fieldPlayer_${player1.name}"><div class="value"><div></li>`); 
    $("ul.stamina-bars").append(`<li id="fieldPlayer_${player2.name}"><div class="value"><div></li>`); 
    */
    //Create field and ball
    var field1 = new Field(-300,300,-190,190)
    var ball1 = new Ball(window.innerWidth/2, window.innerHeight/2)
    ctx.addBall(ball1)

    //Create and push the canvas elements to the canvas scene, order matters! Last stays on top
    let field = renderField(canvas, null, field1)
    ctx.addToScene(field)
    ctx.addToScene(renderFieldPlayer(canvas, field, player1))
    ctx.addToScene(renderFieldPlayer(canvas, field, player2))
    
    ctx.addToScene(renderBall(canvas, field, ball1))

    initialPositions(canvas, ctx)
    updatePanelOnGoal(canvas, ctx)
}
/**
 * Subscribes to 'GoalScored' events to update the score on left of right side
 * @public
 * @since 0.10
 * @param {object} canvas canvas of the application
 * @param {Context} ctx the context of the application
 */
function updatePanelOnGoal(canvas, ctx = context){
    ctx.match.subscribe((val) => {
        if(val[2] == "GoalScored") {
            //TODO: To replace by React
            /*$(settings().game.html.rightScore).html(val[1].getScore().home)
            $(settings().game.html.leftScore).html(val[1].getScore().away)
            */
        }
        initialPositions(canvas, ctx)
    })
}
/**
 * Pauses the match and puts the players in their initial positions,
 * and resumes the match after {resumeAfter} milliseconds
 * @public
 * @since 0.10
 * @param {object} canvas canvas of the application
 * @param {Context} ctx the context of the application
 * @param {integer} resumeAfter the context of the application
 */
function initialPositions(canvas, ctx = context, resumeAfter = settings().game.initialPositions.resumeAfterMS) {
    ctx.pauseMatch()
    ctx.ball.place(canvas.mouse.x, canvas.mouse.y, true)
    //TODO, improve, the player names should not be hard-coded
    ctx.players["Tsubasa"].place(100, 0, true, true)
    ctx.players["Hyuga"].place(-100, 0, true, true)
    ctx.ball.place(0, 0, true, true)
    //TODO Detach players from Ball
    setTimeout(()=> {
        ctx.resumeMatch()
    }, resumeAfter)
}

/**
 * Adds to the VS scene the VS scene canvas elements but does not render it
 * @public
 * @since 0.10
 * @param {object} canvas canvas of the application
 * @param {Context} ctx the context of the application
 */
function createVSScene(canvas, ctx = context) {
    let vs = new Image(0, 0)
    let p1 = new Image(0, 0)
    let p2 = new Image(0, 0)
    const VS = settings().scenes.vs

    ctx.getScene().newScene(VS)
    ctx.getScene().addToScene(renderImage(canvas, settings().files.vs, window.innerWidth/2, window.innerHeight/2, 0), VS)
    ctx.getScene().addToScene(renderImage(canvas, "tsubasa.png", window.innerWidth/2+200, window.innerHeight/2, 0), VS)
    ctx.getScene().addToScene(renderImage(canvas, "hyuga.png", window.innerWidth/2-200, window.innerHeight/2, 0), VS)
}

export default onFirstFrame