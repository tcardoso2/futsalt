//Called in every frame
function onDraw(canvas, ctx) {
    //Animate!
    //TODO: Not the best place to animate the model
    ctx.match.playerStats["Tsubasa"].stamina = ctx.players["Tsubasa"].getAttributes().getStamina().toFixed(0)
    ctx.match.playerStats["Hyuga"].stamina = ctx.players["Hyuga"].getAttributes().getStamina().toFixed(0)
    if(!ctx.matchIsPaused()) {
        ctx.movePlayers()
        //ctx.ball.place(canvas.mouse.x, canvas.mouse.y, true)
        ctx.moveBall(canvas.mouse.x, canvas.mouse.y, ctx.ball.isFree(), true)    
    }
    let content = `Mouse: ${canvas.mouse.x}, ${canvas.mouse.y}`
    content += `<br />Player: ${ctx.players["Tsubasa"].fieldPosX()}, ${ctx.players["Tsubasa"].fieldPosY()}`
    content += `<br />Ball: ${ctx.ball.fieldPosX()}, ${ctx.ball.fieldPosY()}`
    content += `<br />Owner: ${ctx.ball.isFree() ? "-" : ctx.ball.getOwner().name }`
    content += `<br />Vector: ${JSON.stringify(ctx.players["Tsubasa"].getDistanceToObj())}`
    content += `<br />FPS: ${canvas.getFPS()}`
    content += `<br />Paused: ${ctx.match.isPaused()}`

    $('.rightbox').html(content)
    $('.leftbox').html(JSON.stringify(ctx.match.playerStats))
    //This creates the actual scene
    ctx.drawScene(canvas)
}