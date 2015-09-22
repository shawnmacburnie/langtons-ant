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
        colors: ['#B894FF', '#19A319'],
        create: function (boardSize, position, colors) {
            var player = Object.create(this);
            if (position) {
                player.position = position;
            }
            // if (grid) {
            //     player.grid = grid;
            // } else {
            //     player.grid = window.globals.Grid.create();
            // }
            if (colors) {
                playerMoves.colors = colors;
            }
            this.boardSize = boardSize;
            player.frontPosition = playerMoves.up;
            // player.grid.drawGrid(context);
            return player;
        },
        validateMode: function (point) {
            if (point.x < 0) {
                point.x = this.boardSize.x - 1;
            } else if (point.x >= this.boardSize.x) {
                point.x = 0;
            }
            if (point.y < 0) {
                point.y = this.boardSize.y - 1;
            } else if (point.y >= this.boardSize.y) {
                point.y = 0;
            }
            return point;
        },
        makeMove: function (grid) {
            var currentPos = grid.at(this.position),
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
            this.position = this.validateMode(next[0]);
            this.frontPosition = next[1];
            return [{x:x,y:y}, next[2]];
        },
        drawPlayer: function () {}
    };
    window.globals.Player = Player;
})(window);