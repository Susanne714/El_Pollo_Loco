class Coin extends CollectableObject {
    height = 100;
    width = 100;
    offset = { top: 30, right: 30, bottom: 30, left: 30 }

    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]

    /**
     * Creates a new coin at the specified position.
     * @param {number} x - The x-coordinate of the coin.
     * @param {number} y - The y-coordinate of the coin.
     */
    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png')
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_COINS);
        const randomDelay = Math.random() * 500;
        setTimeout(() => this.animate(), randomDelay);

    }

    /**
     * Starts the animation for the coin, switching between images at random intervals.
     * @returns {void}
     */
    animate() {
        const randomInterval = 200 + Math.random() * 300;
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, randomInterval);
    }
}