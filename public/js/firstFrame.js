//Gets called when the first frame runs
function onFirstFrame(canvas, ctx) {
    createMainScene(canvas, ctx)
    createVSScene(canvas, ctx)
}

function createMainScene(canvas, ctx) {
    //Generate the entities
    var player1 = playersFactory().create("Tsubasa", 10)
    player1.assignLeftField()
    var player2 = playersFactory().create("Hyuga", 10, { speed: 60 })
    player2.assignRightField()
    var field1 = new Field(-300,300,-190,190)
    var ball1 = new Ball(0, 0)
    ctx.ball = ball1

    //Create and push the canvas elements to the canvas scene, order matters!
    let field = renderField(canvas, null, field1)
    ctx.scene.addToScene(field)
    ctx.scene.addToScene(renderBall(canvas, field, ball1))
    ctx.scene.addToScene(renderFieldPlayer(canvas, field, player1))
    ctx.scene.addToScene(renderFieldPlayer(canvas, field, player2))

    ball1.place(canvas.mouse.x, canvas.mouse.y, true)
    player1.place(20, 0, true, true)
    player2.place(-20, 0, true, true)
}

function createVSScene(canvas, ctx) {
    var vs = new Image(0, 0)
    var p1 = new Image(0, 0)
    var p2 = new Image(0, 0)

    ctx.scene.newScene("VS")
    ctx.scene.addToScene(renderImage(canvas, "vs.png", window.innerWidth/2, window.innerHeight/2, 0), "VS")
    ctx.scene.addToScene(renderImage(canvas, "tsubasa.png", window.innerWidth/2-200, window.innerHeight/2, 0), "VS")
    ctx.scene.addToScene(renderImage(canvas, "hyuga.png", window.innerWidth/2+200, window.innerHeight/2, 0), "VS")
}