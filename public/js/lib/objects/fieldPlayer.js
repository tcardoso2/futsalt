function renderFieldPlayer(canvas) {
    var player = new baseObject(canvas, "fieldPlayer", "field-player-orange.png");
    player.x = () => 300;
    player.y = () => 500;
    player.rotation = () => 0;
    return player.renderObject();
}