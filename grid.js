(function (window) {
    'use strict';
    if (!window.globals) {
        window.globals = {};
    }
    var Grid = {
        size: {
            x: 100,
            y: 100
        },
        padding: 0.5,
        points: [],
        create: function (size) {
            var grid = Object.create(this);
            if (size) {
                grid.size = size;
            }
            grid.generateGrid();
            return grid;
        },
        at: function (point) {
            return this.points[point.x][point.y];
        },
        validateMode: function (point) {
            if (point.x < 0) {
                point.x = this.size.x -1;
            } else if (point.x >= this.size.x) {
                point.x = 0;
            }
            if (point.y < 0) {
                point.y = this.size.y -1;
            } else if (point.y >= this.size.y) {
                point.y = 0;
            }
            return point;
        },
        generateGrid: function () {
            for (var x = 0; x < this.size.x; x++) {
                var row = [];
                for (var y = 0; y < this.size.y; y++) {
                    row.push(0);
                }
                this.points.push(row);
            }
        },
        update: function (position, context) {
            if (this.points[position.x][position.y]) {
                this.points[position.x][position.y] = 0;
            } else {
                this.points[position.x][position.y] = 1;
            }
            this.drawGrid(context);
        },
        drawGrid: function (context) {
            var canvas = document.getElementById('c');
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            var height = (canvas.height - 2 * this.padding) / this.size.y - 1,
                width = (canvas.height - 2 * this.padding) / this.size.x - 1;
            for (var x = 0; x < this.size.x; x++) {
                for (var y = 0; y < this.size.y; y++) {
                    if (this.points[x][y] === 0) {
                        context.rect((x + (width * x) + this.padding), (y +
                            (height * y) + this.padding), width, height);
                    } else {
                        context.fillRect((x + (width * x) + this.padding), (
                                y + (height * y) + this.padding), width,
                            height);
                    }
                }
            }
            context.save();
            context.stroke();
        }
    };
    window.globals.Grid = Grid;
})(window);