"use strict";

const DECK = require('../Deck.js');
const PLAYER = require('../Player.js');

class WarGameMechanics {
    #deck = [];
    #players = [];

    constructor(numDecks, hasJokers) {
        this.#createDeck(numDecks, hasJokers);
        this.#setPlayers();
        this.#dealCards();
        this.#play();
    }

    #createDeck(numDecks, hasJokers) {
        this.#deck = new DECK(numDecks, hasJokers).getDeck();
        let count = 1;
        for (let i = 0; i < numDecks; i++) {
            for (let card of this.#deck[i]) {
                let cardValue = card.get('value');
                let cardText = card.get('rank') + " of " + card.get('suit');
                // console.log(`Card ${count} value = ${cardValue}, Card = ${cardText}`);
                count++;
            }
        }
    }

    #setPlayers() {
        const NUM_PLAYERS = 2;
        for (let i = 0; i < NUM_PLAYERS; i++) {
            this.#players.push(new PLAYER());
        }
    }

    #dealCards() {
        const NUM_PLAYERS = 2;
        const DEAL_SIZE = 26;
        for (let i = 0; i < NUM_PLAYERS; i++) {
            for (let j = 0; j < DEAL_SIZE; j++) {
                this.#players[i].setHand(this.#deck[0].shift());
            }
            // console.log(this.#players[i].getHand());
        }
    }

    #play() {
        let player0Card, player1Card;
        let player0Hand = this.#players[0].getHand(), player1Hand = this.#players[1].getHand();
        while (player0Hand.length > 0 || player1Hand.length > 0) {
            player0Card = player0Hand.shift();
            player1Card = player1Hand.shift();
            console.log(`Player 0 card = ${player0Card.get('value')}`);
            console.log(`Player 1 card = ${player1Card.get('value')}`);
        }






        console.log(`
        Each player turns up a card at the same time and the player with the higher card takes both 
        cards and puts them, face down, on the bottom of his stack. If the cards are the same rank, it is War.
        Each player turns up one card face down and one card face up. The player with the higher cards takes both
        piles (six cards). If the turned-up cards are again the same rank, each player places another card face down
        and turns another card face up. The player with the higher card takes all 10 cards, and so on.
        `)
    }
}

module.exports = WarGameMechanics;