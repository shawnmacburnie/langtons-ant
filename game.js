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
        // console.log('finished iteration: ' + (++iteration));
        // requestAnimationFrame(update);
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
            // if(new Date() - this.lastRun < 1000){
            //     console.log('here');
            //     this.player.makeMove();
            //     this.lastRun = new Date();
            // }
        }
    };
    window.globals.Game = Game;
})(window);