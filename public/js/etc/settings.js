/**
 * Returns the application settings in a form of a dictionary.
 * @public
 * @since 0.10
 */
function settings() {
    return {
/**
 * General Game settings
 * @memberof settings
 */
        game: {
/**
 * Settings referring to the moment initial positions are set for the actors taking part in a the football game
 * @memberof settings.game
 */
            initialPositions: {
/**
 * Time a match is paused after players go to their initial positions
 * @memberof settings.game.initialPositions
 * @public
 * @since 0.10
 */
                resumeAfterMS : 3000
            },
/**
 * Game gauges
 * @memberof settings.game
 */
            gauges: {
/**
 * Color of the stamina gauge when it is above the low treshold
 * @memberof settings.game.gauges
 */
                highStaminaColor: "lightgreen",
/**
 * Color the remaining gauge gets after it goes below the low treshold
 * @memberof settings.game.gauges
 */
                lowStaminaColor: "yellow",
/**
 * Color the remaining gauge gets after it goes below the very low treshold
 * @memberof settings.game.gauges
 */
                veryLowStaminaColor: "red"
            },
/**
 * Screen HTML element selectors (jquery/css)
 * @memberof settings.game
 */
            html: {
/**
 * HTML selector for the screen left-box (used for player stats)
 * @memberof settings.game.html
 */
                leftbox: ".leftbox",
/**
 * HTML selector for the screen right-box (used for Development window, might be deprecated in future)
 * @memberof settings.game.html
 */
                rightbox: ".rightbox",
/**
 * HTML selector for the screen match clock (mm:ss)
 * @memberof settings.game.html
 */
                clock: ".clock",
/**
 * HTML selector for the screen 1st half/2nd half/extra time info
 * @memberof settings.game.html
 */
                half: ".half",
/**
 * HTML selector for the right-side team match score
 * @memberof settings.game.html
 */
                rightScore: ".score-right",
/**
 * HTML selector for the left-side team match score
 * @memberof settings.game.html
 */
                leftScore: ".score-left",
/**
 * HTML element of the stamina bars container
 * @memberof settings.game.html.gauges
 */
                staminaBars: "ul.stamina-bars"
            }
        },
/**
 * All Scene names of the application. Each scene is like a separate stage where different actors interact
 * @memberof settings
 */
        scenes: {
/**
 * The VS scene name
 * @memberof settings.scenes
 * @public
 * @since 0.10
 */            vs: "VS"
        },
/**
 * List of common files used by the application
 * @memberof settings
 */
        files: {
/**
 * The vs scene image
 * @public
 * @memberof settings.files
 * @since 0.10
 */            vs: "vs.png"
        }
    }
}