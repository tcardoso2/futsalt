function throwError(msg) { throw new Error(msg) }

function equal(expr1,expr2, msg) {
    let jexpr1 = expr1 ? JSON.stringify(expr1) : false 
    let jexpr2 = expr2 ? JSON.stringify(expr2) : false
    if (!jexpr1 == jexpr2) throw new Error(msg)
}

describe('When 2 players are matched-up against each other', function() {
    before(function() {
        // ...
    });
    context('VS function basics', function() {
        it('a vs function exists to get the winner', function(done) {
            vs(new Player("p1"), new Player("p2"), () => done())
        });
        it('the 2 first arguments must be of type Player', function(done) {
            try{
                vs(123, "3434", () => {})
            } catch(e) {
                if (e.message == "Player(s) provided are not valid") done ()
                else throw e
            }
        });
        it('the 3rd argument must be a function', function(done) {
            try{
                vs(new Player("p1"), new Player("p2"), new Player())
            } catch(e) {
                if (e.message == "Callback provided is not a valid function") done ()
                else throw e
            }
        });
        xit('(WIP) The callback returns a Player object as first argument', function(done) {
            vs(new Player("p1"), new Player("p2"), () => done())
        });
    });
    context('Match-up logic', function() {
        let ball = new Ball()
        let challenger = new Player("p1")
        let challengee = new Player("p2")
        it('The ball belongs first to player 2 (challengee)', function(done) {
            ball.request(challengee) //2nd player gets the ball first
            ball.ownedBy(challengee) || throwError("Ball should belong to challengee!")
            done()
        });
        it('(Temporary) The challenger then always gets the ball', function(done) {
            //Let's assume the challenger is always the Player in the 1st argument
            ball.request(challengee) //2nd player gets the ball first
            vs(challenger, challengee, (winner) => {
                equal(challenger, winner, "Players are not the same!")
                done()
            })
        });
        it('The ball now really belongs to player 1 (challenger)', function(done) {
            ball.ownedBy(challenger) || throwError("Ball should belong to challenger!")
            done()
        });
    });
    context('After match-up', function() {
        xit('Player loosing the ball gets stunned')
    })
})