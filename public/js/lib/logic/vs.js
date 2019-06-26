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
    //WIP, assume for now the challenger always gets the ball
    if (ball) {
        ball.loose(challengee)
        challenger.requestAchieveObjective(ball, (player) => {/*Player got the ball*/ })
    }
    callback(ball ? ball.getOwner() : challenger)
}