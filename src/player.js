const PLAYER_SPEED = 5;
const PLAYER_JUMP_MAX = 0.3 * FPS;
const PLAYER_GRAVITY = 5;
const PLAYER_HAS_GRAVITY = true;
const PLAYER_DEBUG_SPEED = 10;
const PLAYER_SIZE = 32;
const PLAYER_SPRITE_MULTIPLIER = 0.5;
const PLAYER_ANIMATION_FRAMES = 10;
const PLAYER_FRAME_COUNT = 3;
const MOVEMENT_TIMER_FRAMES = 2 * FPS;
const ATTACK_TIMER_FRAMES = 1 * FPS;

const directions = {
    left: 0,
    right: 1,
    up: 2,
    down: 3
};

function Player(x, y) {
    Entity.call(this, x, y);
    this.width = PLAYER_SIZE;
    this.height = PLAYER_SIZE * 1.5;
    this.color = '#a22';
    this.swordDrawn = false;
    this.facing = directions.right;
    this.jumping = false;
    this.frameTimer = PLAYER_ANIMATION_FRAMES;
    this.animationFrame = 0;
    this.preloadImages();
    this.movementTimer = MOVEMENT_TIMER_FRAMES;
}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.preloadImages = function() {
    for (var i = 0; i < PLAYER_FRAME_COUNT; i++) {
        loadImage('player0' + i + '.png');
        loadImage('player1' + i + '.png');
        loadImage('player2' + i + '.png');
        loadImage('player3' + i + '.png');
    }
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
    if (Math.abs(this.xVelocity) > 0 || Math.abs(this.yVelocity) > 0) {
        if (this.frameTimer > 0 ) {
            this.frameTimer--;
        }
        else {
            this.frameTimer = PLAYER_ANIMATION_FRAMES;
            this.animationFrame++;
            this.animationFrame %= PLAYER_FRAME_COUNT;
        }
        if (this.movementTimer > 0) {
            this.movementTimer--;
        }
    }
    else {
        this.frameTimer = PLAYER_ANIMATION_FRAMES;
        this.animationFrame = 0;
    }
    handleEntityCollision(this);
    Entity.prototype.update.call(this);
};

Player.prototype.draw = function() {
    var image;
    if (this.facing == directions.left) {
        image = 'player1' + this.animationFrame + '.png';
    }
    else if (this.facing == directions.up) {
        image = 'player2' + this.animationFrame + '.png';
    }
    else if (this.facing == directions.right) {
        image = 'player3' + this.animationFrame + '.png';
    }
    else {
        image = 'player0' + this.animationFrame + '.png';
    }
    drawImage(image, this.x, this.y);
};

Player.prototype.handleEntityCollision = function(entity) {
    if (entity instanceof Warp) {
        warpTo(entity.destinationMap, entity.destinationX, entity.destinationY);
    }
}
