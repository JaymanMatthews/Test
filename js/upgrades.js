class Upgrade {
    constructor(type, v1, v2, v3) {
        if (toLower(type) == 'rebuyable') {
            this.title = type;
            this.cost = new Decimal(v1);
            this.multi = new Decimal(v2);
            this.costMulti = new Decimal(v3);
        } else {
            this.title = type;
            this.inc = new Decimal(v1);
        }
    }

    buy(obj) {
        if (obj.coins.gte(this.cost)) {
            CALC.sub(obj.coins, this.cost, true);
            CALC.mul(this.cost, this.costMulti, true);
        }
    }
}
