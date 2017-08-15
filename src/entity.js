var entities = [];

function Entity(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
    this.color = '#000';
};

Entity.prototype.moving = function() {
    return Math.abs(this.xVelocity) > 0 || Math.abs(this.yVelocity) > 0;
}

Entity.prototype.update = function() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
}

Entity.prototype.draw = function() {
    drawRect(this.x, this.y, this.width, this.height, this.color);
}

Entity.prototype.handleEntityCollision = function(entity) {
    // Do nothing, this is for inheritance.
}

Entity.prototype.remove = function() {
    var index = entities.indexOf(this);
    if (index >= 0) {
        entities.splice(index, 1);
    }
}

Entity.prototype.damage = function() {
    return 0;
}

