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
        let event = new Event('reach-obj');
        //Qualitative attributes
        this.name = name
        this.shirtNumber = shirtNumber
        //Movement attributes
        this.vector = {}
        //Skill / Physical attributes
        this.attributes = new PlayerAttributes()
        let hasObjective = false
        let achievedObjective = false
        this.setObjective = (obj, yes, no) => {
            hasObjective = true
            this.vector['x'] = obj.fieldPosX() - this.fieldPosX()
            this.vector['y'] = obj.fieldPosY() - this.fieldPosY()
            if(Math.abs(this.vector['x']) <= 1 && Math.abs(this.vector['y']) <= 1) {
                //Objective Accomplished
                if(!achievedObjective && yes) yes(obj)
                achievedObjective = true
            }
            else {
                if(achievedObjective && no) no(obj)
                achievedObjective = false
            }
        }
    }

    moveTowards(obj, callbackObjAchieved, callbackObjectiveNotAchieved, error) {
        this.setObjective(obj, callbackObjAchieved, callbackObjectiveNotAchieved)
        let [x, y] = this.calculateNextMove()
        //moving takes in energy
        let energy = Math.abs(Math.max(x,y)/10)
        if(this.attributes.decreaseStamina(Math.max(x,y)/10, error)) {
            this.move(x, -y)
        }
    }

    calculateNextMove() {
        let x = this.vector['x'] == 0 ? 0 : this.vector['x']/Math.abs(this.vector['x'])
        let y = this.vector['y'] == 0 ? 0 : -this.vector['y']/Math.abs(this.vector['y'])
        return [x, y]
    }
}

class PlayerAttributes {
    constructor() {
        let attributes = {
            stamina: 100
        }
        this.decreaseStamina = (amount, callbackTired) => {
            if(attributes.stamina - amount < 0) {
                callbackTired("Player is tired")
                return false
            } else {
                attributes.stamina -= amount
            }
            return true
        }
        this.getStamina = () => attributes.stamina
    }
}