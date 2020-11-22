tdString = (value, dp) => {
    return value.toStringWithDecimalPlaces(dp);
}

toLower = (value) => {
    return value.toLowerCase();
}

const CALC = Object.fromEntries(Object.entries({
    add: Decimal.add,
    sub: Decimal.sub,
    mul: Decimal.mul,
    div: Decimal.div
}).map(([k, f]) => [k, (v1, v2, inPlace) => {
        if (!inPlace) return f(v1, v2);
        return Object.assign(v1, f(v1, v2));
}]));

toUpgrade = (obj) => {
    return obj.map(state => new Upgrade(...state));
}

getElement = (elementName, useCase) => {
    switch (toLower(useCase)) {
        case 'id':
            return document.getElementById(elementName);
        case 'class':
            return document.getElementsByClassName(elementName);
    }
}

setText = (storedValue, text, useCase) => {
    switch (toLower(useCase)) {
        case 'textcontent':
            return storedValue.textContent = text;
        case 'innertext':
            return storedValue.innerText = text;
        case 'innerhtml':
            return storedValue.innerHTML = text;
    }
}