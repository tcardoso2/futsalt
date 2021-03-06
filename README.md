Versions
========
```
███████╗██╗   ██╗████████╗███████╗ █████╗ ██╗  ████████╗
██╔════╝██║   ██║╚══██╔══╝██╔════╝██╔══██╗██║  ╚══██╔══╝
█████╗  ██║   ██║   ██║   ███████╗███████║██║     ██║   
██╔══╝  ██║   ██║   ██║   ╚════██║██╔══██║██║     ██║   
██║     ╚██████╔╝   ██║   ███████║██║  ██║███████╗██║   
╚═╝      ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝    v0.10.14                                                        
 _____ _____ _      _____ ____  _  ____ 
/  __//  __// \  /|/  __// ___\/ \/ ___\
| |  _|  \  | |\ |||  \  |    \| ||    \
| |_//|  /_ | | \|||  /_ \___ || |\___ |
\____\\____\\_/  \|\____\\____/\_/\____/
                                        
(Fonts by http://patorjk.com/software/taag)
```                                                                                        
Genesis
-------
- v.0.10.14:Bug fix on randomized logic for who gets the ball after a vs event. Starting conversion to ReactJS. 
- v.0.10.13:Bug fixes on the score and ball owner; continuating documentation (WIP)
- v.0.10.12:Documentation updates for modules: draw. Refactoring of context object code. But fix on left field attack direction. Randomized challenger winner
- v.0.10.11:Documentation updates for modules: main, firstFrame and draw (WIP) files. Created settings file
- v.0.10.10:Improvements on code for draw function. Created player stamina gauges. Shallow documentation (--shallow flag) of the main.js file (WIP)
- v.0.10.9: Bug fix which was causing left side to start game with 1 goal advantage. Generated the first version of the documentation with documentation nodejs tool in folder doc/. Added player entity avatars
- v.0.10.8: After a goal is scored, players take their initial positions (WIP), introduced scoring
- v.0.10.7: More bug fixes
- v.0.10.6: Bug fixes on goals, added clock, added halfs, and extra-time, game-over detection, and restart of next half
- v.0.10.5: Bug fixes on stamina decrease, adjustments on stats, introduced scores, and trigger events if object crosses boundaries
- v.0.10.4: Working on movement after grabbing the ball, added ability to assign players to left and right side of the field
- v.0.10.3: Working on VS logic, introduced stun after loosing the ball, added more tests (WIP)
- v.0.10.2: Bug fixes, refactoring code, created VS screen, started with MatchUp (Challenge mode) (WIP)
- v.0.10.1: Refactoring code, added scenes into context, started adding first tests (Scenes)
- v.0.10.0: Adding another player, first steps on 2 opponent players on field; introduced speed as player attribute, and game scenes, match pause. Started introducing Mocha tests (WIP)
- v.0.9.0: Refactoring / fixed Ball possession / Ball loss logic, and allowing subscription from notifications from players. Introduction of game comments (WIP)
- v.0.8.0: Refactoring player entity for readibility and code structure, improvement on objectives logic 
- v.0.7.0: Added ball losses to statistics and player stamina, event trigger when player is tired, not alowing to proceed.
- v.0.6.0: Started working on match statistics.
- v.0.5.0: Player is now able to find the ball. 
- v.0.4.0: Added concept of boundaries and ball and player within field boundaries.
- v.0.3.0: Creation on main loop context, player factory, first steps on animating.
- v.0.2.0: Initial version, abstracted objects to make it easier for creating new objects. Created player, started entities folder.
- v.0.1.0: Initial version with basic field, ball.
