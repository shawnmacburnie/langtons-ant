(function (window) {
    'use strict';
    if (!window.globals) {
        window.globals = {};
    }
    var player = {},
        lastRun = new Date(),
        iteration = 0;
    function update() {
        lastRun = new Date();
        player.makeMove();
    }
    var Game = {
        lastRun: 0,
        create: function (context) {
            var game = Object.create(this);
            game.context = context;
            game.player = window.globals.Player.create(context);
            player = game.player;
            return game;
        },
        play: function () {
            setInterval(update, 0);
        }
    };
    window.globals.Game = Game;
})(window);