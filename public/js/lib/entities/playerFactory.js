/**
 * Player Factory
 * Author: Tiago Cardoso
 * Created: 14Jun2019
 */

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

function initializePFactory(context) {
    playerFactory = new PlayerFactory(context)
}

function playersFactory() {
    return playerFactory
}
