function renderImage(canvas, src, x, y, rotation) {
    
    var field = new BaseObject(canvas, src, src) //2ns arg is a key which will be unique as long as image name is unique
    field.x = () => x
    field.y = () => y
    field.rotation = () => rotation

    return field.renderObject()
}