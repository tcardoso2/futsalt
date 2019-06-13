/**
 * Player Factory
 * Author: Tiago Cardoso
 * Created: 14Jun2019
 */

class PlayerFactory {
    constructor(context) {
        this.ctx = context
    }

    create(name, shirtNr = 1) {
        this.ctx.players[name] = new Player(name, shirtNr)
        return this.ctx.players[name]
    }
}
let playerFactory

function initializePFactory(context) {
    playerFactory = new PlayerFactory(context)
}

function playersFactory() {
    return playerFactory
}
