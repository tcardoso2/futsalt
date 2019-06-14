/**
 * Player Entity
 * Represents a player with all its relevant attributes
 * Links with the object on the screen (player)
 * Author: Tiago Cardoso
 * Created: 13Jun2019
 */

class Player {
    constructor(name, shirtNumber = 1) {
        this.name = name;
        this.fieldPosX = 0; //Center of the pitch
        this.fieldPosY = 0; 
        this.fieldRotation = 0;
        this.shirtNumber = shirtNumber;
    }
}