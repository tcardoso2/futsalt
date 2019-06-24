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
        this.match = {}
        this.scene = new SceneManager()
    }

    //Player
    addPlayer(player) {
        this.players[player.name] = player
        //For now we subscribe this function to the player in the field
        player.subscribe((content) => {
            $('.footer-comments').html(JSON.stringify(content[0]))
        })
        //Notifies player was added
        super.trigger(player)
    }

    //Match
    pauseMatch() {
        this.match.pause()
    }

    matchIsPaused() {
        return this.match.isPaused()
    }

    //Scene
    drawScene(canvas) {
        this.scene.draw(canvas)
    }

    //Players
    movePlayers() {
        for(let p in this.players) {
            this.players[p].moveTowards(this.ball, (objective) => {
                //Successfully got the ball
            }, (objective) => {
                //Another player has / wants the ball, challenge mode!
                this.match.playerStats[this.players[p].name].stats.ballChallenges++
                this.pauseMatch()
                this.scene.changeTo("VS")
                //Temporary, TODO add real VS logic and when done change back
                //this.ctx.challenge((done) => {
                    //changeBack
                //})
                let self = this.scene
                setTimeout(() => {
                    self.changeTo("main")
                }, 5000)
            }, (error) => {        
                alert(error)
            })
        }
    }
 }