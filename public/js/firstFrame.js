//Gets called when the first frame runs
function onFirstFrame(items, canvas) {
    //Draw all the necessary elements
    items.push(renderField(canvas))
    items.push(renderBall(canvas))
}