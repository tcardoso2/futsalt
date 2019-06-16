/**
 * Base Player Entity
 * Represents a model object with its position and functions to manipulate inside the scene
 * Links with the object on the screen (field)
 * Author: Tiago Cardoso
 * Created: 16Jun2019
 */

class BasePlayer {
    constructor(x, y) {
        //internal attributes
        let _fieldPosX = x; //Center of the pitch
        let _fieldPosY = y; 
        let _fieldRotation = 0;
        this.boundaries;
        //public accessors
        this.fieldPosX = () => _fieldPosX
        this.fieldPosY = () => _fieldPosY
        this.fieldRotation = () => _fieldRotation

        //Public methods which require to use private vars
        this.isInsideBoundX = () => {
            return _fieldPosX <= this.boundaries.xMax() + this.boundaries.pos.x() &&
            _fieldPosX >= this.boundaries.xMin() + this.boundaries.pos.x() 
        }
        this.isInsideBoundY = () => {
            return _fieldPosY <= this.boundaries.yMax() + this.boundaries.pos.y() &&
            _fieldPosY >= this.boundaries.yMin() + this.boundaries.pos.y() 
        }

        this.place = (x, y, enforceBoundaries = true) => {
            let _oldPosX = _fieldPosX
            let _oldPosY = _fieldPosY
            _fieldPosX = x
            _fieldPosY = y
            //Restores prev position if outside boundaries
            if(enforceBoundaries) {
                if (!this.isInsideBoundX()) _fieldPosX = _oldPosX
                if (!this.isInsideBoundY()) _fieldPosY = _oldPosY    
            }
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