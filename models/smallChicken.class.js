class SmallChicken extends MovableObject {
    height = 40;
    width = 40;
    y = 380;
    isDead = false;
    removed = false;
    offset = { top: -15, right: -10, bottom: 5, left: -10 };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    /**
     * Creates an instance of a small chicken enemy at a specified starting position.
     * @param {number} startPositionX - The initial X position of the small chicken. If not provided, a random position is used.
     */
    constructor(startPositionX) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.imgDead = new Image();
        this.imgDead.onload = () => {
            this.imageCache[this.IMAGE_DEAD] = this.imgDead;
        };
        this.imgDead.src = this.IMAGE_DEAD;

        this.x = startPositionX || 200 + Math.random() * 500;
        this.speed = 0.2 + Math.random() * 0.5;

        this.animate();
    };

    /**
     * Handles the animation and movement of the small chicken.
     * The small chicken moves left and plays a walking animation.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}