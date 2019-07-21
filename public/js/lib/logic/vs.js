/**
 * VS Logic
 * Takes 2 players which are matched up against each other
 * does some logic to get a winner and calls back a function
 * with the winner
 * Author: Tiago Cardoso
 * Created: 25Jun2019
 */

function vs(challenger, challengee, callback) {
    //Internal functions
    let throwError = (msg) => { throw new Error(msg) }

    let isFunction = (fn) => fn && {}.toString.call(fn) === '[object Function]'

    let validateInput = () => validatePlayers() && validateCallback()

    let validateCallback = () => isFunction(callback) || throwError('Callback provided is not a valid function')

    let validatePlayers = () => (challenger instanceof Player && challengee instanceof Player) || throwError('Player(s) provided are not valid')

    //main
    validateInput()
    let ball = challengee.getAchievement()
    if (ball) {
        challenger.requestAchieveObjective(ball, () => {
            //Ball was free, this would never happen?
            callback(false, challenger)
        },() => {
            //Challenge!
            //WIP, for now randomize who gets the ball
            let _result = Math.random(1)
            if(_result < 0) {
                ball.loose(challengee)
                ball.request(challenger)
                //Make sure owner really got it
                if(!(challenger == ball.getOwner())) {
                    //Assertion should not get here
                    throw new Error("Fatal: Player did not get ball, report this error")
                }    
            } else {
                challenger.stunFor()
            }
            callback(false, ball.getOwner())
        })
    } else {
        //Ball belonged to no one
        callback(true, "Ball belongs to no one, so no VS happened")
    }
}