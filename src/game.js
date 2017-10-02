const HEALTH_BAR_DELAY_FRAMES = 0.8 * FPS;
const HEALTH_BAR_DECAY_FRAMES = 0.02 * FPS;
const HEALTH_BAR_DECAY_RATE = 1;

var hudHP, hudHPTimer, hudHPDelayed;

function configureGame() {
    currentMap = STARTING_MAP;
    loadMap();
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
    hudHP = hudHP || player.health;
    if (hudHP > player.health) {
        if (hudHPTimer > 0) {
            hudHPTimer--;
        }
        else if (hudHPDelayed) {
            hudHPTimer = HEALTH_BAR_DELAY_FRAMES;
            hudHPDelayed = false;
        }
        else {
            hudHPTimer = HEALTH_BAR_DECAY_FRAMES;
            hudHP = Math.max(hudHP - HEALTH_BAR_DECAY_RATE, player.health);
        }
    }
    drawRect(0, 0, 200, 20, '#000', true);
    drawRect(1, 1, 198, 18, '#fff', true);
    drawRect(3, 3, 194, 14, '#000', true);
    drawRect(3, 3, Math.max(0, 194 * hudHP / player.maxHP), 14, '#f00', true);
    drawRect(3, 3, Math.max(0, 194 * player.health / player.maxHP), 14, '#22e374', true);
}

function drawDebugHud() {
    drawText('X: ' + player.x + ' Y: ' + player.y, 802, 20, 'Cambria', '24px', '#2f2', true);
    drawText('Tile X: ' + tileIndex(player.x) + ' Tile Y: ' + tileIndex(player.y), 802, 48, 'Cambria', '24px', '#f2f', true);
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
    drawHud();
    if (DEBUG_DISPLAY) {
        drawDebugHud();
    }
}
