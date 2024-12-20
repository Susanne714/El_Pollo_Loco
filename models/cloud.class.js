class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    /**
     * Creates a cloud at a specified horizontal position.
     * @param {number} x The initial horizontal position of the cloud.
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.animate();
    }

    /**
     * Starts the animation of the cloud, making it move to the left at a constant speed.
     * This is achieved by repeatedly calling `moveLeft()` at a fixed interval.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}