//Jquery is necessary to refer otherwise mocha tests won't be able to find it
function equal(expr1,expr2, msg) {
    if (!JSON.stringify(expr1) == JSON.stringify(expr2)) throw new Error(msg)
}
describe('Scenes', function() {
    before(function() {
        // ...
    });
    context('When a context is created', function() {
        it('already should contain a scene', function() {
            //build the scene
            let ctx = new Context()
            equal(ctx.scene.constructor.name, 'SceneManager')
        });
    });

    context('When scene is paused', function() {
        xit('players do not move', function() {
            //build the scene
            let ctx = new Context()
            let p = new PlayerFactory(ctx)
            //Missing Bound to! Test is failing because of that!
            p.create("Player1", 10)
            let x0, y0, x1, y1
            [x0, y0] = ctx.players["Player1"].fieldPos()
            ctx.pauseMatch()
            //This would move the player, TEST needs to be done another way
            ctx.players["Player1"].move(1, 1)
            [x1, y1] = ctx.players["Player1"].fieldPos()
            x1.should.equal(x0)
            y1.should.equal(y1)
        });
    });

    context('Add / Remove actors in a scene', function(done) {
        it('add adds actors to a scene', function() {
            //build the scene
            let scene = new SceneManager()
            scene.addToScene({ name: 'some actor' })
            equal(scene.getActors(), [{ name: 'some actor' }])
        });
    });
})