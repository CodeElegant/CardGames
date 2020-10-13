"use strict";

class Player {
    #hand = [];

    constructor() {

    }

    setHand(cards) {
        this.#hand.push(cards);
    }

    getHand() {
        return this.#hand;
    }
}

module.exports = Player;