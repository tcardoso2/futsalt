//Called in every frame
function onDraw(items, canvas, ctx) {
    //Animate!
    //TODO: Not the best place to animate the model
    ctx.players["Tsubasa"].moveTowards(ctx.ball, (objective) => {
        ctx.match.playerStats["Tsubasa"].stats.ballPossessions++
    });
    ctx.ball.place(canvas.mouse.x, canvas.mouse.y, true)
    let content = `Mouse: ${canvas.mouse.x}, ${canvas.mouse.y}`
    content += `<br />Player: ${ctx.players["Tsubasa"].fieldPosX()}, ${ctx.players["Tsubasa"].fieldPosY()}`
    content += `<br />Ball: ${ctx.ball.fieldPosX()}, ${ctx.ball.fieldPosY()}`
    content += `<br />Vector: ${JSON.stringify(ctx.players["Tsubasa"].vector)}`
    content += `<br />FPS: ${canvas.getFPS()}`

    $('.rightbox').html(content)
    $('.leftbox').html(JSON.stringify(ctx.match.playerStats))
    for(let i in items){
        canvas.drawImage(canvas.scene[items[i].obj], items[i].pos.x(), items[i].pos.y(), ALIGN.CENTER.MIDDLE, items[i].pos.rotation());
    }
}