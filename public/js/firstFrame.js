//Gets called when the first frame runs
function onFirstFrame(items, canvas) {
    //Generate the team
    var player1 = playersFactory().create("Tsubasa", 10)
    var field1 = new Field(-300,300,-190,190)
    //Draw all the necessary elements, order matters!
    let field = renderField(canvas, null, field1)
    items.push(field)
    items.push(renderBall(canvas))
    items.push(renderFieldPlayer(canvas, field, player1))
}