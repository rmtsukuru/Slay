function Fountain(x, y, destinationMap, destinationX, destinationY) {
    Entity.call(this, x, y);
    this.color = '#0de';
    this.width = this.height = TILE_SIZE * 3;
}

Fountain.prototype = Object.create(Entity.prototype);

Fountain.prototype.update = function() {
    Entity.prototype.update.call(this);
}

Fountain.prototype.draw = function() {
    Entity.prototype.draw.call(this);
}
