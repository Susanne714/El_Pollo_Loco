class ThrowableObject extends MovableObject {
    offset = { top: 10, right: 10, bottom: 10, left: 10 };
    bottleCollided = false;

    IMAGES_THROWING_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    /**
     * Creates a new ThrowableObject (e.g., a bottle) at the given coordinates.
     * Initializes the object's properties, loads images, and starts the throw animation.
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     * @param {boolean} [isAhead=true] - Whether the bottle is thrown ahead or backwards.
     */
    constructor(x, y, isAhead = true) {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.ahead = isAhead;
        this.moveInterval = null;
        this.height = 70;
        this.width = 70;
        this.loadImages(this.IMAGES_THROWING_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH);
        this.throw(10, 30);
        this.animate();
    }

    /**
     * Throws the bottle by applying speed and gravity, moving it across the screen.
     * The bottle's movement is updated at regular intervals.* 
     * @param {number} speedX - The horizontal speed of the throw.
     * @param {number} speedY - The vertical speed of the throw.
     * @returns {void}
     */
    throw(speedX, speedY) {
        if (soundControl?.sounds?.throwingSound && soundControl.isSoundOn) {
            soundControl.sounds.throwingSound.play();
        }
        this.speedY = speedY;
        this.applyGravity();
        this.moveInterval = setInterval(() => {
            this.x += speedX; // Flasche bewegt sich immer nach rechts
        }, 25);
    }

    /**
     * Starts the animation of the bottle, switching between the throwing and splash images based on whether the bottle has collided.
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            if (this.bottleCollided) {
                this.playAnimation(this.IMAGES_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_THROWING_BOTTLE);
            }
        }, 70);
    }

    /**
     * Marks the bottle as having collided with an object. Stops the bottle's movement and plays a splash sound.
     * @returns {void}
     */
    bottleIsColliding() {
        if (!this.bottleCollided) {
            this.bottleCollided = true;
            clearInterval(this.moveInterval);
            if (soundControl && soundControl.sounds.splashSound) {
                soundControl.cloneAndPlaySound(soundControl.sounds.splashSound);
            }
            setTimeout(() => {
            }, this.IMAGES_SPLASH.length * 150);
        }
    }
}