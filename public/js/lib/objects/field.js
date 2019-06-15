function renderField(canvas, relativeTo, entity = new Field()) {
    var field = new BaseObject(canvas, "field", "soccer-field.jpg")
    field.x = () => 650
    field.y = () => 350
    field.rotation = () => 0
    field.extend('xMin', () => entity.xMin)
    field.extend('xMax', () => entity.xMax)
    field.extend('yMin', () => entity.yMin)
    field.extend('yMax', () => entity.yMax)

    function validateArgs(){
        if (!relativeTo) throw new Error('Error, you must specify an object to position the player')
    }

    return field.renderObject()
}