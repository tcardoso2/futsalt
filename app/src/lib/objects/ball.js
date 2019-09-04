import Ball from '../entities/ball'
import BaseObject from './_base'

function renderBall(canvas, relativeTo, entity = new Ball()) {
    validateArgs()
    var ball = new BaseObject(canvas, "ball", "ball_small.png");
    ball.x = () => entity.fieldPosX() + relativeTo.pos.x()
    ball.y = () => entity.fieldPosY() + relativeTo.pos.y()
    ball.rotation = () => entity.fieldRotation();
    entity.boundToBox(relativeTo)
    function validateArgs(){
        if (!relativeTo) throw new Error('Error, you must specify an object to position the player')
    }
    return ball.renderObject();
}

export default renderBall