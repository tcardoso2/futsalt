/**
 * Player Entity
 * Represents a player with all its relevant attributes
 * Links with the object on the screen (player)
 * Author: Tiago Cardoso
 * Created: 13Jun2019
 */

class Player extends BasePlayer {
    constructor(name, shirtNumber = 1, attr) {
        super(0, 0)

        //Qualitative Public attributes
        this.name = name
        this.shirtNumber = shirtNumber
        //Movement Private attributes
        let distanceToObj = {}
        //Skill / Physical Private attributes
        let attributes = new PlayerAttributes(attr ? attr : undefined)
        let staminaToDistanceUnitRatio = 1/10 //Per each 10 pixels moved, stamina decreases 1 unit
        //Objective Private attributes
        let target = null
        let achievement = null
        //Target Public Methods
        this.getDistanceToObj = () => distanceToObj

        this.getAttributes = () => attributes

        this.hasAchievedTarget = () => this.hasTarget() && (achievement == target)

        this.hasTarget = () => target != null
        
        this.isCloseToTarget = () => Math.abs(distanceToObj['x']) <= 2 && Math.abs(distanceToObj['y']) <= 2
        
        this.setTarget = (obj) => {
            target = obj
            distanceToObj['x'] = target.fieldPosX() - this.fieldPosX()
            distanceToObj['y'] = target.fieldPosY() - this.fieldPosY()
        }
                
        this.setObjective = (obj, yes, challenge) => {
            this.setTarget(obj)
            if(!this.hasAchievedTarget()) {
                this.chaseTarget(yes, challenge)
            } else {
                this.keepAchievement(obj)
            }
        }

        this.chaseTarget = (yes, challenge) => {
            if(this.isCloseToTarget()) {
                this.trigger([`${this.name} is close to the ${target.name}!!`])
                this.requestAchieveObjective(target, yes, challenge)
            }
        }

        this.keepAchievement = () => {
            //Player simply looses it if it is not close to it
            if(!this.isCloseToTarget()) {
                this.trigger([`${this.name} lost the ${achievement.name}!!`, this, "ballLosses"])
                achievement.loose(this)
                achievement = null
            }
        }
        
        this.requestAchieveObjective = (obj, confirmation, challenge) => {
            //Will attempt to request the objective
            if(!obj.ownedBy(this)) {
                if (confirmation && obj.request(this, challenge)) {
                    this.trigger([`${this.name} got the ${obj.name}!!`, this, "ballPossessions"])
                    confirmation(obj)
                    achievement = obj
                    return
                }
                achievement = null
            } else {
                //Already owns does not need target anymore
                target = null
            }
        }
        
        this.calculateNextMove = () => {
            if (!distanceToObj) return [0, 0]
            let x = distanceToObj['x'] == 0 ? 0 : distanceToObj['x']*attributes.getSpeed()/Math.abs(distanceToObj['x']*100)
            let y = distanceToObj['y'] == 0 ? 0 : -distanceToObj['y']*attributes.getSpeed()/Math.abs(distanceToObj['y']*100)
            return [x, y]
        }

        this.decreaseStamina =(x, y, callbackError) => {
            //moving takes in energy
            let energyRequired = Math.abs(Math.max(x,y)*staminaToDistanceUnitRatio)
            return this.getAttributes().decreaseStamina(energyRequired, callbackError)
        }    
    }

    matchUp(challenger, callback) {
        //TODO change
        setTimeout(callback, 5000)
    }

    moveTowards(obj, callbackObjAchieved, challenge, callbackError) {
        this.setObjective(obj, callbackObjAchieved, challenge)
        let [x, y] = this.calculateNextMove()
        if(this.decreaseStamina(x, y, callbackError)) {
            this.move(x, -y)
        }
    }
}

class PlayerAttributes {
    constructor(attr = {}) {
        let attributes = {
            //Attribute defaults can be overriden
            speed: attr.speed ? attr.speed : 50 ,
            stamina: attr.stamina ? attr.stamina : 100
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
        this.getSpeed = () => attributes.speed
    }
}