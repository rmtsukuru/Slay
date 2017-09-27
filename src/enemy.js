const FLASH_TIMER_FRAMES = 0.09 * FPS;

function Enemy(x, y) {
    Entity.call(this, x, y);
    this.width = 30;
    this.height = 50;
    this.health = 30;
    loadImage('enemy-stand.png');
}

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.update = function() {
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.handleGravity();
    handleTileCollision(this);
    if (this.flashTimer > 0) {
        this.color = '#f22';
        this.filter = 'contrast(0) sepia() saturate(100)';
        this.flashTimer--;
    }
    else{
        this.color = '#33b';
        this.filter = null;
    }
    handleEntityCollision(this);
    Entity.prototype.update.call(this);
};

Enemy.prototype.handleEntityCollision = function(entity) {
    if (entity.active) {
        this.health -= entity.damage(this);
        this.flashTimer = FLASH_TIMER_FRAMES;
        if (this.health <= 0) {
            this.remove();
        }
    }
};

Enemy.prototype.draw = function() {
    drawImage('enemy-stand.png', this.x, this.y - 12, false, this.filter);
};
