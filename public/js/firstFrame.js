//Gets called when the first frame runs
function onFirstFrame(items, canvas) {
    //Generate the team
    var player1 = playersFactory().create("Tsubasa", 10)
    //Draw all the necessary elements, order matters!
    let field = renderField(canvas)
    items.push(field)
    items.push(renderBall(canvas))
    items.push(renderFieldPlayer(canvas, field, player1))
}