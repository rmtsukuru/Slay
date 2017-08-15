var cameraX = 0;
var cameraY = 0;

var canvas, graphicsContext;
var canvasWidth, canvasHeight;

var mapWidth = tiles[0].length * TILE_SIZE;
var mapHeight = tiles.length * TILE_SIZE;

var images = {};

var updateCamera;

function loadImage(filename) {
    var image = {loaded: false};
    image.data = document.createElement('img');
    image.data.onload = function() {
        image.loaded = true;
    };
    image.data.src = 'img/' + filename;
    images[filename] = image;
}

function imageLoaded(filename) {
    if (images[filename] && images[filename].loaded) {
        return true;
    }
    if (!images[filename]) {
        loadImage(filename);
    }
}

function fetchImage(filename) {
    if (imageLoaded(filename)) {
        return images[filename].data;
    }
}

function configureGraphics(player) {
    canvas = document.getElementById('gameCanvas');
    graphicsContext = canvas.getContext('2d');
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    if (player) {
        updateCamera(player);
    }
}

function drawTiledImage(filename, x, y, ignoreCamera, sourceX, sourceY, sourceWidth, sourceHeight, width, height, filter) {
    if (imageLoaded(filename)) {
        var image = fetchImage(filename);
        sourceWidth = sourceWidth || image.width;
        sourceHeight = sourceHeight || image.height;
        width = width || image.width;
        height = height || image.height;
        graphicsContext.filter = filter || 'none';
        if (ignoreCamera) {
            graphicsContext.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
        }
        else {
            graphicsContext.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x - cameraX, y - cameraY, width, height);
        }
    }
}

function drawImage(filename, x, y, ignoreCamera) {
    drawTiledImage(filename, x, y, ignoreCamera, 0, 0);
}

function drawRect(x, y, width, height, color, ignoreCamera) {
    graphicsContext.fillStyle = color;
    if (ignoreCamera) {
        graphicsContext.fillRect(x, y, width, height);
    }
    else {
        graphicsContext.fillRect(x - cameraX, y - cameraY, width, height);
    }
}

function drawText(text, x, y, font, fontSize, color, ignoreCamera) {
    graphicsContext.font = fontSize + ' ' + font;
    graphicsContext.fillStyle = color;
    if (ignoreCamera) {
        graphicsContext.fillText(text, x, y);
    }
    else {
        graphicsContext.fillText(text, x - cameraX, y - cameraY);
    }
}

updateCamera = function(target) {
    cameraX = target.x - canvasWidth / 2;
    cameraY = target.y - canvasHeight / 2;

    if (cameraX < 0) {
        cameraX = 0;
    }
    else if (cameraX + canvasWidth > mapWidth) {
        cameraX = mapWidth - canvasWidth;
    }

    if (cameraY < 0) {
        cameraY = 0;
    }
    else if (cameraY + canvasHeight > mapHeight) {
        cameraY = mapHeight - canvasHeight;
    }
}
