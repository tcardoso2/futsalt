/**
 * Context Entity
 * Represents a context of the game, maintaing important information
 * like the players. Implements the Osbserver pattern by allowing
 * subscribers to be notified of changes
 * Author: Tiago Cardoso
 * Created: 16Jun2019
 */

class Context {
    constructor(players = {}, ball = null) {
        this.players = players
        this.ball = ball
        this.handlers = [] //Observers
        this.match
    }

    addPlayer(player) {
        this.players[player.name] = player
        this.trigger(player)
    }

    subscribe(subscriber, obj) {
        this.handlers.push([subscriber, obj])
    }

    unsubscribe([subscriber, obj]) {
        this.handlers = this.handlers.filter(
            (item) => {
                if (item !== [subscriber, obj]) return item
            }
        )
    }

    trigger(o, thisObj) {
        var scope = thisObj || window
        this.handlers.forEach(item => item[0].call(scope, o, item[1]))
    }
 }