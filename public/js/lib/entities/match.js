/**
 * Match Entity
 * Represents game statistics for players in a match
 * Author: Tiago Cardoso
 * Created: 16Jun2019
 */

class Match {
    constructor() {
        this.playerStats = {}
        this.addNewPlayer = (player, self) => {
            self.playerStats[player.name] = {
                player: player,
                stats: {
                    ballPossessions: 0,
                    ballLosses: 0,
                    goals: 0,
                    passes: 0
                }
            }
        }
    }
}