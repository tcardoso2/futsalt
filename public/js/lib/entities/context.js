/**
 * Context Entity
 * Represents a context of the game, maintaing important information
 * like the players. Implements the Osbserver pattern by allowing
 * subscribers to be notified of changes
 * Author: Tiago Cardoso
 * Created: 16Jun2019
 */

class Context extends Subscriber{
    constructor(canvas, players = {}, ball = null) {
        super()
        this.canvas = canvas
        this.players = players
        if(ball) {
            this.addBall(ball)
        }
        let self = this
        let inInterval = false
        let halfEnd = (which) => {
            //inInterval = true
            self.halfEnd(which)
        }
        let match = new Match(halfEnd, [45, 45, 15, 15])
        this.subscribe(match.addNewPlayer, match)
        this.match = match //Easy accessor
        this.scene = new SceneManager()

        //Mouse Events
        if(!canvas) return
        canvas.onMouseUp = function(x, y, button) {
            // show different color circle based on the button pressed, the smaller circle
            this.fillStyle('#' + (button == 3 ? 'FF' : '00') + (button == 1 ? 'FF' : '00') + (button == 2 ? 'FF' : '00'));
            this.fillCircle(x, y, 5, ALIGN.CENTER.MIDDLE);
            if(self.inInterval()) {
                //inInterval = false
                self.match.startNextHalf()
            }
        }    
    }

    /*
     __  __       _       _     
    |  \/  |     | |     | |    
    | \  / | __ _| |_ ___| |__  
    | |\/| |/ _` | __/ __| '_ \ 
    | |  | | (_| | || (__| | | |
    |_|  |_|\__,_|\__\___|_| |_|
                             
    */

    inInterval() {
        return this.match.inInterval()
    }
    pauseMatch() {
        this.match.pause()
    }

    endHalf() {
        this.match.endHalf()
    }

    resumeMatch() {
        this.match.resume()
    }

    matchIsPaused() {
        return this.match.isPaused()
    }

    updateClock() {
        return this.match.getClockTick()
    }

    updateHalf() {
        let h = this.match.getHalf()
        let message
        switch(h){
            case 1: message = "1st half"
                break
            case 2: message = "2nd half"
                break
            case 3: message = "1st extra time"
                break
            case 4: message = "2nd extra time"
                break
            default:
                break;
        }
        return message
    }

    halfEnd(which) {
        let message
        this.pauseMatch()
        switch (which) {
            case 1: message = "And it's the end of first half!"
                break
            case 2: message = "And the referee blows the final wistle!"
                break
            case 3: message = "And it's the end of first extra time!"
                break
            case 4: message = "And it's the end of the extra time!"
                break
            default:
                this.resumeMatch()
                break;
        }
        if (message) {
            //TODO: Improve as needs to know the footer placeholder
            this.endHalf()
            $('.footer-comments').html(message)
        }
    }

    getScore() {
        return this.match.getScore()
    }

   /* _____                     
     / ____|                    
    | (___   ___ ___ _ __   ___ 
     \___ \ / __/ _ \ '_ \ / _ \
     ____) | (_|  __/ | | |  __/
    |_____/ \___\___|_| |_|\___|
    */                          
                               
    drawScene() {
        this.scene.draw(this.canvas)
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

/**
 * Adds the ball to the context and subscribes for match updates,
 * to update the score on the match, once it has received a
 * 'baseCrossedBoundaryX' event
 * @public
 * @since 0.10
 * @param {Ball} ball the ball object to add to the context
 */
    addBall(ball) {
        //Subscribe left / right score to any triggered event by the ball
        if (ball instanceof Ball) {
            this.ball = ball
            let self = this
            //Subscribe for Goal events
            this.ball.subscribe((content) => {
                if(!this.match.isPaused()){
                    if(content[2] == "baseCrossedBoundaryX" && self.match) {
                        if(Math.abs(content[3]) == 1) {
                            self.match.scored(content[3])
                        }
                    }     
                }
            })
        } else {
            throw new Error("ball is not of type Ball")
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
    getBallOwner() {
        return this.ball.getOwner()
    }

    addPlayer(player) {
        this.players[player.name] = player
        //Subscribe footer comments to any triggered event by the player
        player.subscribe((content) => {
            //TODO: decouple jquery code from here
            let lastContent = $('.footer-comments').html()
            if (!lastContent || lastContent.length > 200) lastContent = ""
            content = lastContent + " " + JSON.stringify(content[0])
            $('.footer-comments').html(content)
        })
        //Notifies player was added
        super.trigger(player)
    }
 
    movePlayers() {
        for(let p in this.players) {
            this.movePlayer(p)
        }
    }

    movePlayer(playerName) {
        this.players[playerName].moveTowards(this.ball, (objective) => {
            //Successfully got the ball
        }, (ball, challenger) => {
            //Another player has / wants the ball, challenge mode!
            this.challenge(ball, challenger)
        }, (error) => {
            //Remove dependency to jquery, HTML changes should be done via triggers
            $('.footer-comments').html(error)
        })
    }

    challenge(ball, challenger) {
        this.match.increaseStatsBallOwner(ball)
        this.pauseMatch()
        this.scene.changeTo("VS")
        let self = this
        challenger.matchUp(ball.getOwner(), (done) => {                setTimeout(() => {
            self.scene.changeTo("main")
                self.resumeMatch()
            }, 3000)
        })
    }
 }