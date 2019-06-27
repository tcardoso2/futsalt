/**
 * Base Player Entity
 * Represents a model object with its position and functions to manipulate inside the scene
 * Links with the object on the screen (field)
 * Author: Tiago Cardoso
 * Created: 16Jun2019
 */

class BasePlayer extends Subscriber {
    constructor(x = 0, y = 0) {
        super()
        //internal attributes
        if(isNaN(x) || isNaN(y)) throw new Error('BasePlayer coordinates needs to be numbers')
        let _fieldPosX = x //Center of the pitch
        let _fieldPosY = y
        let _fieldRotation = 0
        let _crossedBoundaryX = 0
        this.name = "Unamed"
        this.boundaries
        //public accessors
        this.setFieldPosX = (x) => {
            if(isNaN(x)) throw new Error('Field x position has to be a number')
            _fieldPosX = x
        }
        this.setFieldPosY = (y) => {
            if(isNaN(y)) throw new Error('Field y position has to be a number')
            _fieldPosY = y
        }
        //Round to 1 decimal place
        this.fieldPosX = () => Math.round(10*(_fieldPosX - this.boundaries.pos.x()))/10
        this.fieldPosY = () => Math.round(10*(_fieldPosY - this.boundaries.pos.y()))/10
        this.fieldPos = () => [this.fieldPosX(), this.fieldPosY()]
        this.fieldRotation = () => _fieldRotation

        //Public methods which require to use private vars
        this.isInsideBoundX = () => {
            let belowMax = _fieldPosX <= this.boundaries.xMax() + this.boundaries.pos.x()
            let aboveMin = _fieldPosX >= this.boundaries.xMin() + this.boundaries.pos.x()
            if (!belowMax) {
                if (_crossedBoundaryX != 1) this.trigger([`${this.name} has crossed Max x boundary!!`, this, "baseCrossedBoundaryX", 1])
                _crossedBoundaryX = 1
            } else {
                if (!aboveMin) {
                    if (_crossedBoundaryX != -1) this.trigger([`${this.name} has crossed Min y boundary!!`, this, "baseCrossedBoundaryX", -1])
                    _crossedBoundaryX = -1
                } else {
                    //Is inside boundaries
                    _crossedBoundaryX = 0
                }
            } 
            return _crossedBoundaryX == 0
        }
        this.isInsideBoundY = () => {
            let result = _fieldPosY <= this.boundaries.yMax() + this.boundaries.pos.y() &&
            _fieldPosY >= this.boundaries.yMin() + this.boundaries.pos.y()
            return result
        }

        //Places an element in the absolute coordinates of a screen
        this.place = (x, y, enforceBoundaries = true, relative = false) => {
            if (!this.boundaries) throw new Error(`Error: You cannot place a "${this.constructor.name}" object without defining boundaries via the "boundToBox" method first`)
            let _oldPosX = _fieldPosX
            let _oldPosY = _fieldPosY
            this.setFieldPosX(relative ? x + this.boundaries.pos.x() : x)
            this.setFieldPosY(relative ? y + this.boundaries.pos.y() : y)
            //Restores prev position if outside boundaries
            if(enforceBoundaries) {
                if (!this.isInsideBoundX()) _fieldPosX = _oldPosX
                if (!this.isInsideBoundY()) _fieldPosY = _oldPosY    
            }
        }
        
        this.move = (x, y) => {
            if(isNaN(x) || isNaN(y)) throw new Error('BasePlayer x and y move coordinates must both be numbers')
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