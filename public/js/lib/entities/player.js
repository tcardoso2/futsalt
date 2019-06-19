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

        //Qualitative Public attributes
        this.name = name
        this.shirtNumber = shirtNumber
        //Movement Private attributes
        let distanceToObj = {}
        //Skill / Physical Private attributes
        let attributes = new PlayerAttributes()
        let staminaToDistanceUnitRatio = 1/10 //Per each 10 pixels moved, stamina decreases 1 unit
        //Objective Private attributes
        let target = null
        let achievement = null
        //Target Public Methods
        this.getDistanceToObj = () => distanceToObj

        this.getAttributes = () => attributes

        this.hasAchievedTarget = () => achievement != null

        this.hasTarget = () => target != null
        
        this.isCloseToTarget = () => Math.abs(distanceToObj['x']) <= 1 && Math.abs(distanceToObj['y']) <= 1
        
        this.setTarget = (obj) => {
            target = obj
            distanceToObj['x'] = target.fieldPosX() - this.fieldPosX()
            distanceToObj['y'] = target.fieldPosY() - this.fieldPosY()
        }
                
        this.setObjective = (obj, yes) => {
            this.setTarget(obj)
            if(this.isCloseToTarget()) {
                this.requestAchieveObjective(obj, yes)
            }
        }
        
        this.requestAchieveObjective = (obj, confirmation) => {
            //Will attempt to request the objective
            if(!obj.ownedBy(this)) {
                if (confirmation && obj.request(this)) {
                    confirmation(obj)
                    achievement = obj
                }
                achievement = null
            } else {
                //Already owns does not need target anymore
                target = false
            }
        }
        
        this.calculateNextMove = () => {
            if (!distanceToObj) return [0, 0]
            let x = distanceToObj['x'] == 0 ? 0 : distanceToObj['x']/Math.abs(distanceToObj['x'])
            let y = distanceToObj['y'] == 0 ? 0 : -distanceToObj['y']/Math.abs(distanceToObj['y'])
            return [x, y]
        }

        this.decreaseStamina =(x, y, callbackError) => {
            //moving takes in energy
            let energyRequired = Math.abs(Math.max(x,y)*staminaToDistanceUnitRatio)
            return this.getAttributes().decreaseStamina(energyRequired, callbackError)
        }    
    }

    looseAchievement(obj) {
        achievement = null
    }

    moveTowards(obj, callbackObjAchieved, callbackError) {
        this.setObjective(obj, callbackObjAchieved)
        let [x, y] = this.calculateNextMove()
        if(this.decreaseStamina(x, y, callbackError)) {
            this.move(x, -y)
        }
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