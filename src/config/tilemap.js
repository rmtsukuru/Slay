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
            [0, 19, 0],
            [1, 19, 0],
            [0, 20, 0],
            [1, 20, 0],
            [0, 21, 0],
            [1, 21, 0],
        ],
        entities: [
            function() { return new Warp(-32, 608, 32, 96, 3, 950, 640); },
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
            function() { return new Warp(512, 283, 32, 32, 0, 279, 120); }
        ]
    },
    2: {
        tileWidth: mapTileWidth,
        tileHeight: mapTileHeight,
        tiles: [
            [30, 19, 0],
            [31, 19, 0],
            [30, 20, 0],
            [31, 20, 0],
            [30, 21, 0],
            [31, 21, 0],
        ],
        entities: [
            function() { return new Fountain(450, 608); },
            function() { return new Warp(1024, 608, 32, 96, 4, 50, 640); },
        ]
    },
    3: {
        tileWidth: mapTileWidth,
        tileHeight: mapTileHeight,
        tiles: [
            [0, 19, 0],
            [1, 19, 0],
            [0, 20, 0],
            [1, 20, 0],
            [0, 21, 0],
            [1, 21, 0],
            [30, 19, 0],
            [31, 19, 0],
            [30, 20, 0],
            [31, 20, 0],
            [30, 21, 0],
            [31, 21, 0],
            [20, 21, 1],
            [21, 21, 1],
            [21, 20, 1],
        ],
        entities: [
            function() { return new Warp(-32, 608, 32, 96, 4, 950, 640); },
            function() { return new Warp(1024, 608, 32, 96, 0, 50, 640); },
            function() { return new Enemy(700, 400, false); },
        ]
    },
    4: {
        tileWidth: mapTileWidth,
        tileHeight: mapTileHeight * 2,
        tiles: [
            [0, 19, 0],
            [1, 19, 0],
            [0, 20, 0],
            [1, 20, 0],
            [0, 21, 0],
            [1, 21, 0],
            [30, 19, 0],
            [31, 19, 0],
            [30, 20, 0],
            [31, 20, 0],
            [30, 21, 0],
            [31, 21, 0],
            [2, 22, 1],
            [3, 22, 1],
            [4, 22, 1],
            [12, 22, 1],
            [13, 22, 1],
            [14, 22, 1],
            [21, 22, 1],
            [22, 22, 1],
            [28, 22, 1],
            [29, 22, 1],
        ],
        entities: [
            function() { return new Warp(-32, 608, 32, 96, 2, 950, 640); },
            function() { return new Warp(1024, 608, 32, 96, 3, 50, 640); },
            function() { return new Upgrade(400, 200, 1); },
        ]
    },
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

    

    var baseTiles = [
    ];
    for (var i = 0; i < tileWidth; i++) {
        for (var j = 0; j < tileHeight; j++) {
            if (i < 2 || i > tileWidth - 3 || j < 2 || j > tileHeight - 3) {
                baseTiles.push([i, j, 1]);
            }
        }
    }
    baseTiles.forEach(function(data, i) {
        tiles[data[1]][data[0]] = data[2];
    });

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
