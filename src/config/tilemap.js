const mapTileWidth = 32;
const mapTileHeight = 24;

const TILE_SIZE = 32;
const STARTING_MAP = 0;

var tiles = [];

var mapData = {
    0: {
        tileWidth: mapTileWidth,
        tileHeight: mapTileHeight,
        tiles: [
            [20, 12, 1],
            [5, 5, 1],
            [5, 6, 1],
            [12, 4, 1],
            [12, 5, 1],
            [12, 6, 1],
            [18, 10, 2],
            [5, 14, 1],
            [6, 14, 1],
            [16, 15, 1],
            [17, 15, 1],
            [18, 2, 2],
            [7, 9, 1],
            [8, 9, 1],
            [9, 9, 1],
            [10, 9, 1],
            [10, 19, 1],
            [11, 19, 1],
            [8, 18, 1],
            [9, 18, 1]
        ],
        entities: [
            function() { return new Warp(762, 74, 1, 125, 350); }
        ],
        onStartup: function() {
            console.log('Level 0 loaded');
        }
    },
    1: {
        tileWidth: mapTileWidth,
        tileHeight: mapTileHeight * 2,
        tiles: [
            [5, 7, 1],
            [5, 8, 1],
            [5, 9, 1],
            [6, 12, 1],
            [16, 20, 1],
            [8, 33, 1],
            [28, 27, 1],
            [12, 43, 1]
        ],
        entities: [
            function() { return new Warp(512, 283, 0, 279, 120); }
        ]
    }
};

function fetchTiles(mapId) {
    mapId = mapId || currentMap;
    tileWidth = mapData[mapId].tileWidth || mapTileWidth;
    if (tileWidth < mapTileWidth) {
        tileWidth = mapTileWidth;
    }
    tileHeight = mapData[mapId].tileHeight || mapTileHeight;
    if (tileHeight < mapTileHeight) {
        tileHeight = mapTileHeight;
    }
    tiles = [];
    for (var i = 0; i < tileHeight; i++) {
        var row = [];
        for (var j = 0; j < tileWidth; j++) {
            row.push(0);
        }
        tiles.push(row);
    }

    mapData[mapId].tiles.forEach(function(data, i) {
        tiles[data[1]][data[0]] = data[2];
    });
    mapWidth = TILE_SIZE * tileWidth;
    mapHeight = TILE_SIZE * tileHeight;
}

function fetchEntities(mapId) {
    mapId = mapId || currentMap;
    entities = [];
    mapData[mapId].entities.forEach(function(entity, i) {
        if (typeof entity == 'function') {
            entities.push(entity());
        }
        else {
            entities.push(entity);
        }
    });
    entities.push(player);
}

function handleMapStartup(mapId) {
    mapId = mapId || currentMap;
    startupFunction = mapData[mapId].onStartup;
    if (startupFunction) {
        startupFunction();
    }
}
