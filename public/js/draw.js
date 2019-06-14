//Called in every frame
function onDraw(items, canvas, ctx) {
    //Animate!
    ctx.players["Tsubasa"].fieldPosX++
    for(let i in items){
        canvas.drawImage(canvas.scene[items[i].obj], items[i].pos.x(), items[i].pos.y(), ALIGN.CENTER.MIDDLE, items[i].pos.rotation());
    }
}