function Warp(x, y, width, height, destinationMap, destinationX, destinationY) {
    Entity.call(this, x, y);
    this.color = '#3f0';
    this.width = width || TILE_SIZE;
    this.height = height || TILE_SIZE;
    this.destinationMap = destinationMap;
    this.destinationX = destinationX;
    this.destinationY = destinationY;
}

Warp.prototype = Object.create(Entity.prototype);

Warp.prototype.update = function() {
    Entity.prototype.update.call(this);
}

Warp.prototype.draw = function() {
    Entity.prototype.draw.call(this);
}
