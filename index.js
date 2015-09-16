'use strict';

function init() {
    var c_canvas = document.getElementById('c');
    var context = c_canvas.getContext('2d');
    // drawGrid(context);
    grid.init();
    grid.drawGrid(context);
}

function drawGrid(context, height, width) {
    context.rect(0.5, 0.5, 10, 10);
    // for (var x = 0.5; x < width; x += 10) {
    //   context.moveTo(x, 0);
    //   context.lineTo(x, height);
    // }
    // for (var y = 0.5; y < height; y += 10) {
    //   context.moveTo(0, y);
    //   context.lineTo(width, y);
    // }
    // context.strokeStyle = '#eee';
    context.stroke();
}
var grid = {
    size: {
        x: 100,
        y: 100
    },
    points: [],
    init: function (size) {
        if (size) {
            this.size = size;
        }
        this.generateGrid();
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
    drawGrid: function (context) {
        var padding = 0.5,
            height = 10,
            width = 10;
        for (var x = 0; x < this.size.x; x++) {
            for (var y = 0; y < this.size.y; y++) {
                if (this.points[x][y] === 0) {
                    context.rect((x + (width * x) + padding), (y + (height * y) +
                        padding), width, height);
                } else {
                    context.fillRect((x + (width * x) + padding), (y + (height *
                        y) + padding), width, height);
                }
            }
        }
        context.stroke();
    }
};