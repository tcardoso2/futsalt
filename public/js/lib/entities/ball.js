/**
 * Ball Entity
 * Represents a ball with it's position
 * Links with the object on the screen (field)
 * Author: Tiago Cardoso
 * Created: 16Jun2019
 */

//TODO: Inherit from base classe since others use also same attributes
class Ball extends BasePlayer {
    constructor(x, y) {
        super(x, y)
        this.name = "ball"
        this.owner = null
        this.request = (player) => {
            this.validatePlayer(player)
            //For now I make this simple, whichever player requests for ball, gets it
            this.owner = player
            return true
        }
        this.loose = (player) => {
            this.validatePlayer(player)
            this.owner = null
        }
        this.ownedBy = (player) => {
            this.validatePlayer(player)
            return this.owner == player
        }
        this.validatePlayer = (player) => {
            if (!(player instanceof Player)) throw new Error('Not a valid player entity')
        }
    }
    
}