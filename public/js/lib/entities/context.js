/**
 * Context Entity
 * Represents a context of the game, maintaing important information
 * like the players. Implements the Osbserver pattern by allowing
 * subscribers to be notified of changes
 * Author: Tiago Cardoso
 * Created: 16Jun2019
 */

class Context extends Subscriber{
    constructor(players = {}, ball = null) {
        super()
        this.players = players
        this.ball = ball
        this.match
    }

    addPlayer(player) {
        this.players[player.name] = player
        //For now we subscribe this function to the player in the field
        player.subscribe((content) => {
            $('.footer-comments').html(JSON.stringify(content[0]))
        })
        //Notifies player was added
        super.trigger(player)
    }
 }