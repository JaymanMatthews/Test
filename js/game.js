class Game {
    constructor(state) {
        Object.assign(this, state);
    }

    save() {
        localStorage.setItem('savedState', JSON.stringify(this, tagging));
    }
    load() {
        const SAVED_JSON = localStorage.getItem('savedState');
        const SAVED_STATE = JSON.parse(SAVED_JSON, untagging);
        Object.assign(this, SAVED_STATE);
        this.getDisplay();
    }
    reset() {
        const IS_CONFIRMED = confirm('Would you like to reset your game?');
        if (IS_CONFIRMED) {
            Object.assign(this, defaultSave);
            this.save();
            location.reload();
        }
    }

    setValues() {
        CALC.add(this.tcoins, this.cps, true);
    }

    getDisplay() {
        ELEMENTS[0] = getElement('currency-info', 'Class');
        ELEMENTS[1] = getElement('upgrade-buttons', 'Class');
        for (let i = 0; i < ELEMENTS[1].length; i++) {
            ELEMENTS[1][i].onclick = () => this.upgrades[i].buy(this);
        }
        ELEMENTS[2] = getElement('upgrade-titles', 'Class');
        ELEMENTS[3] = getElement('upgrade-costs', 'Class');    
    }
    setDisplay() {
        let strings = [
            [`${tdString(this.tcoins, 2)} coins`, `${tdString(this.cps, 2)} coins per second`],
            new Array(),
            new Array()
        ];

        for (let i = 0; i < ELEMENTS[0].length; i++) {
            setText(ELEMENTS[0][i], strings[0][i], 'textContent');
        }
        for (let i = 0; i < ELEMENTS[1].length; i++) {
            strings[1].push(`${this.upgrades[i].title}`);
            setText(ELEMENTS[2], strings[1][i], 'textContent');
            strings[2].push(`Cost: ${this.upgrades[i].cost}`);
            setText(ELEMENTS[3], strings[2][i], 'textContent');
        }
    }

    get tcoins() {
        return this.coins.current;
    } 
    set tcoins(coins) {
        this.coins.current = coins;
    }

    get cps() {
        return this.coins.perSec;
    }
    set cps(coinsPerSec) {
        this.coins.perSec = coinsPerSec;
    }
}

class Default extends Game {
    constructor(state) {
        super(state);
    }
}

let game = new Game({
    coins: {
        current: new Decimal('0'),
        perSec: new Decimal('1')
    },
    upgrades: toUpgrade([
        ['rebuyable', '20', '1.5', '2'],
        ['one-time', '50'],
        ['one-time', '100']
    ])
});

let defaultSave = new Default(game);