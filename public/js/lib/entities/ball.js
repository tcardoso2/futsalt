/**
 * Ball Entity
 * Represents a ball with it's position
 * Links with the object on the screen (field)
 * Author: Tiago Cardoso
 * Created: 16Jun2019
 */

//TODO: Inherit from base classe since others use also same attributes
class Ball extends BasePlayer {
    constructor(x, y) {
        super(x, y)
    }
}