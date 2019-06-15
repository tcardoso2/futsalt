/**
 * Field Entity
 * Represents a field with it's size and boundaries
 * Links with the object on the screen (field)
 * Author: Tiago Cardoso
 * Created: 14Jun2019
 */

class Field {
    constructor(minX, maxX, minY, maxY) {
        this.xMin = minX
        this.xMax = maxX
        this.yMin = minY
        this.yMax = maxY
    }
}