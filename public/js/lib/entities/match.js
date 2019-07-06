/**
 * Match Entity
 * Represents game statistics for players in a match
 * Author: Tiago Cardoso
 * Created: 16Jun2019
 */

class Match extends Subscriber {
    constructor(endfOfHalfFn, intervals = [45, 45, 15, 15]) {
        super()
        let self = this
        let paused = true
        let started = false
        let clock = new Clock(endfOfHalfFn, intervals)
        let inInterval = false
        let score = {
            home: 0,
            away: 0
        }
        this.playerStats = {}
        this.pause = () => paused = true
        this.endHalf = () => {
            this.pause()
            inInterval = true
            clock.reset()
        }
        this.inInterval = () => inInterval
        this.startNextHalf = () => {
            if(clock.tryIncreaseHalf()) {
                inInterval = false
                this.resume()    
            }
        }
        this.start = () => {
            if (!started) {
                started = true
            }
        }
        this.resume = () => {
            paused = false
            this.start();
        }
        this.isPaused = () => paused == true
        this.addNewPlayer = (player) => {
            self.playerStats[player.name] = {
                player: player,
                stats: {
                    ballPossessions: 0,
                    ballLosses: 0,
                    ballChallenges: 0,
                    goals: 0,
                    passes: 0
                }
            }
            self.subscribeToPlayerNotifications(player)
        }
        this.subscribeToPlayerNotifications = (player) => {
            player.subscribe(this.updatePlayerStat)
        }
        this.updatePlayerStat = ([_, player, stat]) => {
            if(player && player.name && stat) {
                 self.playerStats[player.name].stats[stat]++
            }
        }
        this.getHalf = () => clock.getHalf()
        this.getClockTick = () => {
            if(!paused) clock.tick()
            return clock.toString()
        }
        this.scored = (side) => {
            if(side == 1) {
                score.home++
            }
            else {
                if(side == -1) score.away++
                else return
            }
            this.trigger(["Goooooooooallll!!!", this, "GoalScored", side])
        }
        this.getScore = () => score
    }
}

class Clock extends Subscriber {
    constructor(callback, intervals) {
        super() 
        let half = 1 //Clock starts on first half
        this.getHalf = () => half
        this.tryIncreaseHalf = () => {
            if (half == this.intervals.length) return false
            half++
            return true
        }
        this.callback = callback
        this.intervals = intervals
        this.minutes = 0
        this.seconds = 0
    }
    tick() {
        if(this.seconds < 59) this.seconds++
        else {
            this.seconds = 0
            if(this.minutes < 59) this.minutes++
            else this.minutes = 0
        }
        this.checkInterval()
    }
    reset() {
        this.minutes = 0
        this.seconds = 0
    }
    checkInterval() {
        if(this.intervals[this.getHalf()-1] == this.minutes) {
            this.callback(this.getHalf())
        }
    }
    toString() {
        return `${this.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2})}:${this.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2})}`
    }
}