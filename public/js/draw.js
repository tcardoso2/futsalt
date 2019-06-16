//Called in every frame
function onDraw(items, canvas, ctx) {
    //Animate!
    //TODO: Not the best place to animate the model
    ctx.players["Tsubasa"].move(1,1)
    ctx.ball.place(canvas.mouse.x, canvas.mouse.y, true)
    $('.mouse').html(`Mouse: ${canvas.mouse.x}, ${canvas.mouse.y}<br />Ball: ${ctx.ball.fieldPosX()}, ${ctx.ball.fieldPosY()}`)
    for(let i in items){
        canvas.drawImage(canvas.scene[items[i].obj], items[i].pos.x(), items[i].pos.y(), ALIGN.CENTER.MIDDLE, items[i].pos.rotation());
    }
}