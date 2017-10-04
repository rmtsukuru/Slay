const SWORD_TIMER_FRAMES = 5;
const SWORD_TTL_FRAMES = 18;
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
    this.invisible = true;
    this.active = false;
    this.activationTimer = SWORD_TIMER_FRAMES;
    this.lifeTimer = SWORD_TTL_FRAMES;
    this.damagedTargets = [];
    this.friendly = true;
}

Sword.prototype = Object.create(Entity.prototype);

Sword.prototype.update = function() {
    this.y = player.y + 30;
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
