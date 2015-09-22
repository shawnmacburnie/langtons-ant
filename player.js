(function (window) {
    'use strict';
    if (!window.globals) {
        window.globals = {};
    }
    var playerMoves = {
        up: {
            left: function (pos) {
                return [{
                    x: pos.x - 1,
                    y: pos.y
                }, playerMoves.left];
            },
            right: function (pos) {
                return [{
                    x: pos.x + 1,
                    y: pos.y
                }, playerMoves.right];
            }
        },
        right: {
            left: function (pos) {
                return [{
                    x: pos.x,
                    y: pos.y - 1
                }, playerMoves.up];
            },
            right: function (pos) {
                return [{
                    x: pos.x,
                    y: pos.y + 1
                }, playerMoves.down];
            }
        },
        down: {
            left: function (pos) {
                return [{
                    x: pos.x + 1,
                    y: pos.y
                }, playerMoves.right];
            },
            right: function (pos) {
                return [{
                    x: pos.x - 1,
                    y: pos.y
                }, playerMoves.left];
            }
        },
        left: {
            left: function (pos) {
                return [{
                    x: pos.x,
                    y: pos.y + 1
                }, playerMoves.down];
            },
            right: function (pos) {
                return [{
                    x: pos.x,
                    y: pos.y - 1
                }, playerMoves.up];
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
        create: function (context, position, frontPosition, grid) {
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
                next = this.frontPosition.left(this.position);
            } else {
                //go right
                next = this.frontPosition.right(this.position);
            }

            this.position = this.grid.validateMode(next[0]);
            this.frontPosition = next[1];
            this.grid.update({
                x, y
            }, this.context);
            this.drawPlayer();
        },
        drawPlayer: function () {}
    };
    window.globals.Player = Player;
})(window);