/**
 * Ball Entity
 * Represents a ball with it's position
 * Links with the object on the screen (field)
 * Author: Tiago Cardoso
 * Created: 16Jun2019
 * Fonts by Patorsk: http://patorjk.com/software/taag/#p=display&f=Big&t=
 */

//TODO: Inherit from base classe since others use also same attributes
class Ball extends BasePlayer {
    constructor(x, y) {
        super(x, y)
        this.name = "ball"
        let owner = null

       /*____                               _     _       
        / __ \                             | |   (_)      
       | |  | |_      ___ __   ___ _ __ ___| |__  _ _ __  
       | |  | \ \ /\ / / '_ \ / _ \ '__/ __| '_ \| | '_ \ 
       | |__| |\ V  V /| | | |  __/ |  \__ \ | | | | |_) |
        \____/  \_/\_/ |_| |_|\___|_|  |___/_| |_|_| .__/ 
                                                   | |    
                                                   |_|    
        */
        this.getOwner = () => owner

        this.hasOwner = () => owner != null

        this.isFree = () => !this.hasOwner()
        
        this.ownedBy = (player) => {
            this.validatePlayer(player)
            return owner == player
        }
        
        this.ownedByOther = (player) => {
            return (owner instanceof Player) && !this.ownedBy(player)
        }
        //Loose ownership        
        this.loose = (player) => {
            this.validatePlayer(player)
            if (!this.ownedBy(player)) throw new Error(`Player {player.name} cannot loose the ball because does not own it!`)
            player.looseAchievement(this)
            owner = null
        }
        //Request ownership
        this.request = (player, challenge) => {
            this.validatePlayer(player)
            if(this.ownedByOther(player)){
                challenge(this, player)
            } else {
                //Ball is free
                owner = player
                return true
            }
        }
        /*
         __  __                                     _   
        |  \/  |                                   | |  
        | \  / | _____   _____ _ __ ___   ___ _ __ | |_ 
        | |\/| |/ _ \ \ / / _ \ '_ ` _ \ / _ \ '_ \| __|
        | |  | | (_) \ V /  __/ | | | | |  __/ | | | |_ 
        |_|  |_|\___/ \_/ \___|_| |_| |_|\___|_| |_|\__|
        */                                                
                                                        
        this.moveWithOwner = (x, y, player) => {
            if(this.ownedBy(player)) {
                this.move(x, y)
            }
        }

        this.crossedGoal = (callback) => {

        }
        /*
        __      __   _ _     _       _   _                 
        \ \    / /  | (_)   | |     | | (_)                
         \ \  / /_ _| |_  __| | __ _| |_ _  ___  _ __  ___ 
          \ \/ / _` | | |/ _` |/ _` | __| |/ _ \| '_ \/ __|
           \  / (_| | | | (_| | (_| | |_| | (_) | | | \__ \
            \/ \__,_|_|_|\__,_|\__,_|\__|_|\___/|_| |_|___/
                                                           
        */       
        this.validatePlayer = (player) => {
            if (!(player instanceof Player)) throw new Error('Not a valid player entity')
        }
    }
    
}