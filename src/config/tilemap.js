const mapTileWidth = 50;
const mapTileHeight = 50;

const TILE_SIZE = 32;

var tiles = [];
for (var i = 0; i < mapTileHeight; i++) {
    var row = [];
    for (var j = 0; j < mapTileWidth; j++) {
        row.push(0);
    }
    tiles.push(row);
}

tiles[32][40] = 1;
tiles[5][7] = 1;
tiles[6][7] = 1;
tiles[10][28] = 2;
tiles[24][5] = 1;
tiles[45][37] = 1;
tiles[2][18] = 2;

