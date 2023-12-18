import Game from "./Game.js"

const screen = document.querySelector("#screen");

const App = {
    init: function () {
        screen.width = parseInt(getComputedStyle(screen).width);
        screen.height = parseInt(getComputedStyle(screen).height);
        
        Game.init(screen);
    }
}

window.onload = App.init.bind(App);