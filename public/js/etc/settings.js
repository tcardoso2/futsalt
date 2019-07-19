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