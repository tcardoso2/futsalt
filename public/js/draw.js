//Called in every frame
function onDraw(items, canvas, ctx) {
    //Animate!
    //TODO: Not the best place to animate the model
    ctx.match.playerStats["Tsubasa"].stamina = ctx.players["Tsubasa"].getAttributes().getStamina().toFixed(0)
    ctx.players["Tsubasa"].moveTowards(ctx.ball, (objective) => {
        //Successfully got the ball
    }, (objective) => {
        ctx.match.playerStats["Tsubasa"].stats.ballChallenges++
    }, (error) => {        
        alert(error)
    });
    ctx.ball.place(canvas.mouse.x, canvas.mouse.y, true)
    let content = `Mouse: ${canvas.mouse.x}, ${canvas.mouse.y}`
    content += `<br />Player: ${ctx.players["Tsubasa"].fieldPosX()}, ${ctx.players["Tsubasa"].fieldPosY()}`
    content += `<br />Ball: ${ctx.ball.fieldPosX()}, ${ctx.ball.fieldPosY()}`
    content += `<br />Vector: ${JSON.stringify(ctx.players["Tsubasa"].getDistanceToObj())}`
    content += `<br />FPS: ${canvas.getFPS()}`

    $('.rightbox').html(content)
    $('.leftbox').html(JSON.stringify(ctx.match.playerStats))
    for(let i in items){
        canvas.drawImage(canvas.scene[items[i].obj], items[i].pos.x(), items[i].pos.y(), ALIGN.CENTER.MIDDLE, items[i].pos.rotation());
    }
}