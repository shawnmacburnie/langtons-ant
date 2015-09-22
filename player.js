(function (window) {
    'use strict';
    if (!window.globals) {
        window.globals = {};
    }
    // var colors = ['#B894FF', '#19A319', '#FF3300'];
    var playerMoves = {
        up: {
            left: function (pos, colors) {

                return [{
                    x: pos.x - 1,
                    y: pos.y
                }, playerMoves.left,colors[0]];
            },
            right: function (pos, colors) {
                return [{
                    x: pos.x + 1,
                    y: pos.y
                }, playerMoves.right, colors[1]];
            }
        },
        right: {
            left: function (pos, colors) {
                return [{
                    x: pos.x,
                    y: pos.y - 1
                }, playerMoves.up, colors[0]];
            },
            right: function (pos, colors) {
                return [{
                    x: pos.x,
                    y: pos.y + 1
                }, playerMoves.down, colors[1]];
            }
        },
        down: {
            left: function (pos, colors) {
                return [{
                    x: pos.x + 1,
                    y: pos.y
                }, playerMoves.right, colors[0]];
            },
            right: function (pos, colors) {
                return [{
                    x: pos.x - 1,
                    y: pos.y
                }, playerMoves.left, colors[1]];
            }
        },
        left: {
            left: function (pos, colors) {
                return [{
                    x: pos.x,
                    y: pos.y + 1
                }, playerMoves.down, colors[0]];
            },
            right: function (pos, colors) {
                return [{
                    x: pos.x,
                    y: pos.y - 1
                }, playerMoves.up, colors[1]];
            }
        }
    };

    var Player = {
        position: {
            x: 50,
            y: 50
        },
        frontPosition: 0,
        grid: {},
        context: {},
        colors: ['#B894FF', '#19A319'],
        create: function (context, position, frontPosition, colors, grid) {
            var player = Object.create(this);
            if (position) {
                player.position = position;
            }
            if (frontPosition) {
                player.frontPosition = frontPosition;
            }
            if (grid) {
                player.grid = grid;
            } else {
                player.grid = window.globals.Grid.create();
            }
            if (colors) {
                playerMoves.colors = colors;
            }
            player.frontPosition = playerMoves.up;
            player.context = context;
            player.grid.drawGrid(context);
            return player;
        },
        makeMove: function () {
            var currentPos = this.grid.at(this.position),
                x = this.position.x,
                y = this.position.y,
                next = {};
            if (currentPos) {
                //go left
                next = this.frontPosition.left(this.position,this.colors);
            } else {
                //go right
                next = this.frontPosition.right(this.position, this.colors);
            }
            this.position = this.grid.validateMode(next[0]);
            this.frontPosition = next[1];
            this.grid.update({
                x, y
            }, this.context, next[2]);
            this.drawPlayer();
        },
        drawPlayer: function () {}
    };
    window.globals.Player = Player;
})(window);