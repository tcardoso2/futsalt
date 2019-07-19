//Called in every frame
function onDraw(canvas, ctx) {
    //TODO: Not the best place to animate the model
    roundStaminaValues(ctx)
    movePlayers(ctx)
    updateDevPanel(canvas, ctx)
    updateClock(ctx)
    updatePlayerStats(ctx)
    drawGauges(ctx)

    //This creates the actual scene
    ctx.drawScene()
}

function movePlayers(ctx) {
    if(!ctx.matchIsPaused()) {
        ctx.movePlayers()
        //ctx.moveBall(window.innerWidth/2, 0, ctx.ball.isFree(), true)    
    }
}

function roundStaminaValues(ctx) {
    Object.keys(ctx.players).forEach(name => {
        ctx.match.playerStats[name].stamina = ctx.players[name].getAttributes().getStamina().toFixed(0)
    });
}

function updatePlayerStats(ctx) {
    $('.leftbox').html(JSON.stringify(ctx.match.playerStats))
}

function updateClock(ctx) {
    $('.clock').html(ctx.updateClock())
    $('.half').html(ctx.updateHalf())
}

function updateDevPanel(canvas, ctx) {
    //TODO: Update as still hard-codes to specific player
    let content = `Mouse: ${canvas.mouse.x}, ${canvas.mouse.y}`
    content += `<br />Player: ${ctx.players["Tsubasa"].fieldPosX()}, ${ctx.players["Tsubasa"].fieldPosY()}`
    content += `<br />Ball: ${ctx.ball.fieldPosX()}, ${ctx.ball.fieldPosY()}`
    content += `<br />Owner: ${ctx.ball.isFree() ? "-" : ctx.ball.getOwner().name }`
    content += `<br />Vector: ${JSON.stringify(ctx.players["Tsubasa"].getDistanceToObj())}`
    content += `<br />FPS: ${canvas.getFPS().toFixed(0)}`
    content += `<br />Paused: ${ctx.match.isPaused()}`
    $('.rightbox').html(content)
}

function drawGauges(ctx) {
    Object.keys(ctx.players).forEach(name => {
        drawGauge(ctx, name)
    });
}

function drawGauge(ctx, player) {
    let stamina = ctx.match.playerStats[player].stamina
    $(`#fieldPlayer_${player} > div.value`).css({
        width: stamina/2,
        backgroundColor: stamina < 55 ? (stamina < 20 ? 'red' : 'yellow') : 'lightgreen'
    })
}