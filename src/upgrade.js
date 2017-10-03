const HEALTH_UPGRADE_AMOUNT = 50;
const HEALTH_UPGRADE_COLOR = '#22e374';

function Upgrade(x, y, amount) {
    Entity.call(this, x, y);
    this.amount = amount || HEALTH_UPGRADE_AMOUNT;
    this.color = HEALTH_UPGRADE_COLOR;
    this.width = this.height = TILE_SIZE;
}

Upgrade.prototype = Object.create(Entity.prototype);

Upgrade.prototype.update = function() {
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
        this.remove();
    }
}
