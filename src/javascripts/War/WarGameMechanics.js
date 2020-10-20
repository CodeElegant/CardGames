"use strict";

const DECK = require('../Deck.js');
const PLAYER = require('../Player.js');
const SAVE = require('./SaveData.js');

class WarGameMechanics {
    #deck = [];
    #players = [];

    constructor(numDecks, hasJokers) {
        this.#createDeck(numDecks, hasJokers);
        this.#setPlayers();
        this.#dealCards();
        this.#play();
        this.#displayGameData();
    }

    #createDeck(numDecks, hasJokers) {
        this.#deck = new DECK(numDecks, hasJokers).getDeck();
        let count = 1;
        for (let i = 0; i < numDecks; i++) {
            for (let card of this.#deck[i]) {
                card.set('value', Math.trunc(card.get('value'))); //convert decimal number to int
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
        }
    }
    async #play() {
        const MIN_HAND_SIZE = 3;
        let round = 1;
        let player0Pot = [], player1Pot = [], playerWin = [];
        let player0Card, player1Card;
        let player0Hand = this.#players[0].getHand(), player1Hand = this.#players[1].getHand();
        while (1) {
            player0Hand = player0Hand.sort(() => Math.random() - 0.5);
            player1Hand = player1Hand.sort(() => Math.random() - 0.5);
            player0Card = player0Hand.shift();
            player1Card = player1Hand.shift();
            if (player0Card.get('value') !== player1Card.get('value')) {
                player0Pot.push(player0Card);
                console.log(`Player 0 card = ${player0Card.get('rank')} of ${player0Card.get('suit')}`);
                player1Pot.push(player1Card);
                console.log(`Player 1 card = ${player1Card.get('rank')} of ${player1Card.get('suit')}`);
                // await new Promise(r => setTimeout(r, 100));
                if (player0Card.get('value') > player1Card.get('value')) {
                    player0Hand = player0Hand.concat(player0Pot, player1Pot);
                    console.log(`Player 0 hand size = ${player0Hand.length}`);
                } else {
                    player1Hand = player1Hand.concat(player0Pot, player1Pot);
                    console.log(`Player 1 hand size = ${player1Hand.length}`);
                }
                player0Pot = [];
                player1Pot = [];
                if (player0Hand.length === 0) {
                    console.log(`Player 1 wins in ${round} rounds!`);
                    playerWin.push('Player_1',round);
                    // await new Promise(r => setTimeout(r, 500));
                    SAVE.writeGameData(playerWin);
                    break;
                }
                if (player1Hand.length === 0) {
                    console.log(`Player 0 wins in ${round} rounds!`);
                    playerWin.push('Player_0',round);
                    // await new Promise(r => setTimeout(r, 500));
                    SAVE.writeGameData(playerWin);
                    break;
                }
                round++;
            } else if (player0Hand.length < MIN_HAND_SIZE || player1Hand.length < MIN_HAND_SIZE) {
                console.log(`Not enough cards.....PUSH!`);
                playerWin.push(`PUSH!`, round);
                SAVE.writeGameData(playerWin);
                // await new Promise(r => setTimeout(r, 500));
                break;
            } else {
                console.log(`WAR!`);
                player0Pot.push(player0Card);
                player0Pot.push(player0Hand.shift());
                player0Pot.push(player0Hand.shift());

                player1Pot.push(player1Card);
                player1Pot.push(player1Hand.shift());
                player1Pot.push(player1Hand.shift());

                for (let i = 0; i < player0Pot.length; i++) {
                    console.log(`Player 0 pot = ${player0Pot[i].get('value')}`);
                }
                for (let i = 0; i < player1Pot.length; i++) {
                    console.log(`Player 1 pot = ${player1Pot[i].get('value')}`);
                }
                await new Promise(r => setTimeout(r, 100));
            }
        }

       /* console.log(`
        Each player turns up a card at the same time and the player with the higher card takes both
        cards and puts them, face down, on the bottom of his stack. If the cards are the same rank, it is War.
        Each player turns up one card face down and one card face up. The player with the higher cards takes both
        piles (six cards). If the turned-up cards are again the same rank, each player places another card face down
        and turns another card face up. The player with the higher card takes all 10 cards, and so on.
        `)*/
    }

    #displayGameData() {
        SAVE.readGameData();
    }
}

module.exports = WarGameMechanics;