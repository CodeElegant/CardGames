"use strict";

const IO = require('fs');  // For file I/O

class SaveData {

    static writeGameData(gameData) {
        if (IO.existsSync('War/dataBak.csv')) {
            IO.unlinkSync(`War/dataBak.csv`);
        }
        if (IO.existsSync('War/game_data.csv')) {
            IO.copyFileSync(`War/game_data.csv`, `War/dataBak.csv`);
        }
        IO.appendFileSync(`War/game_data.csv`, `${gameData[0]},${gameData[1]}\r`);
    }

    static readGameData() {
        console.log('Hello!');
    }
}

module.exports = SaveData;