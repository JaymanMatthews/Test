const UPDATE_INTERVAL = 1000;
const SAVE_INTERVAL = 15000;
const ELEMENTS = new Array();

const init = () => {
    game.load();
    const updateLoop = setInterval(updateGame = () => { game.setValues(), game.setDisplay() }, UPDATE_INTERVAL);
    const saveLoop = setInterval(saveGame = () => game.save(), SAVE_INTERVAL);
}

const start = window.onload = () => {
    init();
}