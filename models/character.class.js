class Character extends MovableObject {
    height = 300;
    width = 150;
    y = 130;
    groundLevel = 130;
    speed = 7;
    offset = { top: 100, right: 30, bottom: 10, left: 20 };
    collectedBottles = [];
    throwableBottles = [];
    collectedCoins = [];
    idleTime = 0;
    longIdleThreshold = 15;
    world;

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    /**
     * Creates a new character with predefined images and animations.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.lastDamageTime = 0;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }

    /**
     * Starts the character's movement, animation, and idle handlers.
     */
    animate() {
        this.startMovementHandler();
        this.startAnimationHandler();
        this.startIdleHandler();
    }

    /**
     * Handles the character's movement based on keyboard input.
     */
    startMovementHandler() {
        setInterval(() => {
            this.handleMovement();
        }, 1000 / 60);
    }

    /**
     * Moves the character based on keyboard input (left, right, space for jump).
     */
    handleMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.playWalkingSound();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.playWalkingSound();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Handles the character's animations based on its state (walking, jumping, hurt, dead).
     */
    startAnimationHandler() {
        setInterval(() => {
            this.handleAnimations();
        }, 50);
    }

    /**
     * Switches the animation based on the character's state.
     */
    handleAnimations() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Handles the character's idle state animation.
     */
    startIdleHandler() {
        setInterval(() => {
            this.handleIdleState();
        }, 150);
    }

    /**
     * Switches between idle and long idle animation based on the character's idle time.
     */
    handleIdleState() {
        if (!this.isDead() && !this.isHurt() && !this.isAboveGround() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
            this.idleTime += 1 / 6;
            if (this.idleTime > this.longIdleThreshold) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        } else {
            this.idleTime = 0;
        }
    }

    /**
     * Plays the walking sound when the character is moving.
     */
    playWalkingSound() {
        if (soundControl.isSoundOn && soundControl.sounds.walkingSound) {
            const walkingSound = soundControl.sounds.walkingSound;
            if (walkingSound.paused) {
                walkingSound.play();
            }
        }
    }

    /**
     * Checks if the character is jumping on top of an enemy.
     * @param {MovableObject} enemy - The enemy object to check.
     * @returns {boolean} True if the character is jumping on the enemy, false otherwise.
     */
    isJumpingOn(enemy) {
        return this.isAbove(enemy) && this.isFalling() && this.isCollidingHorizontally(enemy);
    }

    /**
     * Checks if the character is falling.
     * @returns {boolean} True if the character is falling, false otherwise.
     */
    isFalling() {
        return this.speedY < -9;
    }

    /**
    * Checks if the character is above another object.
    * @param {MovableObject} mo - The object to check.
    * @returns {boolean} True if the character is above the object, false otherwise.
    */
    isAbove(enemy) {
        const characterBottom = this.y + this.height - this.offset.bottom;
        const enemyTop = enemy.y + enemy.offset.top;
        return characterBottom > enemyTop;
    }

    /**
    * Checks if the character is colliding horizontally with another object.
    * @param {MovableObject} mo - The object to check for horizontal collision.
    * @returns {boolean} True if the character is colliding horizontally with the object, false otherwise.
    */

    isCollidingHorizontally(enemy) {
        return this.x + this.width - this.offset.right > enemy.x + enemy.offset.left &&
            this.x + this.offset.left < enemy.x + enemy.width - enemy.offset.right;
    }

    /**
     * Handles the logic when the character jumps on an enemy.
     * @param {MovableObject} enemy - The enemy object the character is interacting with.
     */
    jumpsOn(enemy) {
        if (this.isAbove(enemy) && this.isFalling() && this.isCollidingHorizontally(enemy)) {
            enemy.kill();
            soundControl.sounds.hitEnemySound.play();
        }
    }

    /**
     * Checks if the character is above the ground (based on groundLevel).
     * @returns {boolean} True if the character is above the ground, false otherwise.
     */
    isAboveGround() {
        return this.y < this.groundLevel; // Vergleiche mit Character-eigener groundLevel
    }
}