/**
 *   @author Bates, Howard (bates4e@gmail.com)
 *   @version 0.0.1
 *   @summary Code demonstration: OOP, collections (array, map, set, object) :: created: 10.08.2020
 *   @todo Nothing
 */

"use strict";

const WAR_GAME_MECHANICS = require('./War/WarGameMechanics.js');

class Main {

    constructor(numDecks, hasJokers) {
        new WAR_GAME_MECHANICS(numDecks, hasJokers);
    }
}

{
    new Main(1, false);
}