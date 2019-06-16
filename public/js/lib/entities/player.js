/**
 * Player Entity
 * Represents a player with all its relevant attributes
 * Links with the object on the screen (player)
 * Author: Tiago Cardoso
 * Created: 13Jun2019
 */

class Player extends BasePlayer {
    constructor(name, shirtNumber = 1) {
        super(0, 0)
        this.name = name
        this.shirtNumber = shirtNumber
        this.vector = {}
    }

    moveTowards(obj) {
        this.setObjective(obj)
        let [x, y] = this.calculateNextMove()
        this.move(x, -y)
    }

    setObjective(obj) {
        this.vector['x'] = obj.fieldPosX() - this.fieldPosX()
        this.vector['y'] = obj.fieldPosY() - this.fieldPosY()
    }

    calculateNextMove() {
        let x = this.vector['x'] == 0 ? 0 : this.vector['x']/Math.abs(this.vector['x'])
        let y = this.vector['y'] == 0 ? 0 : -this.vector['y']/Math.abs(this.vector['y'])
        return [x, y]
    }
}