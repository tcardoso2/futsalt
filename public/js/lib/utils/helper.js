/**
 * When calculating stamina, by default values come up with many decimal places, this
 * helper function rounds the values to 0 decimal places in the context object
 * @public
 * @since 0.10
 * @param {Context} ctx the context of the application
 */
function roundStaminaValues(ctx) {
    Object.keys(ctx.players).forEach(name => {
        ctx.match.playerStats[name].stamina = ctx.players[name].getAttributes().getStamina().toFixed(0)
    });
}