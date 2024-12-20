class StatusBarCoins extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    percentage = 0;

    /**
     * Creates an instance of the coin status bar.
     * Initializes the position, size, and sets the initial percentage to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 46;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of coins collected and updates the displayed image accordingly.
     * @param {number} percentage - The percentage of coins collected (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[StatusBar.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }
}