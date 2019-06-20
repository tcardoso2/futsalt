/**
 * Match Entity
 * Represents game statistics for players in a match
 * Author: Tiago Cardoso
 * Created: 16Jun2019
 */

class Match {
    constructor() {
        this.playerStats = {}
        let self = this
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
                console.log("Updating Player stats!", player.name, stat)
                self.playerStats[player.name].stats[stat]++
            }
        }
    }
}