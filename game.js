(function (window) {
    'use strict';
    if (!window.globals) {
        window.globals = {};
    }
    var players = {},
        grid = {},
        context = {},
        lastRun = new Date();
    function update() {
        lastRun = new Date();
        for (var i =0; i < players.length; i++) {
            var move = players[i].makeMove(grid);
            grid.update(move[0], move[1]);
        }
        grid.drawGrid(context);

    }
    var Game = {
        lastRun: 0,
        create: function (currentContext, numAnts) {
            var game = Object.create(this);
            game.context = currentContext;
            game.players = [];
            game.grid = window.globals.Grid.create();
            if (!numAnts) {
                numAnts = 4;
            }
            for (var i =0; i < numAnts; i++) {
                game.players[i] = window.globals.Player.create(game.grid.size);
            }
            context = game.context;
            grid = game.grid;
            players = game.players;
            return game;
        },
        play: function () {
            setInterval(update, 0);
        }
    };
    window.globals.Game = Game;
})(window);