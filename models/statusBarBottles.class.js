class StatusbarBottles extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ]

    /**
     * Creates an instance of the status bar for bottles.
     * Initializes the position and size of the status bar and sets the initial percentage to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 92;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the bottle status percentage and updates the displayed image accordingly.
     * @param {number} percentage - The percentage of bottle status (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[StatusBar.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the current percentage of bottle status.
     * @returns {number} - The index of the image corresponding to the current percentage.
     */
    // resolveImageIndex() {
    //     if (this.percentage >= 100) {
    //         return 5;
    //     } else
    //         if (this.percentage > 80) {
    //             return 4;
    //         } else
    //             if (this.percentage > 60) {
    //                 return 3;
    //             } else
    //                 if (this.percentage > 40) {
    //                     return 2;
    //                 } else
    //                     if (this.percentage > 20) {
    //                         return 1;
    //                     } else {
    //                         return 0;
    //                     }
    // }
}