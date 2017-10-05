const FLASH_TIMER_FRAMES = 0.05 * FPS;
const STRAFE_TIMER_FRAMES = 1.8 * FPS;
const ENEMY_SPEED = 3;
const ENEMY_DAMAGE = 10;

function Enemy(x, y, facingRight) {
    Entity.call(this, x, y);
    this.width = 30;
    this.height = 50;
    this.health = 30;
    this.facingRight = facingRight || false;
    this.strafeTimer = STRAFE_TIMER_FRAMES;
    loadImage('enemy-stand.png');
}

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.update = function() {
    this.xVelocity = ENEMY_SPEED;
    if (!this.facingRight) {
        this.xVelocity *= -1;
    }
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
    if (this.strafeTimer > 0) {
        this.strafeTimer--;
    }
    else {
        this.strafeTimer = STRAFE_TIMER_FRAMES;
        this.facingRight = !this.facingRight;
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

Enemy.prototype.damage = function(entity) {
    return ENEMY_DAMAGE;
}

Enemy.prototype.draw = function() {
    if (SHOW_HITBOXES) {
        Entity.prototype.draw.call(this);
    }
    if (this.facingRight) {
        drawImage('enemy-stand-right.png', this.x, this.y - 12, false, this.filter);
    }
    else {
        drawImage('enemy-stand-left.png', this.x, this.y - 12, false, this.filter);
    }
};
