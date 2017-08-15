function configureGame() {
    // If you need it for something. :)
}

function update() {
    if (triggerKeyState.q) {
        minimapEnabled = !minimapEnabled;
    }
    entities.forEach(function(entity, i) {
        entity.update();
    });
    updateCamera(player);
    updateInput();
}

function drawHud() {
    drawText('X: ' + player.x + ' Y: ' + player.y, 2, 20, 'Cambria', '24px', '#2f2', true);
    drawText('Tile X: ' + tileIndex(player.x) + ' Tile Y: ' + tileIndex(player.y), 2, 48, 'Cambria', '24px', '#f2f', true);
    if (minimapEnabled) {
        drawMinimap(true);
    }
}

function draw() {
    drawRect(0, 0, canvasWidth, canvasHeight, '#7898A7', true);
    drawBackgroundTiles();
    entities.forEach(function(entity, i) {
        entity.draw();
    });
    drawForegroundTiles();
    if (DEBUG_DISPLAY) {
        drawHud();
    }
}
