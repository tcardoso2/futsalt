//Gets called when the first frame runs
function onFirstFrame(items, canvas, ctx) {
    //Generate the entities
    var player1 = playersFactory().create("Tsubasa", 10)
    var field1 = new Field(-300,300,-190,190)
    var ball1 = new Ball(0, 0)
    ctx.ball = ball1
    
    //Create the canvas elements
    let field = renderField(canvas, null, field1)
    let ball = renderBall(canvas, field, ball1)
    let player = renderFieldPlayer(canvas, field, player1)

    //Push to the canvas scene, order matters!
    items.push(field)
    items.push(ball)
    items.push(player)
}