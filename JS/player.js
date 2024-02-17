//Player class to track player name and score stats

export default class Player {
    #wins = 0;
    #draws = 0;
    #lose = 0;

    constructor (name) {
        this.name = name;
    }

    getWins() {
        return this.#wins;
    }

    setWins() {
        this.#wins += 1;
    }
    
    getDraws() {
        return this.#draws;
    }

    setDraws() {
        this.#draws += 1;
    } 

    getLose() {
        return this.#lose;
    }

    setLose() {
        this.#lose += 1;
    }

    getTotalGamesPlayed() {
        return this.#wins + this.#draws + this.#lose;
    }
}