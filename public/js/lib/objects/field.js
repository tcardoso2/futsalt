function renderField(canvas) {
    var field = new BaseObject(canvas, "field", "soccer-field.jpg");
    field.x = () => 650;
    field.y = () => 350;
    field.rotation = () => 0;
    return field.renderObject();
}