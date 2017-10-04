const PLAYER_SPEED = 5;
const PLAYER_JUMP_MAX = 0.3 * FPS;
const PLAYER_GRAVITY = 5;
const PLAYER_HAS_GRAVITY = true;
const PLAYER_DEBUG_SPEED = 10;
const PLAYER_SIZE = 20;
const PLAYER_HEIGHT = 60;
const PLAYER_SPRITE_MULTIPLIER = 0.5;
const PLAYER_FLINCH_SPEED = 8;
const PLAYER_FLINCH_FRAMES = 0.3 * FPS;
const PLAYER_HP_MAX = 100;
const PLAYER_HEAL_RATE = 100 / FPS;

const PLAYER_ANIMATIONS = {
    stand: { frames: 1, timerFrames: 1 },
    run: { frames: 8, timerFrames: 10, loop: true },
    jump: { frames: 1, timerFrames: 1 },
    flinch: { frames: 1, timerFrames: 1, filename: "jump" },
    slash: { frames: 3, timerFrames: 6, xOffset: -43, yOffset: -10 },
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
    this.maxHP = PLAYER_HP_MAX;
    this.health = this.maxHP;
    this.flinchTimer = 0;
    this.healing = false;
}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.preloadImages = function() {
    _.keys(PLAYER_ANIMATIONS).forEach(function(animation) {
        var name = animation;
        if (PLAYER_ANIMATIONS[animation].filename) {
            name = PLAYER_ANIMATIONS[animation].filename;
        }
        for (var i = 0; i < PLAYER_ANIMATIONS[animation].frames; i++) {
            loadImage('player-' + name + '-left' + i + '.png');
            loadImage('player-' + name + '-right' + i + '.png');
        }
    });
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
    this.healing = false;
    if (this.flinching) {
        if (this.flinchTimer > 0) {
            this.flinchTimer--;
        }
        else {
            this.flinching = false;
            this.xVelocity = 0;
        }
    }
    else {
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
                this.animationFrame = 0;
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
                    this.animationFrame = 0;
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
    if (Math.abs(this.xVelocity) > 0 && !this.flinching) {
        if (!this.moving) {
            this.animationFrame = 0;
            this.moving = true;
        }
    }
    else {
        this.moving = false;
        if (this.animation() == 'stand') {
            this.animationFrame = 0;
        }
    }
    if (this.frameTimer > 0 ) {
        this.frameTimer--;
    }
    else {
        this.frameTimer = PLAYER_ANIMATIONS[this.animation()].timerFrames;
        this.animationFrame++;
        if (PLAYER_ANIMATIONS[this.animation()].loop) {
            this.animationFrame %= PLAYER_ANIMATIONS[this.animation()].frames;
        }
        else {
            this.animationFrame = Math.min(this.animationFrame, PLAYER_ANIMATIONS[this.animation()].frames - 1);
        }
    }
    handleEntityCollision(this);
    if (this.healing) {
        this.health = Math.min(this.health + PLAYER_HEAL_RATE, this.maxHP);
    }
    Entity.prototype.update.call(this);
};

Player.prototype.animation = function() {
    if (this.flinching) {
        return 'flinch';
    }
    else if (this.jumping) {
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

Player.prototype.animationFilename = function() {
    var animation = this.animation();
    if (PLAYER_ANIMATIONS[animation].filename) {
        return PLAYER_ANIMATIONS[animation].filename;
    }
    else {
        return animation;
    }
}

Player.prototype.draw = function() {
    var image;
    animation = PLAYER_ANIMATIONS[this.animation()];
    var xOffset = animation.xOffset || 0;
    var yOffset = animation.yOffset || 0;
    if (this.facing == directions.left) {
        image = 'player-' + this.animationFilename() + '-left' + this.animationFrame + '.png';
    }
    else if (this.facing == directions.right) {
        image = 'player-' + this.animationFilename() + '-right' + this.animationFrame + '.png';
    }
    drawImage(image, this.x + xOffset, this.y + yOffset);
};

Player.prototype.handleEntityCollision = function(entity) {
    if (entity instanceof Warp) {
        warpTo(entity.destinationMap, entity.destinationX, entity.destinationY);
    }
    else if (entity instanceof Fountain) {
        this.healing = true;
    }
    else if (entity.damage() > 0 && !entity.friendly && !this.flinching) {
        this.health -= entity.damage();
        this.flinching = true;
        hudHPDelayed = true;
        if (entity.x > this.x) {
            this.xVelocity = -1 * PLAYER_FLINCH_SPEED;
            this.facing = directions.right;
        }
        else {
            this.xVelocity = PLAYER_FLINCH_SPEED;
            this.facing = directions.left;
        }
        this.yVelocity = -2 * PLAYER_FLINCH_SPEED;
        this.flinchTimer = PLAYER_FLINCH_FRAMES;
    }
}
