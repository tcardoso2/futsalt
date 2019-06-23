/**
 * Player Factory
 * Author: Tiago Cardoso
 * Created: 14Jun2019
 */

class PlayerFactory {
    constructor(context) {
        this.ctx = context
    }

    create(name, shirtNr = 1, attr) {
        let player = new Player(name, shirtNr, attr)
        if(this.ctx) {
            this.ctx.addPlayer(player)
        }
        return player
    }
}
let playerFactory

function initializePFactory(context) {
    playerFactory = new PlayerFactory(context)
}

function playersFactory() {
    return playerFactory
}
