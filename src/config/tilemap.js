const mapTileWidth = 40;
const mapTileHeight = 30;

const TILE_SIZE = 32;

var tiles = [];
for (var i = 0; i < mapTileHeight; i++) {
    var row = [];
    for (var j = 0; j < mapTileWidth; j++) {
        row.push(0);
    }
    tiles.push(row);
}

tiles[12][20] = 1;
tiles[5][7] = 1;
tiles[6][7] = 1;
tiles[10][18] = 2;
tiles[14][5] = 1;
tiles[15][17] = 1;
tiles[2][18] = 2;

