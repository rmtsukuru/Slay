const HEALTH_UPGRADE_AMOUNT = 50;
const HEALTH_UPGRADE_COLOR = '#22e374';

function Upgrade(x, y, id, amount) {
    Entity.call(this, x, y);
    this.amount = amount || HEALTH_UPGRADE_AMOUNT;
    this.id = id || 0;
    this.color = HEALTH_UPGRADE_COLOR;
    this.width = this.height = TILE_SIZE;
}

Upgrade.prototype = Object.create(Entity.prototype);

Upgrade.prototype.hasGravity = function() {
    return true;
}

Upgrade.prototype.update = function() {
    if (upgradesCollected.includes(this.id)) {
        this.remove();
    }

    this.handleGravity();
    Entity.prototype.update.call(this);
    handleEntityCollision(this);
}

Upgrade.prototype.draw = function() {
    Entity.prototype.draw.call(this);
}

Upgrade.prototype.handleEntityCollision = function(entity) {
    if (entity instanceof Player) {
        entity.maxHP += this.amount;
        entity.health += this.amount;
        upgradesCollected.push(this.id);
        this.remove();
    }
}
