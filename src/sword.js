const SWORD_TIMER_FRAMES = 5;
const SWORD_TTL_FRAMES = 10;
const SWORD_ANIMATION_CUTOFF = 8;
const SWORD_DAMAGE = 10;
const SWORD_DEBUG_DAMAGE = 50;
const SWORD_LENGTH = 30;
const SWORD_WIDTH = 8;

function Sword(x, y, horizontal) {
    Entity.call(this, x, y);
    this.horizontal = horizontal;
    if (this.horizontal) {
        this.width = SWORD_LENGTH;
        this.height = SWORD_WIDTH;
    }
    else {
        this.width = SWORD_WIDTH;
        this.height = SWORD_LENGTH;
    }
    this.color = '#f33'; 
    this.active = false;
    this.activationTimer = SWORD_TIMER_FRAMES;
    this.lifeTimer = SWORD_TTL_FRAMES;
    this.damagedTargets = [];
}

Sword.prototype = Object.create(Entity.prototype);

Sword.prototype.update = function() {
    if (this.active) {
        if (this.lifeTimer <= 0) {
            player.swordDrawn = false;
            this.remove();
        }
        else {
            this.lifeTimer--;
        }
    }
    else {
        if (this.activationTimer <= 0) {
            this.active = true;
        }
        else {
            this.activationTimer--;
        }
    }
    Entity.prototype.update.call(this);
};

Sword.prototype.draw = function() {
    var image;
    if (!this.active) {
        image = 'sword' + player.facing + '0.png';
    }
    else if (this.lifeTimer > SWORD_ANIMATION_CUTOFF) {
        image = 'sword' + player.facing + '1.png';
    }
    else {
        image = 'sword' + player.facing + '2.png';
    }
    if (player.facing == directions.left) {
        drawImage(image, this.x, this.y - 42);
    }
    else if (player.facing == directions.right) {
        drawImage(image, this.x - 32, this.y - 42);
    }
    else if (player.facing == directions.up) {
        drawImage(image, this.x - 10, this.y);
    }
    else {
        drawImage(image, this.x - 10, this.y - 32);
    }
};

Sword.prototype.damage = function(entity) {
    if (!this.active) {
        return 0;
    }
    if (entity && this.damagedTargets.includes(entity)) {
        return 0;
    }
    if (entity) {
        this.damagedTargets.push(entity);
    }
    if (DEBUG_DAMAGE) {
        return SWORD_DEBUG_DAMAGE;
    }
    else {
        return SWORD_DAMAGE;
    }
}
