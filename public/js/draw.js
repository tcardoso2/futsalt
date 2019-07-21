/**
 * Called every frame. Draws the canvas scenes:
 * - rounds stamina values to integer
 * - moves players
 * - updates Development panel (might be deprecated in future)
 * - updates game clock
 * - updates player stat window (e.g. remaining stamina)
 * - draws stamina gauges
 * @public
 * @since 0.10
 * @param {object} canvas canvas of the application
 * @param {Context} ctx the context of the application
 */
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
/**
 * Moves and re-draws (canvas) players in the field, only if the match is not paused
 * @public
 * @since 0.10
 * @param {Context} ctx the context of the application
 */
function movePlayers(ctx) {
    if(!ctx.matchIsPaused()) {
        ctx.movePlayers()
    }
}

/**
 * Updates players info stats view (hmtl) on the screen
 * @public
 * @since 0.10
 * @param {Context} ctx the context of the application
 */
function updatePlayerStats(ctx) {
    $(settings().game.html.leftbox).html(JSON.stringify(ctx.match.playerStats))
}

/**
 * Updates the clock info (mm:ss) and first/second/extra time info
 * @public
 * @since 0.10
 * @param {Context} ctx the context of the application
 */
function updateClock(ctx) {
    $(settings().game.html.clock).html(ctx.updateClock())
    let _half = ctx.updateHalf()
    if(ctx.ball.getAttackDirection() != 0) {
        _half = ctx.ball.getAttackDirection() == 1 ? `<< ${_half}` : `${_half} >>`
    } 
    $(settings().game.html.half).html(_half)
}

/**
 * Updates a panel on the screen with some dev info. DEV/debug purposes only, will be removed in future
 * @public
 * @since 0.10
 * @deprecated
 * @todo Deprecate or have a setting for dev/debug mode where this is shown
 * @param {Context} ctx the context of the application
 */
function updateDevPanel(canvas, ctx) {
    //TODO: Update as still hard-codes to specific player
    let content = `Mouse: ${canvas.mouse.x}, ${canvas.mouse.y}`
    content += `<br />Player: ${ctx.players["Tsubasa"].fieldPosX()}, ${ctx.players["Tsubasa"].fieldPosY()}`
    content += `<br />Ball: ${ctx.ball.fieldPosX()}, ${ctx.ball.fieldPosY()}`
    content += `<br />Owner: ${ctx.ball.isFree() ? "-" : ctx.ball.getOwner().name }`
    content += `<br />Vector: ${JSON.stringify(ctx.players["Tsubasa"].getDistanceToObj())}`
    content += `<br />FPS: ${canvas.getFPS().toFixed(0)}`
    content += `<br />Paused: ${ctx.match.isPaused()}`
    $(settings().game.html.rightbox).html(content)
}

/**
 * Draws the stamina player gauges next to the canvas element of the player in the field
 * @public
 * @since 0.10
 * @param {Context} ctx the context of the application
 */
function drawGauges(ctx) {
    Object.keys(ctx.players).forEach(name => {
        drawGauge(ctx, name)
    });
}

/**
 * Draws a particular player gauge on the screen
 * @public
 * @since 0.10
 * @param {Context} ctx the context of the application
 * @param {String} player the player name
 */
function drawGauge(ctx, player) {
    let stamina = ctx.match.playerStats[player].stamina
    $(`#fieldPlayer_${player} > div.value`).css({
        width: stamina/2,
        backgroundColor: stamina < 55 ? (stamina < 20 ? 
            settings().game.gauges.veryLowStaminaColor : 
            settings().game.gauges.lowStaminaColor) : 
            settings().game.gauges.highStaminaColor
    })
}

/**
 * Updates the score on the panel
 * @public
 * @since 0.10
 * @param {Context} ctx the context of the application
 */
function updateScore(ctx) {
    $(settings().game.html.rightScore).html(ctx.match.getScore().home)
    $(settings().game.html.leftScore).html(ctx.match.getScore().away)
}
