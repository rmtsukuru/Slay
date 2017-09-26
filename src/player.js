const PLAYER_SPEED = 5;
const PLAYER_JUMP_MAX = 0.3 * FPS;
const PLAYER_GRAVITY = 5;
const PLAYER_HAS_GRAVITY = true;
const PLAYER_DEBUG_SPEED = 10;
const PLAYER_SIZE = 20;
const PLAYER_HEIGHT = 60;
const PLAYER_SPRITE_MULTIPLIER = 0.5;

const PLAYER_ANIMATIONS = {
    stand: { frames: 1, timerFrames: 0 },
    run: { frames: 8, timerFrames: 10 },
};

const directions = {
    left: 0,
    right: 1,
    up: 2,
    down: 3
};

function Player(x, y) {
    Entity.call(this, x, y);
    this.width = PLAYER_SIZE;
    this.height = PLAYER_HEIGHT;
    this.color = '#a22';
    this.swordDrawn = false;
    this.facing = directions.right;
    this.jumping = false;
    this.moving = false;
    this.frameTimer = 0;
    this.animationFrame = 0;
    this.preloadImages();
}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.preloadImages = function() {
    // TODO fix this properly
}

Player.prototype.speed = function() {
    if (DEBUG_SPEED && keyState.shift) {
        return PLAYER_DEBUG_SPEED;
    }
    return PLAYER_SPEED;
}

Player.prototype.gravityAmount = function() {
    return PLAYER_GRAVITY;
}

Player.prototype.hasGravity = function() {
    return PLAYER_HAS_GRAVITY;
}

Player.prototype.update = function() {
    this.xVelocity = 0;
    this.yVelocity = 0;
    if (!this.swordDrawn) {
        if (triggerKeyState.z) {
            var sword;
            if (this.facing == directions.left) {
                sword = new Sword(this.x - 32, this.y + 12, true);
            }
            else if (this.facing == directions.right) {
                sword = new Sword(this.x + 32, this.y + 12, true);
            }
            else if (this.facing == directions.up) {
                sword = new Sword(this.x + 10, this.y - 32);
            }
            else {
                sword = new Sword(this.x + 10, this.y + 32);
            }
            entities.unshift(sword);
            playSound('slice2', 0.3);
            this.swordDrawn = true;
        }
        else {
            if (keyState.left || keyState.a) {
                this.xVelocity -= this.speed();
            }
            if (keyState.right || keyState.d) {
                this.xVelocity += this.speed();
            }

            if (triggerKeyState.space) {
                this.jumping = true;
            }
            else if (!keyState.space) {
                this.jumping = false;
            }

            if (this.yVelocity == 0) {
                if (this.xVelocity < 0) {
                    this.facing = directions.left;
                }
                else if (this.xVelocity > 0) {
                    this.facing = directions.right;
                }
            }
        }
    }

    if (this.jumping && this.onGround) {
        this.onGround = false;
        this.jumpTimer = PLAYER_JUMP_MAX;
    }
    if (this.jumpTimer > 0 && !this.onGround && this.jumping) {
        this.jumpTimer--;
        this.handleGravity(true);
    }
    else {
        this.jumpTimer = 0;
        this.jumping = false;
        this.handleGravity();
    }
    handleTileCollision(this);
    if (Math.abs(this.xVelocity) > 0) {
        if (!this.moving) {
            this.animationFrame = 0;
            this.moving = true;
        }
        else if (this.frameTimer > 0 ) {
            this.frameTimer--;
        }
        else {
            this.frameTimer = PLAYER_ANIMATIONS[this.animation()].timerFrames;
            this.animationFrame++;
            this.animationFrame %= PLAYER_ANIMATIONS[this.animation()].frames;
        }
    }
    else {
        this.frameTimer = PLAYER_ANIMATIONS.stand.timerFrames;
        this.animationFrame = 0;
        this.moving = false;
    }
    handleEntityCollision(this);
    Entity.prototype.update.call(this);
};

Player.prototype.animation = function() {
    if (this.jumping) {
        return 'jump';
    }
    else if (this.moving) {
        return 'run';
    }
    else if (this.swordDrawn) {
        return 'slash';
    }
    else {
        return 'stand';
    }
};

Player.prototype.draw = function() {
    var image;
    if (this.facing == directions.left) {
        image = 'player-' + this.animation() + '-left' + this.animationFrame + '.png';
    }
    else if (this.facing == directions.right) {
        image = 'player-' + this.animation() + '-right' + this.animationFrame + '.png';
    }
    drawImage(image, this.x, this.y);
};

Player.prototype.handleEntityCollision = function(entity) {
    if (entity instanceof Warp) {
        warpTo(entity.destinationMap, entity.destinationX, entity.destinationY);
    }
}
