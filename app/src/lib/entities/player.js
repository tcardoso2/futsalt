/**
 * Player Entity
 * Represents a player with all its relevant attributes
 * Links with the object on the screen (player)
 * Author: Tiago Cardoso
 * Created: 13Jun2019
 */

import BasePlayer from './_basePlayer'
import vs from '../logic/vs'

 //TODO: Move these into the settings.js file?
const DEFAULT_STUN_PERIOD_MS = 5000
const STAMINA_TO_DISTANCE_RATIO = 1/10
const PLAYER_TIRED_SPEED_FRACTION = 3 //Player moves 3 times slower when tired

class Player extends BasePlayer {
    constructor(name, shirtNumber = 1, attr) {
        super(0, 0)

        //Qualitative Public attributes
        this.name = name
        this.shirtNumber = shirtNumber
        //Movement Private attributes
        let fieldSideRight = true //Player by default assigned to attack to the left
        let distanceToObj = {}
        let stunned = false
        let avatars = {
            small: "field-player-orange.png",
            vs: ""
        }
        //Skill / Physical Private attributes
        let attributes = new PlayerAttributes(attr ? attr : undefined)
        let staminaToDistanceUnitRatio = STAMINA_TO_DISTANCE_RATIO //Per each 10 pixels moved, stamina decreases 1 unit
        //Objective Private attributes
        let target = null
        let achievement = null
        //Public Methods
        this.getSmallAvatar = () => avatars.small

        this.setSmallAvatar = (file) => avatars.small = file
        
        this.getDistanceToObj = () => distanceToObj

        this.getAttributes = () => attributes

        this.getAchievement = () => achievement

        this.hasAchievedTarget = () => this.hasTarget() && (achievement == target) && achievement.getOwner() == this

        this.hasTarget = () => target != null
        
        this.isCloseToTarget = () => Math.abs(distanceToObj['x']) <= 5 && Math.abs(distanceToObj['y']) <= 5
        
        this.isStunned = () => stunned
        
        this.recover = () => {
            stunned = false
            if(!this.isStunned()) this.trigger([`${this.name} is recovered!!`])
        }

        this.stunFor = (period = DEFAULT_STUN_PERIOD_MS) => {
            stunned = true
            let self = this
            setTimeout(() => self.recover(), period)
        }

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
            if(achievement && !this.isCloseToTarget()) {
                //this.looseAchievement(achievement)
                //achievement.loose(this)
                //TODO deal with this logic later when passing or shooting or accidentaly loosing the ball
            } else {

            }
        }

        this.looseAchievement = (source) => {
            this.stunFor()
            this.trigger([`${this.name} lost the ${source.name}!!`, this, "ballLosses"])
            achievement = null
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
                //achievement = null
            } else {
                //Already owns does not need target anymore
                target = null
            }
        }
        
        this.calculateNextMove = () => {
            let x = 0
            let y = 0
            if (!distanceToObj) return [x, y]
            if(!this.hasAchievedTarget()){
                x = distanceToObj['x'] == 0 ? 0 : distanceToObj['x']*attributes.getSpeed()/Math.abs(distanceToObj['x']*100)
                y = distanceToObj['y'] == 0 ? 0 : -distanceToObj['y']*attributes.getSpeed()/Math.abs(distanceToObj['y']*100)    
            } else {
                x = -0.4*this.attackDirection()
                y = 0
            }
            return [x, y]
        }

        this.decreaseStamina =(x, y, callbackError) => {
            //moving takes out energy from the player
            let energyRequired = Math.abs(Math.max(Math.abs(x),Math.abs(y))*staminaToDistanceUnitRatio)
            return this.getAttributes().decreaseStamina(energyRequired, callbackError)
        }

        this.assignRightField = () => {
            //Player will attack to the left
            fieldSideRight = true
        }
        this.assignLeftField = () => {
            //Player will attack to the left
            fieldSideRight = false
        }
        this.attackDirection = () => {
            let result = fieldSideRight ? -1 : 1
            return result
        }
    }

    matchUp(challengee, callback) {
        //TODO change
        this.trigger([`${this.name} is challenging ${challengee.name}!!`, this, "ballChallenges"])
        vs(this, challengee, (winner) => {
            callback(winner)
        })
    }

    moveTowards(obj, callbackObjAchieved, challenge, callbackError) {
        if(!this.isStunned()) {
            this.setObjective(obj, callbackObjAchieved, challenge)
            let [x, y] = this.calculateNextMove()
            if(!this.decreaseStamina(x, y, callbackError)) {
                //Player is tired, will still move but much less
                x /= PLAYER_TIRED_SPEED_FRACTION
                y /= PLAYER_TIRED_SPEED_FRACTION
            } 
            this.move(x, -y)
            obj.moveWithOwner(x, y, this) //If is onwer of objective, objective will move also
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
                //Player has reached minimim stamina
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

export default Player