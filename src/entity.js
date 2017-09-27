const BASE_GRAVITY = 3;
const JUMP_MULTIPLIER = 2;

var entities = [];

function Entity(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
    this.onGround = false;
    this.color = '#000';
};

Entity.prototype.moving = function() {
    return Math.abs(this.xVelocity) > 0 || Math.abs(this.yVelocity) > 0;
}

Entity.prototype.speed = function() {
    return 0; // For inheritance.
}

Entity.prototype.hasGravity = function() {
    return true; // For inheritance.
}

Entity.prototype.gravityAmount = function() {
    return BASE_GRAVITY;
}

Entity.prototype.handleGravity = function(reverse) {
    reverse = reverse || false;
    if (this.hasGravity()) {
        if (reverse) {
            this.yVelocity -= this.gravityAmount() * JUMP_MULTIPLIER;
        }
        else {
            this.yVelocity += this.gravityAmount();
        }
    }
}

Entity.prototype.update = function() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
}

Entity.prototype.draw = function() {
    if (!this.invisible) {
        drawRect(this.x, this.y, this.width, this.height, this.color);
    }
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

