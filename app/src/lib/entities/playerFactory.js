/**
 * Player Factory
 * Author: Tiago Cardoso
 * Created: 14Jun2019
 */

import Player from './player'

const PLAYER_AVATAR_FILE_EXTENSION = ".png"
const FOLDER_AVATARS_SMALL = "avatars/small/"

class PlayerFactory {
    constructor(context) {
        this.ctx = context
    }

    create(name, shirtNr = 1, attr, smallAvatar) {
        let player = new Player(name, shirtNr, attr)
        if(!smallAvatar) smallAvatar = name
        player.setSmallAvatar(`${FOLDER_AVATARS_SMALL}${smallAvatar}${PLAYER_AVATAR_FILE_EXTENSION}`)
        if(this.ctx) {
            this.ctx.addPlayer(player)
        }
        return player
    }
}
let playerFactory

/**
 * Initializes player factory and adds players to the context
 * @public
 * @since 0.10
 * @param {Context} context Context instance of the application
 */
export function initializePFactory(context) {
    playerFactory = new PlayerFactory(context)
}

export function playersFactory() {
    return playerFactory
}

export default initializePFactory
