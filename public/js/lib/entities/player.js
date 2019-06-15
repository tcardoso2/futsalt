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
        this.shirtNumber = shirtNumber;
        //internal attributes
        let _fieldPosX = 0; //Center of the pitch
        let _fieldPosY = 0; 
        let _fieldRotation = 0;
        //public accessors
        this.fieldPosX = () => _fieldPosX
        this.fieldPosY = () => _fieldPosY
        this.fieldRotation = () => _fieldRotation

        //Public methods which require to use private vars
        this.isInsideBoundX = () => {
            return _fieldPosX <= this.boundaries.xMax() &&
            _fieldPosX >= this.boundaries.xMin()
        }
        this.isInsideBoundY = () => {
            return _fieldPosY <= this.boundaries.yMax() &&
            _fieldPosY >= this.boundaries.yMin()
        }

        this.move = (x, y) => {
            _fieldPosX += x
            _fieldPosY += y
            //Restores prev position if outside boundaries
            if (!this.isInsideBoundX()) _fieldPosX -= x
            if (!this.isInsideBoundY()) _fieldPosY -= y
        }
    }
    
    //This will allow telling if this model is outside boundaries relative to another one
    boundToBox(obj) {
        this.boundaries = obj;
    }

    isInsideBound() {
        return this.boundaries &&
        this.isInsideBoundX() &&
        this.isInsideBoundY()
    }

    isOutsideBound() {
        return !this.isInsideBound();
    }
}