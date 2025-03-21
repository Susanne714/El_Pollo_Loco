class StatusBarEndboss extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ]

    percentage = 100;

    /**
     * Creates an instance of the Endboss's status bar.
     * Initializes the position, size, and sets the initial percentage to 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 230;
        this.y = 6;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the Endboss's health percentage and updates the displayed image accordingly. 
     * @param {number} percentage - The percentage of the Endboss's health (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[StatusBar.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];

    }

    /**
     * Resolves the index of the image based on the current percentage of the Endboss's health.
     * @returns {number} - The index of the image corresponding to the current percentage.
     */
    // resolveImageIndex() {
    //     if (this.percentage == 100) {
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