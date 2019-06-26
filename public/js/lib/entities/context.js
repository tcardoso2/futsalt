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

    /*
     __  __       _       _     
    |  \/  |     | |     | |    
    | \  / | __ _| |_ ___| |__  
    | |\/| |/ _` | __/ __| '_ \ 
    | |  | | (_| | || (__| | | |
    |_|  |_|\__,_|\__\___|_| |_|
                             
    */
    pauseMatch() {
        this.match.pause()
    }

    resumeMatch() {
        this.match.resume()
    }

    matchIsPaused() {
        return this.match.isPaused()
    }

   /* _____                     
     / ____|                    
    | (___   ___ ___ _ __   ___ 
     \___ \ / __/ _ \ '_ \ / _ \
     ____) | (_|  __/ | | |  __/
    |_____/ \___\___|_| |_|\___|
    */                          
                               
    drawScene(canvas) {
        this.scene.draw(canvas)
    }
    /*
     ____        _ _ 
    |  _ \      | | |
    | |_) | __ _| | |
    |  _ < / _` | | |
    | |_) | (_| | | |
    |____/ \__,_|_|_|
                     
    */   
    moveBall(x, y, condition, enforceBoundaries = true) {
        if(condition) {
            this.ball.place(x, y, enforceBoundaries)
        }
    }
    /*
     _____  _                           
    |  __ \| |                          
    | |__) | | __ _ _   _  ___ _ __ ___ 
    |  ___/| |/ _` | | | |/ _ \ '__/ __|
    | |    | | (_| | |_| |  __/ |  \__ \
    |_|    |_|\__,_|\__, |\___|_|  |___/
                     __/ |              
                    |___/               
    */
    addPlayer(player) {
        this.players[player.name] = player
        //For now we subscribe this function to the player in the field
        player.subscribe((content) => {
            content = $('.footer-comments').html() + " " + JSON.stringify(content[0])
            $('.footer-comments').html(content)
        })
        //Notifies player was added
        super.trigger(player)
    }

    movePlayers() {
        for(let p in this.players) {
            this.players[p].moveTowards(this.ball, (objective) => {
                //Successfully got the ball
            }, (ball, challenger) => {
                //Another player has / wants the ball, challenge mode!
                this.match.playerStats[ball.getOwner().name].stats.ballChallenges++
                this.pauseMatch()
                this.scene.changeTo("VS")
                let self = this
                challenger.matchUp(ball.getOwner(), (done) => {
                    setTimeout(() => {
                        self.scene.changeTo("main")
                        self.resumeMatch()
                    }, 3000)
                })
            }, (error) => {        
                alert(error)
            })
        }
    }
 }