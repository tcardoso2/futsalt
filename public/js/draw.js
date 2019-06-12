//Called in every frame
function onDraw(items, canvas) {
    // draw the ball image to mouse coordinates, centered and using rotation as a function of mouse x position
    for(let i in items){
        canvas.drawImage(canvas.scene[items[i].obj], items[i].pos.x(), items[i].pos.y(), ALIGN.CENTER.MIDDLE, items[i].pos.rotation());
    }
}