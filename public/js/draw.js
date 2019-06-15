//Called in every frame
function onDraw(items, canvas, ctx) {
    //Animate!
    //TODO: Not the best place to animate the model
    ctx.players["Tsubasa"].move(1,1)
    for(let i in items){
        canvas.drawImage(canvas.scene[items[i].obj], items[i].pos.x(), items[i].pos.y(), ALIGN.CENTER.MIDDLE, items[i].pos.rotation());
    }
}