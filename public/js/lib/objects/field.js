function renderField(canvas) {
    var field = new baseObject(canvas, "field", "soccer-field.jpg");
    field.x = () => 650;
    field.y = () => 350;
    field.rotation = () => 0;
    return field.renderObject();
}