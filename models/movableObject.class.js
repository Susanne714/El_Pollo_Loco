class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    /**
     * Applies gravity to the object, causing it to fall if not on the ground.
     * @returns {void}
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.y >= this.groundLevel) {
                    this.y = this.groundLevel;
                    this.speedY = 0;
                }
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground (for gravity purposes).
     * If the object is a throwable object, it will always fall.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { //throwable objects should always fall
            return true;
        } else {
            return this.y < 130;
        }
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {MovableObject} mo - The object to check for collision with.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Applies damage to the object and reduces its energy.
     * If the energy drops below 0, it is set to 0.
     * @returns {void}
     */
    hit() {
        let damage = this.damageValue || 5;
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object was recently hurt (within the last 0.5 seconds).
     * @returns {boolean} True if the object was recently hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //measurement in ms
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * Checks if the object is dead (energy is 0).
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays the animation for the object, using the images passed in.
     * @param {string[]} images - An array of image paths to animate.
     * @returns {void}
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right.
     * @returns {void}
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     * @returns {void}
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump, if it is not already above the ground.
     * @returns {void}
     */
    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 28;
            this.idleStartTime = null;
            soundControl.sounds.jumpSound.play();
            // soundControl.sounds.walkingSound.pause();
        }
    }

    /**
     * Kills the object, stopping its movement and changing its image to a "dead" state.
     * @returns {void}
     */
    kill() {
        this.speed = 0;
        this.img = this.imageCache[this.IMAGE_DEAD];
        this.isDead = true;
        setTimeout(() => this.removeFromGame(), 1000);
    }

    /**
     * Removes the object from the game, marking it as removed.
     * @returns {void}
     */
    removeFromGame() {
        this.removed = true;
    }
}