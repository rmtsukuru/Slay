var entities = [];

function drawTile(j, i, x) {
    switch(x) {
        case 1:
            drawRect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE, '#e00');
            break;
        case 2:
            drawRect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE, '#00d');
            break;
    }
}

function passableTileValue(x) {
    return x == 0 || x > 1;
}

function foregroundTileValue(x) {
    return passableTileValue(x);
}

function drawBackgroundTiles() {
    for (var i = 0; i < tiles.length; i++) {
        for (var j = 0; j < tiles[i].length; j++) {
            if (!passableTileValue(tiles[i][j])) {
                drawTile(j, i, tiles[i][j]);
            }
        }
    }
}

function drawForegroundTiles() {
    for (var i = 0; i < tiles.length; i++) {
        for (var j = 0; j < tiles[i].length; j++) {
            if (foregroundTileValue(tiles[i][j])) {
                drawTile(j, i, tiles[i][j]);
            }
        }
    }
}

function isTilePassable(j, i) {
    if (i < 0 || j < 0 || i >= tiles.length || j >= tiles[i].length) {
        return false;
    }
    var value = tiles[i][j];
    return passableTileValue(value);
}

function tileIndex(x) {
    return Math.floor(x / TILE_SIZE);
}

function getLeftCollisionVelocity(entity) {
    var minTileX = tileIndex(entity.x + entity.xVelocity);
    var maxTileX = tileIndex(entity.x + 1) - 1;
    var minTileY = tileIndex(entity.y);
    var maxTileY = tileIndex(entity.y + entity.height - 1);
    for (var i = maxTileX; i >= minTileX; i--) {
        for (var j = minTileY; j <= maxTileY; j++) {
            if (!isTilePassable(i, j)) {
                return Math.max(i * TILE_SIZE + TILE_SIZE - entity.x, entity.xVelocity);
            }
        }
    }
    return entity.xVelocity;
}

function getRightCollisionVelocity(entity) {
    var minTileX = tileIndex(entity.x + entity.width - 1) + 1;
    var maxTileX = tileIndex(entity.x + entity.width + entity.xVelocity);
    var minTileY = tileIndex(entity.y);
    var maxTileY = tileIndex(entity.y + entity.height - 1);
    for (var i = minTileX; i <= maxTileX; i++) {
        for (var j = minTileY; j <= maxTileY; j++) {
            if (!isTilePassable(i, j)) {
                return Math.min(i * TILE_SIZE - (entity.x + entity.width), entity.xVelocity);
            }
        }
    }
    return entity.xVelocity;
}

function getUpCollisionVelocity(entity, tempX) {
    var minTileY = tileIndex(entity.y + entity.yVelocity);
    var maxTileY = tileIndex(entity.y) - 1;
    var minTileX = tileIndex(tempX);
    var maxTileX = tileIndex(tempX + entity.width - 1);
    for (var j = maxTileY; j >= minTileY; j--) {
        for (var i = minTileX; i <= maxTileX; i++) {
            if (!isTilePassable(i, j)) {
                return Math.max(j * TILE_SIZE + TILE_SIZE - entity.y, entity.yVelocity);
            }
        }
    }
    return entity.yVelocity;
}

function getDownCollisionVelocity(entity, tempX) {
    var minTileY = tileIndex(entity.y + entity.height - 1) + 1;
    var maxTileY = tileIndex(entity.y + entity.height + entity.yVelocity);
    var minTileX = tileIndex(tempX);
    var maxTileX = tileIndex(tempX + entity.width - 1);
    for (var j = minTileY; j <= maxTileY; j++) {
        for (var i = minTileX; i <= maxTileX; i++) {
            if (!isTilePassable(i, j)) {
                return Math.min(j * TILE_SIZE - (entity.y + entity.height), entity.yVelocity);
            }
        }
    }
    return entity.yVelocity;
}

function getCollisionXVelocity(entity) {
    if (entity.xVelocity < 0) {
        return getLeftCollisionVelocity(entity);
    }
    else if (entity.xVelocity > 0) {
        return getRightCollisionVelocity(entity);
    }
    return 0;
}

function getCollisionYVelocity(entity) {
    if (entity.yVelocity < 0) {
        return getUpCollisionVelocity(entity, entity.x + entity.xVelocity);
    }
    else if (entity.yVelocity > 0) {
        return getDownCollisionVelocity(entity, entity.x + entity.xVelocity);
    }
    return 0;
}

function handleTileCollision(entity) {
    var startYVelocity = entity.yVelocity;
    entity.xVelocity = getCollisionXVelocity(entity);
    entity.yVelocity = getCollisionYVelocity(entity);
    if (startYVelocity > 0 && entity.yVelocity == 0) {
        entity.onGround = true;
    }
    else if (startYVelocity < 0 && entity.yVelocity == 0) {
        entity.jumping = false;
    }
    else {
        entity.onGround = false;
    }
}

function areColliding(a, b) {
    return a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
};

function handleEntityCollision(entity) {
    entities.forEach(function(x, i) {
        if (entity != x && areColliding(entity, x)) {
            entity.handleEntityCollision(x);
        }
    });
}

function loadMap() {
    fetchTiles();
    fetchEntities();
    handleMapStartup();
}

function warpTo(mapId, mapX, mapY) {
    currentMap = mapId;
    loadMap();
    player.x = mapX;
    player.y = mapY;
}

function drawMinimap(ignoreCamera) {
    const width = tiles[0].length * 2 + 2;
    const height = tiles.length * 2;
    const baseX = canvasWidth - width;
    drawRect(baseX - 2, 0, width + 4, height + 4, '#aaa', ignoreCamera);
    drawRect(baseX, 2, width - 2, height, '#000', ignoreCamera);
    for (var i = 0; i < tiles.length; i++) {
        for (var j = 0; j < tiles[i].length; j++) {
            if (!passableTileValue(tiles[i][j])) {
                drawRect(baseX + j * 2, 2 + i * 2, 2, 2, '#0d0', ignoreCamera);
            }
        }
    }
    drawRect(baseX + 2 * tileIndex(player.x), 2 + 2 * tileIndex(player.y), 2, 4, '#daf', ignoreCamera);
}
