import Player from '../entities/player'
import BaseObject from './_base'

function renderFieldPlayer(canvas, relativeTo, entity = new Player()) {
    
    validateArgs()
    var player = new BaseObject(canvas, `fieldPlayer_${entity.name}`, entity.getSmallAvatar())
    player.x = () => entity.fieldPosX() + relativeTo.pos.x()
    player.y = () => entity.fieldPosY() + relativeTo.pos.y()
    player.rotation = () => entity.fieldRotation()
    entity.boundToBox(relativeTo)
    function validateArgs(){
        if (!relativeTo) throw new Error('Error, you must specify an object to position the player')
    }
    player.extensions = {
        clip: {
            radius: 30
        }
    }
    return player.renderObject()
}

export default renderFieldPlayer