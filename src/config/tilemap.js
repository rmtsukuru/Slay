const mapTileWidth = 40;
const mapTileHeight = 30;

const TILE_SIZE = 32;
const STARTING_MAP = 0;

var tiles = [];

var mapData = {
    0: {
        tileWidth: mapTileWidth,
        tileHeight: mapTileHeight,
        tiles: [
            [12, 20, 1],
            [5, 7, 1],
            [6, 7, 1],
            [10, 18, 2],
            [14, 5, 1],
            [15, 17, 1],
            [2, 18, 2]
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
        tileHeight: mapTileHeight,
        tiles: [
            [5, 7, 1],
            [5, 8, 1],
            [5, 9, 1]
        ],
        entities: [
            function() { return new Warp(512, 283, 0, 279, 120); }
        ]
    }
};

function fetchTiles(mapId) {
    mapId = mapId || currentMap;
    tileWidth = mapData[mapId].tileWidth || mapTileWidth;
    tileHeight = mapData[mapId].tileHeight || mapTileHeight;
    tiles = [];
    for (var i = 0; i < tileHeight; i++) {
        var row = [];
        for (var j = 0; j < tileWidth; j++) {
            row.push(0);
        }
        tiles.push(row);
    }

    mapData[mapId].tiles.forEach(function(data, i) {
        tiles[data[0]][data[1]] = data[2];
    });
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
