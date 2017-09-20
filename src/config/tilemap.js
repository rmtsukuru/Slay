const mapTileWidth = 40;
const mapTileHeight = 30;

const TILE_SIZE = 32;
const STARTING_MAP = 0;

var tiles = [];
for (var i = 0; i < mapTileHeight; i++) {
    var row = [];
    for (var j = 0; j < mapTileWidth; j++) {
        row.push(0);
    }
    tiles.push(row);
}

function fetchTiles(mapId) {
    mapId = mapId || currentMap;
    for (var i = 0; i < tiles.length; i++) {
        for (var j = 0; j < tiles[i].length; j++) {
            tiles[i][j] = 0;
        }
    }

    if (mapId == 0) {
        tiles[12][20] = 1;
        tiles[5][7] = 1;
        tiles[6][7] = 1;
        tiles[10][18] = 2;
        tiles[14][5] = 1;
        tiles[15][17] = 1;
        tiles[2][18] = 2;
    }
    else if (mapId == 1) {
        tiles[5][7] = 1;
        tiles[5][8] = 1;
        tiles[5][9] = 1;
    }
}

function fetchEntities(mapId) {
    mapId = mapId || currentMap;
    entities = [];
    if (mapId == 0) {
        entities.push(new Warp(762, 74, 1, 125, 350));
    }
    else if (mapId == 1) {
        entities.push(new Warp(512, 283, 0, 279, 120));
    }
    entities.push(player);
}
