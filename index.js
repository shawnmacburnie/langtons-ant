'use strict';

function min(a, b) {
    if (a < b) {
        return a;
    }
    return b;
}

function init() {
    var c = document.getElementById('c'),
        shape = min(window.innerWidth, window.innerHeight);
    c.width = shape;
    c.height = shape;
    var context = c.getContext('2d');
    var game = window.globals.Game.create(context);
    game.play(1, 50);
}