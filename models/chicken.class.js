class Chicken extends MovableObject {
    height = 80;
    width = 80;
    y = 340;
    isDead = false;
    removed = false;
    offset = { top: -10, right: 0, bottom: 5, left: 0 };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    /**
     * Creates an instance of a chicken enemy at a specified starting position.
     * @param {number} startPositionX - The initial X position of the chicken. If not provided, a random position is used.
     */
    constructor(startPositionX) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.imgDead = new Image();
        this.imgDead.onload = () => {
            this.imageCache[this.IMAGE_DEAD] = this.imgDead;
        };
        this.imgDead.src = this.IMAGE_DEAD;

        this.x = startPositionX || 300 + Math.random() * 500;
        this.y = 340;
        this.speed = 0.2 + Math.random() * 0.5;

        this.animate();
    }

    /**
     * Handles the animation and movement of the chicken.
     * The chicken moves left and plays a walking animation.
     * Also plays a sound when moving if the chicken is not dead.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead && world && !world.isGameOver) {
                this.moveLeft();
                if (this.x > 0) {
                    soundControl.sounds.chickenSound.play();
                }
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}